import type { FileRouter } from "uploadthing/server";
import {
  createRouteHandler,
  createUploadthing,
  UploadThingError,
} from "uploadthing/server";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

const uploadRouter = {
  pdf: f({
    pdf: {
      maxFileSize: "16MB",
    },
  })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadError((error) => {
      console.log(error, "On upload error");
    })
    .onUploadComplete(({ file, metadata }) => {
      console.log("File uploaded by user", metadata.userId);
      console.log("PDF url", file.url);
      return { url: file.url };
    }),
  audio: f({
    audio: {
      maxFileSize: "16MB",
    },
  })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadError((error) => {
      console.log(error, "On upload error");
    })
    .onUploadComplete(({ file, metadata }) => {
      console.log("File uploaded by user", metadata.userId);
      console.log("Audio url", file.url);
      return { url: file.url };
    }),
  image: f({
    image: {
      maxFileSize: "8MB",
    },
  })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadError((error) => {
      console.log(error, "On upload error");
    })
    .onUploadComplete(({ file, metadata }) => {
      console.log("File uploaded by user", metadata.userId);
      console.log("Image url", file.url);
      return { url: file.url };
    }),

  // document: f({
  //   pdf: {
  //     maxFileSize: "8MB",
  //   },
  //   audio: {
  //     maxFileSize: "8MB",
  //   },
  //   image: {
  //     maxFileSize: "8MB",
  //   },
  // })
  //   .middleware(async ({ req }) => {
  //     // This code runs on your server before upload
  //     console.log(req);
  //     const user = await auth(req);
  //
  //     // If you throw, the user will not be able to upload
  //     if (!user) throw new UploadThingError("Unauthorized");
  //     console.log("REQ", req);
  //
  //     // Whatever is returned here is accessible in onUploadComplete as `metadata`
  //     return { userId: user.id };
  //   })
  //
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;

const handlers = createRouteHandler({
  router: uploadRouter,
  config: { logFormat: "pretty", logLevel: "Debug" },
});

export { handlers as GET, handlers as POST };
