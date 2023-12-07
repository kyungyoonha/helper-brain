import prisma from "@/lib/server/client";
import dayjs from "dayjs";

export async function getNeurons(userId: string) {
  const day64 = dayjs().subtract(64, "days").toDate();
  const day32 = dayjs().subtract(32, "days").toDate();
  const day16 = dayjs().subtract(16, "days").toDate();
  const day8 = dayjs().subtract(8, "days").toDate();
  const day4 = dayjs().subtract(4, "days").toDate();
  const day2 = dayjs().subtract(2, "days").toDate();
  const day1 = dayjs().subtract(1, "days").toDate();

  let neurons = await prisma.neuron.findMany({
    where: {
      AND: [
        {
          userId: userId,
        },
        {
          OR: [
            { AND: [{ score: { equals: 7 }, updatedAt: { lte: day64 } }] },
            { AND: [{ score: { equals: 6 }, updatedAt: { lte: day32 } }] },
            { AND: [{ score: { equals: 5 }, updatedAt: { lte: day16 } }] },
            { AND: [{ score: { equals: 4 }, updatedAt: { lte: day8 } }] },
            { AND: [{ score: { equals: 3 }, updatedAt: { lte: day4 } }] },
            { AND: [{ score: { equals: 2 }, updatedAt: { lte: day2 } }] },
            { AND: [{ score: { equals: 1 }, updatedAt: { lte: day1 } }] },
          ],
        },
      ],
    },
    select: {
      description: true,
      imageUrl: true,
      score: true,
      answers: {
        select: {
          id: true,
          answer: true,
          imageUrl: true,
        },
      },
      hints: {
        select: {
          id: true,
          hint: true,
          imageUrl: true,
        },
      },
    },
  });

  return neurons;
}
