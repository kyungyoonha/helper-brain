import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();
// { log: ["query"] }

if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default prisma;

// hot 리로딩 될때마다 client 생성되는 것을 방지
// prisma 무료에는 client 연결 제한있음
