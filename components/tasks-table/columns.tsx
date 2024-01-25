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
        <p>Client</p>
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
        <p>Date</p>
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
        <p>Time</p>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">{row.getValue("frequency")}</div>
      );
    },
  },

  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const payment = row.original;
  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-[20px] w-[20px] p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem
  //             onClick={() =>
  //               updatePaymentStatus(
  //                 row.original.payment_status,
  //                 row.original.id
  //               )
  //             }
  //           >
  //             Mark as{" "}
  //             {`${
  //               row.original.payment_status === "Paid" ? "Not Paid" : "Paid"
  //             }`}
  //           </DropdownMenuItem>
  //           <DropdownMenuItem onClick={() => deleteTasks(row.original.id)}>
  //             Delete Task
  //           </DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];
