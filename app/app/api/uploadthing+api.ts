import { createUploadthing, UploadThingError } from "uploadthing/server";
import type { FileRouter } from "uploadthing/server";
import { createRouteHandler } from "uploadthing/server";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

const uploadRouter = {
  document: f({
    pdf: {
      maxFileSize: "8MB",
    },
  })
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      console.log(req);
      const user = await auth(req);

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");
      console.log("REQ", req);

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })

    .onUploadComplete(({ file, metadata }) => {
      // This code RUNS ON YOUR SERVER after upload
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      console.log("File uploaded by user", metadata.userId);
      console.log("File url", file.url);
      return { url: file.url };
    }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;

const handlers = createRouteHandler({
  router: uploadRouter,
  config: { logFormat: "pretty", logLevel: "Debug" },
});

export { handlers as GET, handlers as POST };
