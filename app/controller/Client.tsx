"use client";

import { createMedia } from "@/actions/mediaActions";
import { DataTable } from "@/components/ui/data-table";
import supabase from "@/lib/supabase";
import { UploadButton } from "@/lib/uploadthing";
import { useEffect, useState } from "react";
import { columns } from "./columns";

export default function Client({
  initialData,
}: {
  initialData: {
    id: string;
    url: string;
    type: "IMAGE" | "AUDIO" | "VIDEO";
    name: string;
    placeholder: boolean;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
  }[];
}) {
  const [media, setMedia] = useState<
    {
      id: string;
      url: string;
      type: "IMAGE" | "AUDIO" | "VIDEO";
      name: string;
      placeholder: boolean;
      active: boolean;
      createdAt: Date;
      updatedAt: Date;
    }[]
  >(initialData);

  useEffect(() => {
    const changes = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*", // Listen to all changes (INSERT, UPDATE, DELETE)
          schema: "public",
          table: "Media",
        },
        (payload) => {
          const { eventType, new: newRecord, old: oldRecord } = payload;

          setMedia((prev) => {
            switch (eventType) {
              case "INSERT":
                // Add new record
                return [
                  ...prev,
                  {
                    id: newRecord?.id,
                    url: newRecord?.url,
                    type: newRecord?.type,
                    name: newRecord?.name,
                    placeholder: newRecord?.placeholder,
                    active: newRecord?.active,
                    createdAt: newRecord?.createdAt,
                    updatedAt: newRecord?.updatedAt,
                  },
                ];

              case "UPDATE":
                // Update the specific record
                return prev.map((m) =>
                  m.id === oldRecord?.id
                    ? {
                        ...m,
                        id: newRecord?.id,
                        url: newRecord?.url,
                        type: newRecord?.type,
                        name: newRecord?.name,
                        placeholder: newRecord?.placeholder,
                        active: newRecord?.active,
                        createdAt: newRecord?.createdAt,
                        updatedAt: newRecord?.updatedAt,
                      }
                    : m
                );

              case "DELETE":
                // Remove the deleted record
                return prev.filter((m) => m.id !== oldRecord?.id);

              default:
                return prev;
            }
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(changes);
    };
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Media Upload Controller</h1>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={async (res) => {
          await createMedia(
            res.at(0)?.url || "",
            res.at(0)?.type.toUpperCase().slice(0, 5) as
              | "IMAGE"
              | "AUDIO"
              | "VIDEO",
            res.at(0)?.name || "None"
          );
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
      <div className="mt-4">
        <h2 className="text-lg">Uploaded Files:</h2>
        <DataTable data={media} columns={columns} filter="name" />
      </div>
    </div>
  );
}
