import { z } from "zod";
import { db } from "../db";
import { publicProcedure } from "../trpc";

export const scheduleRouter = {
    createSchedule: publicProcedure // TODO: Change to authProcedure
        .input(
            z.object({
                courseId: z.string(),
                semester: z.string(),
                userId: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const registration = await db.registration.findFirst({
                where: {
                    courseId: input.courseId,
                    userId: input.userId, // TODO: Need to replace with ctx.user.id later
                    semester: input.semester,
                },
            });

            if (registration) {
                throw new Error("Registration already exists");
            }

            return await db.registration.create({
                data: {
                    courseId: input.courseId,
                    userId: input.userId, // TODO: Need to replace with ctx.user.id later
                    semester: input.semester,
                },
            });
        }),
    getSchedule: publicProcedure
        .input(
            z.object({
                userId: z.string(),
                semester: z.string(),
            })
    )
        .query(async ({ input }) => {
            const registrations = await db.registration.findMany({
                where: {
                    userId: input.userId,
                    semester: input.semester,
                },
                include: {
                    section: {
                        include: {
                            course: true,
                        },
                    },
                },
            });

            return registrations;
        }),

    getSemesters: publicProcedure
        .input(
            z.object({
                userId: z.string(),
            })
        )
        .query(async ({ input }) => {
            const uniqueSemesters = await db.registration.findMany({
                where: {
                    userId: input.userId,
                },
                select: {
                    semester: true,
                },
                distinct: ['semester'],
            });

            return uniqueSemesters.map((registration) => registration.semester);
        }),
};