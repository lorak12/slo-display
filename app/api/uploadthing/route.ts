import { createRouteHandler } from "uploadthing/next";

import { MainFileRouter } from "./core";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: MainFileRouter,
  config: {
    token: process.env.UPLOADTHING_TOKEN as string,
  },
});
