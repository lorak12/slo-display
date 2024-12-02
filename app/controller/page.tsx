import React from "react";
import Client from "./Client";
import { getMedia } from "@/actions/mediaActions";
import Link from "next/link";

async function Page() {
  const media = await getMedia();
  return (
    <div>
      <div className="flex items-center justify-center gap-4">
        <Link href="/">Home</Link>
        <Link href="/controller">Kontroller</Link>
        <Link href="/view">View</Link>
      </div>
      <Client initialData={media} />
    </div>
  );
}

export default Page;
