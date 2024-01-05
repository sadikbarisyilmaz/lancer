"use client";
import { Task } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const columns: ColumnDef<Task>[] = [
  // {
  //   id: "actions",
  //   header: () => <div className="text-left">Details</div>,
  //   cell: ({ row }) => {
  //     const client = row.original;

  //     return (
  //       <Link className="" href={`/home/clients/${client.id}`}>
  //         <FileText strokeWidth={1} size={24} />
  //       </Link>
  //     );
  //   },
  // },
  {
    accessorKey: "title",
    header: () => <div className="text-left">Title</div>,
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "client_name",
    header: () => <div className="text-left">Client</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {row.getValue("client_name")}
        </div>
      );
    },
  },
  {
    accessorKey: "about",
    header: () => <div className="text-left">About</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">{row.getValue("about")}</div>
      );
    },
  },
  {
    accessorKey: "fee",
    header: () => <div className="text-left">Fee</div>,
    cell: ({ row }) => <div className="lowercase">{row.getValue("fee")}</div>,
  },
  {
    accessorKey: "set_date",
    header: () => <div className="text-left">Set Date</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">{row.getValue("set_date")}</div>
      );
    },
  },
  {
    accessorKey: "paid_amount",
    header: () => <div className="text-left">Payment Made</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {row.getValue("paid_amount")}
        </div>
      );
    },
  },
];
