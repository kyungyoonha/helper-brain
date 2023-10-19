import { NextApiRequest, NextApiResponse } from "next";

import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import { Neuron } from "@/types";

const serviceAccountAuth = new JWT({
  // env var values here are copied from service account credentials generated by google
  // see "Authentication" section in docs for more info
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.replace(/\\n/gm, "\n"),
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/gm, "\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const doc = new GoogleSpreadsheet(
  process.env.GOOGLE_SHEET_ID?.replace(/\\n/gm, "\n") as string,
  serviceAccountAuth
);

export interface GetNeuronListResult {
  ok: boolean;
  error?: any;
  data?: {
    neuronList: Neuron[];
    incorrectList: Neuron[];
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetNeuronListResult>
) {
  try {
    await doc.loadInfo();
    let result = [];
    let sheet = doc.sheetsByTitle["DB"];
    let rows = await sheet.getRows();
    result = rows.map((row) => row.toObject()) as Neuron[];

    let neuronList = [] as Neuron[];
    let incorrectList = [] as Neuron[];

    result.forEach((neuron) => {
      const updatedAt = new Date(neuron.updatedAt);
      const dateDiff = getDateDiffFromToday(updatedAt);
      if (Number(neuron.star) === 7 && dateDiff >= 64) neuronList.push(neuron);
      if (Number(neuron.star) === 6 && dateDiff >= 32) neuronList.push(neuron);
      if (Number(neuron.star) === 5 && dateDiff >= 16) neuronList.push(neuron);
      if (Number(neuron.star) === 4 && dateDiff >= 8) neuronList.push(neuron);
      if (Number(neuron.star) === 3 && dateDiff >= 4) neuronList.push(neuron);
      if (Number(neuron.star) === 2 && dateDiff >= 2) neuronList.push(neuron);
      if (Number(neuron.star) === 1 && dateDiff >= 1) neuronList.push(neuron);
      if (Number(neuron.star) === 1 && dateDiff < 1) incorrectList.push(neuron);
    });

    neuronList = neuronList.sort(() => Math.random() - 0.5);

    res.status(200).json({
      ok: true,
      data: {
        neuronList,
        incorrectList,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, error });
  }
}

const getDateDiffFromToday = (updatedAt: Date) => {
  const today = new Date();
  const todayDate = today.getDate();
  const updatedAtDate = updatedAt.getDate();
  return todayDate - updatedAtDate;
  // const diffDate = today.getTime() - updatedAt.getTime();
  // return Math.abs(diffDate / (1000 * 60 * 60 * 24));
};
