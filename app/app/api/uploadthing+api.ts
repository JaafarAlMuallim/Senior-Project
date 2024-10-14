import { createUploadthing, UploadThingError } from "uploadthing/server";
import type { FileRouter } from "uploadthing/server";
import { createRouteHandler } from "uploadthing/server";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

const uploadRouter = {
  img: f({
    image: {
      maxFileSize: "2MB",
    },
  })
    // document: f({
    //   pdf: {
    //     maxFileSize: "4MB",
    //   },
    // })
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await auth(req);
      console.log(user);

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(({ file, metadata }) => {
      // This code RUNS ON YOUR SERVER after upload

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { url: file.url };
    }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;

const handlers = createRouteHandler({
  router: uploadRouter,
});

export { handlers as GET, handlers as POST };
