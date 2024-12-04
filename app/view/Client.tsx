"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import supabase from "@/lib/supabase";

export default function Client({
  pactiveMedia: { url, type },
  pplaceholder,
}: {
  pactiveMedia: { url: string; type: "IMAGE" | "AUDIO" | "VIDEO" };
  pplaceholder: string;
}) {
  const [activeMedia, setActiveMedia] = useState<{
    url: string;
    type: "IMAGE" | "AUDIO" | "VIDEO";
  }>({ url, type });
  const [placeholder] = useState<string>(pplaceholder);

  useEffect(() => {
    const changes = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "Media",
        },
        (payload) => {
          if (!payload.old.active && payload.new.active) {
            const { url, type } = payload.new;
            setActiveMedia({ url, type });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(changes);
    };
  }, []);

  if (!activeMedia) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <h1 className="text-3xl">No active media to display</h1>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      {activeMedia.type === "IMAGE" && (
        <Image fill src={activeMedia.url} alt="Active Media" />
      )}
      {activeMedia.type === "VIDEO" && (
        <video
          autoPlay
          src={activeMedia.url}
          className="max-h-screen fixed top-0 left-0 w-full h-full"
        ></video>
      )}
      {activeMedia.type === "AUDIO" && (
        <div className="text-center text-white">
          <audio src={activeMedia.url} autoPlay></audio>
          <Image fill src={placeholder} alt="Placeholder" />
        </div>
      )}
    </div>
  );
}
