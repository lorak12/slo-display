"use client";

import { getActiveMedia, getPlaceholder } from "@/actions/mediaActions";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ViewPage() {
  const [activeMedia, setActiveMedia] = useState<{
    url: string;
    type: "IMAGE" | "AUDIO" | "VIDEO";
  } | null>(null);
  const [placeholder, setPlaceholder] = useState<string>("/placeholder.svg");

  useEffect(() => {
    // Fetch the active media from the database
    async function fetchActiveMedia() {
      const data = await getActiveMedia();
      const placeholder = await getPlaceholder();
      setPlaceholder(placeholder?.url ?? "");
      setActiveMedia(data);
    }

    fetchActiveMedia();

    // Optionally, set up a polling mechanism or use real-time listeners if required
    const interval = setInterval(fetchActiveMedia, 1000); // Refresh every  second
    return () => clearInterval(interval);
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
        <video autoPlay src={activeMedia.url} className="max-h-screen"></video>
      )}
      {activeMedia.type === "AUDIO" && (
        <div className="text-center text-white">
          <Image fill src={placeholder} alt="Placeholder" />
          <audio autoPlay>
            <source src={activeMedia.url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
}
