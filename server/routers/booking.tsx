import { Availability } from "@prisma/client";
import { z } from "zod";
import { createRouter } from "../createRouter";

export const bookingRouter = createRouter()
  .query("userAndEventTypes", {
    input: z.string(),
    async resolve({ input, ctx }) {
      const user = await ctx.prisma.user.findUnique({
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

      const eventTypesWithHidden = await ctx.prisma.eventType.findMany({
        where: {
          userId: user.id,
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
    async resolve({ input, ctx }) {
      const user = await ctx.prisma.user.findUnique({
        where: {
          username: input.user.toLowerCase(),
        },
        select: {
          id: true,
          username: true,
          name: true,
          email: true,
          bio: true,
          avatar: true,
          startTime: true,
          endTime: true,
          timeZone: true,
          weekStart: true,
          availability: true,
          hideBranding: true,
          theme: true,
          plan: true,
        },
      });

      if (!user) {
        return null;
      }
      const eventType = await ctx.prisma.eventType.findUnique({
        where: {
          userId_slug: {
            userId: user.id,
            slug: input.type,
          },
        },
        select: {
          id: true,
          title: true,
          description: true,
          length: true,
          availability: true,
          timeZone: true,
          periodType: true,
          periodDays: true,
          periodStartDate: true,
          periodEndDate: true,
          periodCountCalendarDays: true,
          minimumBookingNotice: true,
          hidden: true,
        },
      });

      if (!eventType || eventType.hidden) {
        return null;
      }

      // check this is the first event
      if (user.plan === "FREE") {
        const firstEventType = await ctx.prisma.eventType.findFirst({
          where: {
            userId: user.id,
          },
          select: {
            id: true,
          },
        });
        if (firstEventType?.id !== eventType.id) {
          return null;
        }
      }
      const getWorkingHours = (providesAvailability: { availability: Availability[] }) =>
        providesAvailability.availability && providesAvailability.availability.length
          ? providesAvailability.availability
          : null;

      const workingHours =
        getWorkingHours(eventType) ||
        getWorkingHours(user) ||
        [
          {
            days: [0, 1, 2, 3, 4, 5, 6],
            startTime: user.startTime,
            endTime: user.endTime,
          },
        ].filter((availability): boolean => typeof availability["days"] !== "undefined");

      workingHours.sort((a, b) => a.startTime - b.startTime);

      const eventTypeObject = Object.assign({}, eventType, {
        periodStartDate: eventType.periodStartDate?.toString() ?? null,
        periodEndDate: eventType.periodEndDate?.toString() ?? null,
      });

      return {
        user,
        eventType: eventTypeObject,
        workingHours,
      };
    },
  });
