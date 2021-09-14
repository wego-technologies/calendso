import { z } from "zod";
import { createRouter } from "../createRouter";

export const bookingRouter = createRouter()
  .query("userAndEventTypes", {
    input: z.string(),
    async resolve({ input, ctx }) {
      const { prisma } = ctx;

      const user = await prisma.user.findUnique({
        where: {
          username: input,
        },
        select: {
          id: true,
          username: true,
          email: true,
          name: true,
          bio: true,
          avatar: true,
          theme: true,
          plan: true,
        },
      });
      if (!user) {
        return null;
      }

      const eventTypesWithHidden = await prisma.eventType.findMany({
        where: {
          OR: [
            {
              userId: user.id,
            },
            {
              users: {
                some: {
                  id: user.id,
                },
              },
            },
          ],
        },
        select: {
          id: true,
          slug: true,
          title: true,
          length: true,
          description: true,
          hidden: true,
        },
        take: user.plan === "FREE" ? 1 : undefined,
      });
      const eventTypes = eventTypesWithHidden.filter((evt) => !evt.hidden);
      return {
        user,
        eventTypes,
      };
    },
  })
  .query("eventByUserAndType", {
    input: z.object({
      user: z.string(),
      type: z.string(),
    }),
    async resolve() {
      // FIXME
      return {};
    },
  });
