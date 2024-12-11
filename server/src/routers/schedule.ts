import { z } from "zod";
import { authProcedure, router } from "../trpc";

export const scheduleRouter = router({
  createSchedule: authProcedure
    .input(
      z.object({
        sectionId: z.string(),
        semester: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { semester, sectionId } = input;
      const registration = await ctx.postgresClient.registration.findFirst({
        where: {
          userId: ctx.user?.id,
          semester,
          sectionId,
        },
      });

      if (registration) {
        throw new Error("Registration already exists");
      }

      const reg = await ctx.postgresClient.registration.create({
        data: {
          userId: ctx.user?.id!,
          sectionId,
          semester,
        },
        include: {
          section: {
            include: {
              course: true,
            },
          },
        },
      });

      const [aiG, groupG] = await Promise.all([
        ctx.postgresClient.group.findFirst({
          where: {
            courseId: reg.section.courseId,
            type: "GROUP",
          },
        }),
        ctx.postgresClient.group.findFirst({
          where: {
            courseId: reg.section.courseId,
            type: "AI",
          },
        }),
      ]);

      let aiUser = null;
      let groupReg = null;
      let aiReg = null;
      if (!aiG) {
        const [postAiUser, aiGroupPostgres] = await Promise.all([
          await ctx.postgresClient.user.create({
            data: {
              email: `${reg.section.course.code}@EduLink.co`,
              name: reg.section.course.code.toUpperCase(),
              clerkId: crypto.randomUUID(),
            },
          }),
          await ctx.postgresClient.group.create({
            data: {
              courseId: reg.section.courseId,
              name: reg.section.course.code.toUpperCase(),
              type: "AI",
            },
          }),
        ]);
        await Promise.all([
          (aiReg = await ctx.mongoClient.group.create({
            data: {
              name: reg.section.course.code.toUpperCase(),
              type: "AI",
              groupId: aiGroupPostgres.id,
              ownerId: ctx.user?.id!,
            },
          })),
          (aiUser = await ctx.mongoClient.user.create({
            data: {
              name: reg.section.course.code.toUpperCase(),
              email: `${reg.section.course.code}@EduLink.co`,
              clerkId: postAiUser.clerkId,
              userId: postAiUser.id,
            },
          })),
        ]);
      } else {
        await Promise.all([
          (aiUser = await ctx.mongoClient.user.findFirst({
            where: {
              email: `${reg.section.course.code}@EduLink.co`,
            },
          })),
          (aiReg = await ctx.mongoClient.group.findFirst({
            where: {
              name: reg.section.course.code.toUpperCase(),
              type: "AI",
            },
          })),
        ]);
      }

      if (!groupG) {
        const groupPostgres = await ctx.postgresClient.group.create({
          data: {
            courseId: reg.section.courseId,
            name: reg.section.course.code.toUpperCase(),
            type: "GROUP",
          },
        });
        groupReg = await ctx.mongoClient.group.create({
          data: {
            name: reg.section.course.code.toUpperCase(),
            type: "GROUP",
            groupId: groupPostgres.id,
          },
        });
      } else {
        groupReg = await ctx.mongoClient.group.findFirst({
          where: {
            name: reg.section.course.code.toUpperCase(),
            type: "GROUP",
          },
        });
      }

      await ctx.mongoClient.userGroups.createMany({
        data: [
          {
            userId: ctx.user?.id!,
            groupId: aiReg!.id,
          },
          {
            userId: ctx.user?.id!,
            groupId: groupReg!.id,
          },
          {
            userId: aiUser?.id!,
            groupId: aiReg!.id,
          },
        ],
      });
      return reg;
    }),

  removeSchedule: authProcedure
    .input(
      z.object({
        sectionId: z.string(),
        semester: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { semester, sectionId } = input;
      const registration = await ctx.postgresClient.registration.findFirst({
        where: {
          userId: ctx.user?.id,
          semester,
          sectionId,
        },
        include: {
          section: {
            include: {
              course: true,
            },
          },
        },
      });

      if (!registration) {
        throw new Error("Registration does not exist");
      }

      await ctx.postgresClient.registration.delete({
        where: {
          id: registration.id,
        },
      });

      const [groupAI, groupReg] = await Promise.all([
        ctx.postgresClient.group.findFirst({
          where: {
            courseId: registration.section.courseId,
            type: "AI",
          },
        }),
        ctx.postgresClient.group.findFirst({
          where: {
            courseId: registration.section.courseId,
            type: "GROUP",
          },
        }),
      ]);

      const [mongoAI, mongoGroup] = await Promise.all([
        ctx.mongoClient.group.findFirst({
          where: {
            groupId: groupAI?.id,
            type: "AI",
          },
        }),
        ctx.mongoClient.group.findFirst({
          where: {
            groupId: groupReg?.id,
            type: "GROUP",
          },
        }),
      ]);

      await Promise.all([
        ctx.mongoClient.userGroups.deleteMany({
          where: {
            groupId: mongoAI?.id,
            userId: ctx.user?.id!,
          },
        }),
        ctx.mongoClient.userGroups.deleteMany({
          where: {
            groupId: mongoGroup?.id,
            userId: ctx.user?.id!,
          },
        }),
      ]);
    }),
  getSchedule: authProcedure
    .input(
      z.object({
        semester: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { semester } = input;
      try {
        const registrations = await ctx.postgresClient.registration.findMany({
          where: {
            userId: ctx.user?.id,
            semester,
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
      } catch (error) {
        console.log(error);
        throw new Error("Error getting schedule");
      }
    }),

  getSemesters: authProcedure.query(async ({ ctx }) => {
    const uniqueSemesters = await ctx.postgresClient.registration.findMany({
      where: {
        userId: ctx.user?.id,
      },
      select: {
        semester: true,
      },
      distinct: ["semester"],
    });
    return uniqueSemesters.map((registration) => registration.semester);
  }),
});
