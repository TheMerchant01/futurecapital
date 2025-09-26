"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "../../../components/ui/button";
import { Checkbox } from "../../../components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { Input } from "../../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { useState } from "react";
import { ScrollArea } from "../../../components/ui/scroll-area";
import Link from "next/link";
import toast from "react-hot-toast";
import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog";
import axios from "axios";

export default function Ttable({ data, setData, email }) {
  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "market",
      header: "Asset ",
      cell: ({ row }) => <div>{row.getValue("market")}</div>,
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => (
        <div className=" capitalize">{row.getValue("type")}</div>
      ),
    },
    {
      accessorKey: "amount",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="font-bold"
          >
            Amount
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },

      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"));

        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);

        return <div className="lowercase">{formatted}</div>;
      },
    },
    {
      accessorKey: "stopLoss",
      header: "Stop Loss",
      cell: ({ row }) => <div>{row.getValue("stopLoss")}</div>,
    },
    {
      accessorKey: "takeProfit",
      header: "Take Profit",
      cell: ({ row }) => <div>{row.getValue("takeProfit")}</div>,
    },
    {
      accessorKey: "entryPrice",
      header: "Entry Price",
      cell: ({ row }) => <div>{row.getValue("entryPrice")}</div>,
    },
    {
      accessorKey: "lotSize",
      header: "Lot Size",
      cell: ({ row }) => <div>{row.getValue("lotSize")}</div>,
    },
    {
      accessorKey: "duration",
      header: "Duration",
      cell: ({ row }) => <div>{row.getValue("duration")}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <div>{row.getValue("status")}</div>,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                {/* <span className="sr-only">Open menu</span> */}
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {/* <DropdownMenuItem
                className="bg-re-50 text-green-800   py-2"
                // onClick={() =>
                //   updateTransactionStatus(payment.id, "Gain", payment.amount)
                // }
              >
                <Dialog>
                  <DialogTrigger>Make Changes</DialogTrigger>
                  <DialogContent>hello</DialogContent>
                </Dialog>
              </DropdownMenuItem> */}
              {payment.status !== "Gain" && (
                <DropdownMenuItem
                  className="bg-re-50 text-green-800   py-2"
                  onClick={() =>
                    updateTransactionStatus(
                      payment.id,
                      "Gain",
                      payment.market,
                      payment.type,
                      payment.entryPrice
                    )
                  }
                >
                  Set to Gain
                </DropdownMenuItem>
              )}
              {payment.status !== "Running" && (
                <DropdownMenuItem
                  className="bg-re-50   py-2"
                  onClick={() =>
                    updateTransactionStatus(
                      payment.id,
                      "Running",
                      payment.market,
                      payment.type,
                      payment.entryPrice
                    )
                  }
                >
                  Set to Running
                </DropdownMenuItem>
              )}
              {payment.status !== "Loss" && (
                <DropdownMenuItem
                  className="bg-re-50 fot-bold hover:text-red-600 text-red-700 py-2"
                  onClick={() =>
                    updateTransactionStatus(
                      payment.id,
                      "Loss",
                      payment.market,
                      payment.type,
                      payment.entryPrice,
                      payment.amount
                    )
                  }
                >
                  Set to Loss
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const updateTransactionStatus = async (
    tradeId,
    newStatus,
    asset,
    type,
    price,
    amount
  ) => {
    try {
      if (newStatus === "Gain") {
        // If newStatus is "Gain," prompt the user to enter a value
        const proceed = confirm("Proceed with this action?");
        const gainValue = prompt("Enter the gain amount in usd:");
        if (gainValue !== null) {
          // If the user doesn't cancel the prompt
          if (proceed) {
            const response = await axios.post("/db/trades/", {
              email,
              tradeId,
              newStatus,
              asset,
              type,
              price,
              gain: parseFloat(gainValue),
            });

            if (response.status === 200) {
              // Transaction status updated successfully on the backend, update the frontend
              const updatedData = data.map((trade) => {
                if (trade.id === tradeId) {
                  // Update the transaction status
                  toast.success("Changes Applied");
                  return { ...trade, status: newStatus };
                }
                return trade;
              });

              // Update the state with the new data
              setData(updatedData);
            } else {
              // Handle error cases when the backend update fails
              console.error(
                "Failed to update transaction status on the backend"
              );
            }
          }
        }
      } else {
        // For other cases, proceed with the usual logic
        const proceed = confirm("Proceed with this action?");
        const lossValue = prompt("Enter the loss amount in usd:");

        if (lossValue !== null) {
          if (proceed) {
            const response = await axios.post("/db/trades/", {
              email,
              tradeId,
              newStatus,
              asset,
              type,
              price,
              loss: parseFloat(lossValue),
              amount,
            });

            if (response.status === 200) {
              // Transaction status updated successfully on the backend, update the frontend
              const updatedData = data.map((trade) => {
                if (trade.id === tradeId) {
                  // Update the transaction status
                  toast.success("Changes Applied");
                  return { ...trade, status: newStatus };
                }
                return trade;
              });

              // Update the state with the new data
              setData(updatedData);
            } else {
              // Handle error cases when the backend update fails
              console.error(
                "Failed to update transaction status on the backend"
              );
            }
          }
        }
      }
    } catch (error) {
      console.error("Error while updating transaction status:", error);
    }
  };

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center gap-x-2 py-4">
        <Input
          placeholder="Search by Assets..."
          value={table.getColumn("market")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("market")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="ml-auto text-sm md:text-base font-bold"
            >
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <ScrollArea className="">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </ScrollArea>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border px-2 max-w-[100vw]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="font-bold text-black">
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
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-8">
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
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
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
    </div>
  );
}
