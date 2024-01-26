"use client";
import { Task } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import {
  Banknote,
  Calendar,
  Check,
  Clock3,
  FileText,
  Landmark,
  Repeat2,
  User,
  X,
} from "lucide-react";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "client_name",
    header: () => (
      <div className="gap-2 flex items-center">
        <span className="text-opacity-60 text-indigo-500">
          <User size={18} />
        </span>
        <p>Client</p>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {row.getValue("client_name")}
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: () => (
      <div className="gap-2 flex items-center">
        <span className=" text-opacity-60 text-red-500">
          <FileText size={18} />
        </span>
        <p>Title</p>
      </div>
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "fee",
    header: () => (
      <div className="gap-2 flex items-center">
        <span className=" text-opacity-60 text-green-700">
          <Banknote size={24} />
        </span>
        <p>Fee</p>
      </div>
    ),
    cell: ({ row }) => (
      <div className="lowercase">{`$${row.getValue("fee")}`}</div>
    ),
  },
  {
    accessorKey: "payment_status",
    header: () => (
      <div className="gap-2 flex items-center">
        <span className=" text-opacity-60 text-amber-300">
          <Landmark size={24} />
        </span>
        <p>Payment</p>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-left gap-1 flex items-center font-medium">
          <span
            className={`${
              row.getValue("payment_status") === "Paid"
                ? "text-green-400"
                : "text-red-700"
            }`}
          >
            {row.getValue("payment_status") === "Paid" ? (
              <Check size={16} />
            ) : (
              <X size={16} />
            )}
          </span>
          {row.getValue("payment_status")}
        </div>
      );
    },
  },
  {
    accessorKey: "set_date",
    header: () => (
      <div className="gap-2 flex items-center">
        <span className="text-opacity-60 text-green-700">
          <Calendar size={18} />
        </span>
        <p>Date</p>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">{row.getValue("set_date")}</div>
      );
    },
  },
  {
    accessorKey: "set_time",
    header: () => (
      <div className="gap-2 flex items-center">
        <span className="text-opacity-60 text-sky-300">
          <Clock3 size={18} />
        </span>
        <p>Time</p>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">{row.getValue("set_time")}</div>
      );
    },
  },
  {
    accessorKey: "frequency",
    header: () => (
      <div className="gap-2 flex items-center">
        <span className="text-opacity-60 text-sky-700">
          <Repeat2 size={18} />
        </span>
        <p>Frequency</p>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">{row.getValue("frequency")}</div>
      );
    },
  },
];
