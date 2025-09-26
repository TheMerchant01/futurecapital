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
import toast from "react-hot-toast";

export default function Ttable({
  data,
  setData,
  email,
  name,

  setLastPaid,
}) {
  const currentDate = new Date();
  const thirtyDaysAgo = new Date(currentDate);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  console.log(thirtyDaysAgo);

  const columns = [
    {
      id: "select",
      header: "Notif",
      cell: ({ row }) => (
        <>
          {!(new Date(row.original.lastPaid) >= thirtyDaysAgo) && (
            <div className="h-2 w-2 rounded-full bg-red-500"></div>
          )}
        </>
      ),
    },
    {
      accessorKey: "stakedAsset",
      header: "Asset ",
      cell: ({ row }) => <div>{row.getValue("stakedAsset")}</div>,
    },

    {
      accessorKey: "stakedAmount",
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
    },
    {
      accessorKey: "stakedDuration",
      header: "Duration (months)",
      cell: ({ row }) => <div>{row.getValue("stakedDuration")}</div>,
    },
    {
      accessorKey: "monthsLeft",
      header: "Months Left",
      cell: ({ row }) => (
        <div>
          {" "}
          {Math.floor(
            row.original.stakedDuration -
              (new Date() - row.original.dateStaked) /
                (30 * 24 * 60 * 60 * 1000)
          )}
        </div>
      ),
    },
    {
      accessorKey: "monthlyReturns",
      header: "Monthly Returns",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("monthlyReturns"));

        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);

        return <div className="lowercase">{formatted}</div>;
      },
    },
    {
      accessorKey: "totalReturns",
      header: "Total Returns",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("totalReturns"));

        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);

        return <div className="lowercase">{formatted}</div>;
      },
    },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("status")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original;
        const isPaid = new Date(row.original.lastPaid) >= thirtyDaysAgo;
        console.log(isPaid);

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

              {Math.floor(
                row.original.stakedDuration -
                  (new Date() - row.original.dateStaked) /
                    (30 * 24 * 60 * 60 * 1000)
              ) < 0 &&
                row.original.status.toLowerCase() !== "completed" && (
                  <DropdownMenuItem
                    className="bg-re-50 fnt-bold  py-2"
                    onClick={() => {
                      const proceed = confirm(
                        "Proceed with this action? or cancel"
                      );
                      if (proceed)
                        updateTransactionStatus(
                          payment.id,
                          "Completed",
                          parseFloat(payment.monthlyReturns),
                          payment.stakedAsset
                        );
                    }}
                  >
                    Set to Completed & Pay total
                  </DropdownMenuItem>
                )}

              {Math.floor(
                row.original.stakedDuration -
                  (new Date() - row.original.dateStaked) /
                    (30 * 24 * 60 * 60 * 1000)
              ) >= 0 &&
                !isPaid &&
                row.original.status.toLowerCase() === "ongoing" && (
                  <DropdownMenuItem
                    className="bg-re-50 fot-bold  py-2"
                    onClick={() => {
                      const proceed = confirm(
                        "Proceed with this action? or cancel"
                      );
                      if (proceed)
                        updateTransactionStatus(
                          payment.id,
                          "Ongoing",
                          parseFloat(payment.monthlyReturns),
                          payment.stakedAsset
                        );
                    }}
                  >
                    Pay monthly returns
                  </DropdownMenuItem>
                )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  const updateTransactionStatus = async (stakeId, newStatus, amount, asset) => {
    try {
      // Make a POST request to your backend API to update the transaction status
      const response = await fetch(`/db/adminStake/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          stakeId,
          newStatus,
          amount,
          asset,
          name,
        }),
      });

      if (response.ok) {
        // Transaction status updated successfully on the backend, update the frontend
        const updatedData = data.map((stake) => {
          if (stake.id === stakeId) {
            // Update the transaction status
            toast.success("Changes Applied & email sent");

            return { ...stake, status: newStatus };
          }
          return stake;
        });

        // Update the state with the new data
        setLastPaid(Date.now());
        setData(updatedData);
      } else {
        // Handle error cases when the backend update fails
        console.error("Failed to update transaction status on the backend");
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
          placeholder="Search by Asset..."
          value={table.getColumn("stakedAsset")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("stakedAsset")?.setFilterValue(event.target.value)
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
