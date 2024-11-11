import { z } from "zod";
import { authProcedure, router } from "../trpc";

export const profileSchema = z.object({
  id: z.string(),
  userId: z.string(),
  major: z.string(),
  standing: z.string(),
  university: z.string(),
  phone: z.string(),
  name: z.string(),
});

export const profileRouter = router({
  get: authProcedure.query(async ({ ctx }) => {
    console.log("PROFILE");
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
        throw new Error("Profile not found");
      }
      console.log("RETURNED PROFILE ", profile);
      return profile;
    } catch (e) {
      console.log(e);
    }
  }),
  update: authProcedure
    .input(
      z.object({
        data: profileSchema.partial(),
      }),
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
            standing: data.standing,
            university: data.university,
            phone: data.phone,
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
});
