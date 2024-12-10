import { z } from "zod";
import { authProcedure, publicProcedure, router } from "../trpc";

export const profileSchema = z.object({
  id: z.string(),
  email: z.string(),
  userId: z.string(),
  major: z.string(),
  university: z.string(),
  name: z.string(),
  password: z.string().optional(),
});

export const profileRouter = router({
  get: authProcedure.query(async ({ ctx }) => {
    try {
      const profile = await ctx.postgresClient.profile.findFirst({
        where: {
          userId: ctx.user?.id,
        },
        include: {
          user: true,
        },
      });

      if (!profile) {
        return null;
      }
      return profile;
    } catch (e) {
      console.log(e);
    }
  }),
  update: authProcedure
    .input(
      z.object({
        data: profileSchema.partial(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { data } = input;
      try {
        const profile = await ctx.postgresClient.profile.update({
          where: {
            userId: ctx.user?.id,
          },
          data: {
            major: data.major,
            university: data.university,
            user: {
              update: {
                name: data.name,
              },
            },
          },
        });
        return profile;
      } catch (e) {
        console.log(e);
        throw new Error("Profile not found");
      }
    }),
  roles: publicProcedure.query(async ({ ctx }) => {
    try {
      if (!ctx.user) {
        return {
          admin: false,
          tutor: false,
        };
      }
      const allRoles = await ctx.postgresClient.user.findFirst({
        where: {
          id: ctx.user?.id,
        },
        include: {
          Admin: true,
          Tutor: true,
        },
      });
      const roles = {
        admin: !!allRoles?.Admin,
        tutor: !!allRoles?.Tutor,
      };

      return roles;
    } catch (e) {
      console.log(e);
      throw new Error("Roles not found");
    }
  }),
});
