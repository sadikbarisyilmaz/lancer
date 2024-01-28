"use client";
import { Button } from "@/components/ui/button";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, ChevronDownIcon } from "lucide-react";
import { CreateTaskForm } from "../forms/CreateTaskForm";
import { Client } from "@/lib/types";
import Link from "next/link";
import { Input } from "../ui/input";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rows: number;
  isInClientDetailsPage: boolean;
  clients: Client[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  rows,
  clients,
  isInClientDetailsPage,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const router = useRouter();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    initialState: { pagination: { pageSize: rows, pageIndex: 0 } },
    state: {
      columnFilters,
    },
  });

  return (
    <>
      <div className="rounded-md border mb-2">
        <Table className="">
          <TableHeader className="sticky">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, i) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="cursor-pointer"
                  // @ts-ignore
                  onClick={() => router.push(`/home/tasks/${data[i].id}`)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 md:text-center"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {data.length > rows && (
        <div className="flex flex-col sm:flex-row justify-between gap-1">
          {!isInClientDetailsPage ? (
            <div className="flex w-full justify-between ">
              <div className="flex flex-col sm:flex-row w-full sm:items-center pb-2 gap-2">
                <div className="flex items-center">
                  <Input
                    placeholder="Filter Clients..."
                    value={
                      (table
                        .getColumn("client_name")
                        ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) =>
                      table
                        .getColumn("client_name")
                        ?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm "
                  />
                </div>
                <div className="">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="ml-auto">
                        Payment <ChevronDownIcon className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={(event) =>
                          table.getColumn("payment_status")?.setFilterValue("")
                        }
                      >
                        Show All
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(event) =>
                          table
                            .getColumn("payment_status")
                            ?.setFilterValue("done")
                        }
                      >
                        Payment Done
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(event) =>
                          table
                            .getColumn("payment_status")
                            ?.setFilterValue("not")
                        }
                      >
                        Not Paid
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="flex w-full justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Prev
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex w-full order-1 sm:order-2 items-center justify-between space-x-2 pb-2">
              <div className="flex">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                      Payment <ChevronDownIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={(event) =>
                        table.getColumn("payment_status")?.setFilterValue("")
                      }
                    >
                      Show All
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(event) =>
                        table
                          .getColumn("payment_status")
                          ?.setFilterValue("done")
                      }
                    >
                      Payment Done
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(event) =>
                        table.getColumn("payment_status")?.setFilterValue("not")
                      }
                    >
                      Not Paid
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Prev
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
      {clients.length > 0 ? (
        <span>
          <CreateTaskForm clients={clients} />
        </span>
      ) : (
        <div className="flex items-center py-3 gap-2">
          <AlertCircle />
          <p className="">
            Please create a{" "}
            <Link href={"/home/clients"} className="font-bold">
              client
            </Link>{" "}
            before adding tasks.
          </p>
        </div>
      )}
    </>
  );
}
