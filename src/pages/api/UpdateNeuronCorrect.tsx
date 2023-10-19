import { NextApiRequest, NextApiResponse } from "next";

import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import { Dashboard, Neuron } from "@/types";
import dayjs from "dayjs";

const serviceAccountAuth = new JWT({
  // env var values here are copied from service account credentials generated by google
  // see "Authentication" section in docs for more info
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/gm, "\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const doc = new GoogleSpreadsheet(
  process.env.GOOGLE_SHEET_ID as string,
  serviceAccountAuth
);

export interface UpdatedNeuronCorrectParams {
  neuron: Neuron;
}

export interface UpdateNeuronCorrectResult {
  ok: boolean;
  error?: any;
  data?: Neuron;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UpdateNeuronCorrectResult>
) {
  try {
    await doc.loadInfo();
    let sheet = doc.sheetsByTitle["DB"];
    let rows = await sheet.getRows();
    let neuronList = rows.map((row) => row.toObject()) as Neuron[];

    let neuron = req.body.neuron as Neuron;
    let updatedAt = dayjs(new Date()).format("YYYY-MM-DD");
    let star = Number(neuron.star) + 1;

    let resultIdx = neuronList.findIndex(
      (item) => item.id === String(neuron.id)
    );

    rows[resultIdx].set("updatedAt", updatedAt);
    rows[resultIdx].set("star", star);
    await rows[resultIdx].save();

    neuron.star = star;
    neuron.updatedAt = updatedAt;

    let dashboardSheet = doc.sheetsByTitle["DASHBOARD"];
    let dashboardRows = await dashboardSheet.getRows();
    let dashboardList = dashboardRows.map((row) => row.toObject());
    let dashboardResultIdx = dashboardList.findIndex(
      (item) => item.date === updatedAt
    );

    if (dashboardResultIdx === -1) {
      dashboardSheet.addRow({
        id: `dashboard-${new Date().getTime()}`,
        date: updatedAt,
        totalCorrectCount: 1,
        totalIncorrectCount: 0,
        total: neuronList.length,
      });
    } else {
      let dashboardData = dashboardRows[dashboardResultIdx];
      let totalCorrectCount =
        Number(dashboardData.get("totalCorrectCount")) + 1;
      dashboardData.set("totalCorrectCount", totalCorrectCount);
      await dashboardData.save();
    }

    res.status(200).json({
      ok: true,
      data: { ...neuron, star, updatedAt },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, error });
  }
}
