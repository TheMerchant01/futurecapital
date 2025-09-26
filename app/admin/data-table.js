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

import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Input } from "../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { useState } from "react";
import { ScrollArea } from "../../components/ui/scroll-area";
import Link from "next/link";
import toast from "react-hot-toast";

async function deleteUser(email) {
  try {
    // Send a DELETE request to your API with the email in the request body
    const response = await fetch(`/db/deleteUser/api/${email}`, {
      method: "DELETE",
    });

    if (response.ok) {
      // User deleted successfully, perform actions here
      console.log("deleted");
      return true;
    } else {
      // Handle error cases
      console.error("User deletion failed");
      return false;
    }
  } catch (error) {
    console.error("Error while deleting user:", error);
    return false;
  }
}

export function DataTableDemo({ data, setData }) {
  const columns = [
    {
      accessorKey: "notifiers",
      header: "Notifs",
      cell: ({ row }) => (
        <div className="px-4">
          <div className="grid grid-cols-4 gap-2">
            {row.original.depositHistory.some(
              (entry) => entry.transactionStatus.toLowerCase() === "pending"
            ) && <div className="h-2 w-2 rounded-full bg-green-500"></div>}
            {row.original.withdrawalHistory.some(
              (entry) => entry.transactionStatus.toLowerCase() === "pending"
            ) && <div className="h-2 w-2 rounded-full bg-yellow-500"></div>}
            {row.original.trades.some(
              (entry) => entry.status.toLowerCase() === "running"
            ) && <div className="h-2 w-2 rounded-full bg-red-500"></div>}
            {row.original.stakings.some(
              (entry) => entry.status.toLowerCase() === "ongoing"
            ) && <div className="h-2 w-2 rounded-full bg-blue-500"></div>}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div className="px-4">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="font-bold"
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => <div>{row.getValue("phone")}</div>,
    },
    {
      accessorKey: "password",
      header: "Password",
      cell: ({ row }) => <div>{row.getValue("password")}</div>,
    },
    {
      accessorKey: "withdrawalPin",
      header: "Withdrawal Pin",
      cell: ({ row }) => <div>{row.getValue("withdrawalPin")}</div>,
    },
    {
      accessorKey: "taxCodePin",
      header: "Tax Code Pin",
      cell: ({ row }) => <div>{row.getValue("taxCodePin")}</div>,
    },
    {
      accessorKey: "tradeBalance",
      header: () => <div className="text-right">Trading Balance</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("tradeBalance"));

        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);

        return <div className="text-right font-medium">{formatted}</div>;
      },
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
            <DropdownMenuContent align="end" className="py-1">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="py-2"
                onClick={() => {
                  navigator.clipboard.writeText(payment.taxCodePin);
                  toast.success("code copied");
                }}
              >
                Copy Tax Code Pin
              </DropdownMenuItem>
              <DropdownMenuItem
                className="py-3"
                onClick={() => {
                  navigator.clipboard.writeText(payment.withdrawalPin);
                  toast.success("code copied");
                }}
              >
                Copy Withdrawal Pin
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <Link href={`/admin/${payment.email}`} passHref>
                <DropdownMenuItem className="py-3">
                  Edit User Details
                </DropdownMenuItem>
              </Link>
              <Link href={`/admin/history/deposit/${payment.email}`} passHref>
                <DropdownMenuItem className="py-3">
                  View Deposit History
                </DropdownMenuItem>
              </Link>
              <Link href={`/admin/investmentplans/${payment.email}`} passHref>
                <DropdownMenuItem className="py-3">
                  View Investment Plans
                </DropdownMenuItem>
              </Link>
              <Link
                href={`/admin/add-depositHistory/${payment.email}`}
                passHref
                className="cursor-pointer"
              >
                <DropdownMenuItem className="py-3">
                  Add Deposit History
                </DropdownMenuItem>
              </Link>
              <Link
                href={`/admin/add-latestTradess/${payment.email}`}
                passHref
                className="cursor-pointer"
              >
                <DropdownMenuItem className="py-3">
                  Add Latest Trades
                </DropdownMenuItem>
              </Link>

              <Link
                href={`/admin/custom-emails/${payment.email}`}
                passHref
                className="cursor-pointer"
              >
                <DropdownMenuItem className="py-3">
                  Send An Email
                </DropdownMenuItem>
              </Link>

              <Link
                href={`/admin/history/withdrawal/${payment.email}`}
                passHref
              >
                {" "}
                <DropdownMenuItem className="py-3">
                  View Withdrawal History
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <Link href={`/admin/trades/${payment.email}`} passHref>
                {" "}
                <DropdownMenuItem className="py-3">
                  View Trades
                </DropdownMenuItem>
              </Link>
              <Link href={`/admin/stakings/${payment.email}`} passHref>
                {" "}
                <DropdownMenuItem className="py-3">
                  View Stakes
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleDelete(payment.email)}
                className="bg-re-50 font-bold hover:text-red-600 text-red-700 py-3"
              >
                Delete User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({
    email: true,
    phone: true,
    withdrawalPin: true,
    taxCodePin: true,
    password: true,
  });
  const [rowSelection, setRowSelection] = React.useState({});
  const handleDelete = async (email) => {
    const userDeleted = await deleteUser(email);

    if (userDeleted) {
      // Remove the deleted user from the table
      // You might need to identify the row by email and update the state accordingly
      // table.toggleRowSelected(email);
      const updatedData = data.filter((user) => user.email !== email);
      setData(updatedData);
      toast.success("Deleted successfully");
    }
  };
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
          placeholder="Search emails..."
          value={table.getColumn("email")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
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
            <ScrollArea className="h-[200px]">
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
