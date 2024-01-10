"use client";
import { Task } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteTasks, updatePaymentStatus } from "@/app/actions";

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
    cell: ({ row }) => (
      <div className="lowercase">{`$${row.getValue("fee")}`}</div>
    ),
  },
  {
    accessorKey: "set_date",
    header: () => <div className="text-left">Set Date</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {format(row.getValue("set_date"), "EEEE")}
          {" - "}
          {format(row.getValue("set_date"), "dd/MM/yyyy")}
        </div>
      );
    },
  },
  {
    accessorKey: "payment_status",
    header: () => <div className="text-left">Payment</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {row.getValue("payment_status")}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-[20px] w-[20px] p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                updatePaymentStatus(
                  row.original.payment_status,
                  row.original.id
                )
              }
            >
              Mark as{" "}
              {`${
                row.original.payment_status === "Paid" ? "Not Paid" : "Paid"
              }`}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => deleteTasks(row.original.id)}>
              Delete Task
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
