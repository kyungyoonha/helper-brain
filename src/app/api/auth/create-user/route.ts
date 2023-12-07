import { User } from "@prisma/client";

export type CreateUserResult = {
  ok: boolean;
  error?: any;
  data: User;
};

export async function POST(req: Request, res: Response) {
  try {
    const { user } = await req.json();

    // const user: User = {
    //   id: 10,
    //   name: "few",
    //   email: "few",
    //   emailVerified: new Date(),
    //   image: "few",
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // };

    console.log({ user });

    return Response.json(
      {
        ok: true,
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ ok: false, error: "Server Error" }, { status: 500 });
  }
}
