import React from "react";
import Client from "./Client";
import { getActiveMedia, getPlaceholder } from "@/actions/mediaActions";

async function Page() {
  const data = await getActiveMedia();
  if (!data) {
    return null; // Return early if no active media is available. This prevents the app from crashing.
  }
  const placeholder = await getPlaceholder();
  return (
    <div>
      <Client
        pactiveMedia={{ url: data.url ?? "", type: data.type ?? "" }}
        pplaceholder={placeholder?.url ?? ""}
      />
    </div>
  );
}

export default Page;
