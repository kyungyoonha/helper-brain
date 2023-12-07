import NextAuth, { DefaultSession } from "next-auth";

// username 추가
declare module "next-auth" {
  interface Session {
    user: {
      username: string;
      id: string;
    } & DefaultSession["user"];
  }
}
