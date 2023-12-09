import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { createNeuron } from "@/app/service/neuron";

export async function POST(req: Request) {
  try {
    const { neuron } = await req.json();
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new Response("Authentication Error", { status: 401 });
    }

    const userId = session.user.id;
    const result = await createNeuron(userId, neuron);

    return Response.json({ ok: true, data: result }, { status: 200 });
  } catch (error) {
    return Response.json({ ok: false, error: "Server Error" }, { status: 500 });
  }
}
