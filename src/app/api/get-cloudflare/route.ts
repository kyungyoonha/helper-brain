import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { createNeuron } from "@/app/service/neuron";

export async function GET(req: Request) {
  try {
    // const { neuron } = await req.json();
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new Response("Authentication Error", { status: 401 });
    }

    // const userId = session.user.id;
    // const result = await createNeuron(userId, neuron);
    const response = await (
      await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/images/v2/direct_upload`,
        {
          method: "POST",
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.CF_IMAGES_TOKEN}`,
          },
        }
      )
    ).json();

    return Response.json({ ok: true, ...response.result }, { status: 200 });
  } catch (error) {
    return Response.json({ ok: false, error: "Server Error" }, { status: 500 });
  }
}
