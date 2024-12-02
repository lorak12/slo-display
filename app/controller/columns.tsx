"use client";

import { updateMediaActive } from "@/actions/mediaActions";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Power } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export type Media = {
  id: string;
  url: string;
  type: "IMAGE" | "AUDIO" | "VIDEO";
  name: string;
  active: boolean;
  placeholder: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<Media>[] = [
  {
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Nazwa" />;
    },
    accessorKey: "name",
  },
  {
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Aktywność" />;
    },
    accessorKey: "active",
    cell: ({ row }) => {
      return <div>{Boolean(row.original.active) ? "Tak" : "Nie"}</div>;
    },
  },
  {
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Placeholder" />;
    },
    accessorKey: "placeholder",
    cell: ({ row }) => {
      return <div>{Boolean(row.original.placeholder) ? "Tak" : "Nie"}</div>;
    },
  },
  {
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Typ" />;
    },
    accessorKey: "type",
    cell: ({ row }) => {
      return <div>{row.original.type}</div>;
    },
  },
  {
    header: "",
    accessorKey: "Aktywuj",
    cell: ({ row }) => {
      return (
        <Button
          onClick={async () => {
            await updateMediaActive(row.original.id);
          }}
          size="icon"
        >
          <Power className="w-4 h-4" />
        </Button>
      );
    },
  },
  {
    header: "",
    accessorKey: "Edytuj",
    cell: ({ row }) => {
      return (
        <Link href={`/controller/${row.original.id}`}>
          <Button size="icon">
            <Edit className="w-4 h-4" />
          </Button>
        </Link>
      );
    },
  },
];
