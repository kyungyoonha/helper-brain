import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/server/client";
import { ConsoleSqlOutlined } from "@ant-design/icons";

// const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_SECRET || "",
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || "",
      clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID || "",
      clientSecret: process.env.NAVER_CLIENT_SECRET || "",
    }),
  ],

  callbacks: {
    async session({ session, token, user }) {
      session.user.id = user.id;
      return session;
    },
  },

  pages: {
    signIn: "/auth/signin", // 커스텀 로그인 페이지
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
