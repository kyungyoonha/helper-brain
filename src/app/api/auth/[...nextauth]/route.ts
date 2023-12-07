import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import prisma from "@/lib/server/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_SECRET || "",
      // checks: ["none"],
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || "",
      clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
      // checks: ["none"],
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID || "",
      clientSecret: process.env.NAVER_CLIENT_SECRET || "",
      // checks: ["none"],
    }),
  ],
  callbacks: {
    // async signIn({ user }) {
    //   prisma.user.upsert({
    //     where: {
    //       id: user.id,
    //     },
    //     update: {
    //       id: user.id,
    //     },
    //     create: {
    //       id: user.id,
    //       name: user.name,
    //       email: user.email,
    //       image: user.image,
    //     },
    //   });

    //   return true;
    // },
    // async session({ session }) {
    //   // session 정보를 커스텀 할 수 있음
    //   // username 추가 => next-auth-d.ts 타입 변경해줘야한다.
    //   const user = session?.user;
    //   if (user) {
    //     session.user = {
    //       ...user,
    //       username: user.email?.split("@")[0] || "",
    //     };
    //   }

    //   return session;
    // },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin", // 커스텀 로그인 페이지
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
