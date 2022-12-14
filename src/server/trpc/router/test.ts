import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { prisma } from "../../db/client";

export const testRouter = router({
  // Create publicProcedure at path 'hello'
  get: publicProcedure.query(async () => {
    const tests = await prisma.test
      .findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          NOT: [{ test: "null" }],
        },
      })
      .catch((err) => {
        throw err;
      });
    return {
      tests: tests,
    };
  }),
  "post-result": publicProcedure
    .input(
      z.object({
        username: z.string(),
        wpm: z.number(),
        testId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const createRes = await prisma.testResult
        .create({
          data: {
            username: input.username,
            wpm: input.wpm,
            testId: input.testId,
          },
        })
        .catch((err) => {
          throw err;
        });

      return {
        message: "success",
      };
    }),
});
