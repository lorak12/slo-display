import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const MainFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "64MB",
    },
    video: {
      maxFileSize: "64MB",
    },
    audio: {
      maxFileSize: "64MB",
    },
  }).onUploadComplete(async ({ file }) => {
    return file;
  }),
} satisfies FileRouter;

export type MainFileRouter = typeof MainFileRouter;
