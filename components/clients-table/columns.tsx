"use client";
import { Client } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { FileText, Mail, Phone, User } from "lucide-react";

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "name",
    header: () => (
      <div className="gap-2 flex items-center">
        <span className=" text-opacity-60 text-indigo-500">
          <User size={18} />
        </span>
        <p>Name</p>
      </div>
    ),
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "type",
    header: () => (
      <div className="gap-2 flex items-center">
        <span className=" text-opacity-60 text-green-500">
          <FileText size={18} />
        </span>
        <p>Type</p>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">{row.getValue("type")}</div>
      );
    },
  },
  {
    accessorKey: "email",
    header: () => (
      <div className="gap-2 flex items-center">
        <span className=" text-opacity-60 text-red-500">
          <Mail size={18} />
        </span>
        <p>Email</p>
      </div>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phone",
    header: () => (
      <div className="gap-2 flex items-center">
        <span className=" text-opacity-60 text-amber-400 ">
          <Phone size={18} />
        </span>
        <p>Phone</p>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">{row.getValue("phone")}</div>
      );
    },
  },
  {
    accessorKey: "id",
    header: () => (
      <div className="gap-2 flex items-center">
        <span className=" text-opacity-60 text-amber-400 ">
          <Phone size={18} />
        </span>
        <p>Phone</p>
      </div>
    ),
    cell: ({ row }) => {
      return <div className="text-left font-medium">{row.getValue("id")}</div>;
    },
  },
];
