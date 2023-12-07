import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { getNeurons } from "@/app/service/neuron";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new Response("Authentication Error", { status: 401 });
    }

    // const neurons = await getNeurons(session.user.id);

    return Response.json({ ok: true, data: {} }, { status: 200 });
  } catch (error) {
    return Response.json({ ok: false, error: "Server Error" }, { status: 500 });
  }
}
