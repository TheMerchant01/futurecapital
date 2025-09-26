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
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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

export default function DPTable({ data, setData, email, name }) {
  const router = useRouter();

  async function deleteDepositHistory(email, id) {
    try {
      // Send a DELETE request to your API with the email in the request body
      const payload = {
        depositId: id,
        email: email,
      };
  
      const response = await axios.delete(`/db/deleteDepositHistory/api`, {
        headers: {
          "Content-Type": "application/json",
        },
        data: payload,
      });
  
      // User deleted successfully, perform actions here
      toast.success("Information deleted successfully");
      router.replace("/admin");
    } catch (error) {
      console.error("Error while deleting user:", error);
      return false;
    }
  }

  const columns = [
    // {
    //   id: "select",
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={table.getIsAllPageRowsSelected()}
    //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //       aria-label="Select all"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => row.toggleSelected(!!value)}
    //       aria-label="Select row"
    //     />
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    {
      accessorKey: "transactionStatus",
      header: "Transaction Status",
      cell: ({ row }) => (
        <div className="px-4 capitalize">
          {row.getValue("transactionStatus")}
        </div>
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
      accessorKey: "depositMethod",
      header: "Deposit Method",
      cell: ({ row }) => <div>{row.getValue("depositMethod")}</div>,
    },
    {
      accessorKey: "dateAdded",
      header: "Date",
      cell: ({ row }) => <div>{row.getValue("dateAdded")}</div>,
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
            <DropdownMenuContent align="end" className="">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              {/* <DropdownMenuSeparator />
              <Link
                href={`/admin/edit-depositHistory/${payment._id}/${payment.amount}/${payment.dateAdded}/${payment.email}`}
                passHref
                className="cursor-pointer"
              >
                <DropdownMenuItem className="py-3">Edit</DropdownMenuItem>
              </Link> */}

              <DropdownMenuItem
                className="bg-re-50 cursor-pointer py-2"
                onClick={() => deleteDepositHistory(email, payment._id)}
              >
                Delete
              </DropdownMenuItem>

              {/* <DropdownMenuItem
                className="bg-re-50 cursor-pointer py-2"
                onClick={() => handleSendMail(payment.amount)}
              >
                Send Confirmed email
              </DropdownMenuItem> */}
              <DropdownMenuSeparator />
              {payment.transactionStatus.toLowerCase() === "pending" && (
                <DropdownMenuItem
                  className="bg-re-50 text-green-800  cursor-pointer  py-2"
                  onClick={() => {
                    const confirmUpdateStatus = confirm(
                      "Proceed with updating the transaction status and sending approval email?"
                    );
                    if (confirmUpdateStatus) {
                      handleSendMail(payment.amount);
                      updateTransactionStatus(
                        payment.id,
                        "success",
                        payment.amount
                      );
                    }
                  }}
                >
                  Approve Transaction
                </DropdownMenuItem>
              )}
              {payment.transactionStatus.toLowerCase() === "pending" && (
                <DropdownMenuItem
                  className="bg-re-50 fot-bold hover:text-red-600 cursor-pointer text-red-700 py-2"
                  onClick={() =>
                    updateTransactionStatus(
                      payment.id,
                      "failed",
                      payment.amount
                    )
                  }
                >
                  Reject Transaction
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const handleSendMail = async (amount) => {
    try {
      // Send a POST request to the /db/sendEmail/api endpoint with the email and amount data
      const response = await axios.post("/db/sendEmail/api", {
        email,
        amount,
        name,
        type: "Deposit Approval",
      });

      // Check if the response status is OK (200)
      if (response.status === 200) {
        // Email sent successfully, you can handle the response data if needed
        console.log("Email sent successfully");
      } else {
        // Handle other status codes or errors here
        console.error("Failed to send email");
      }
    } catch (error) {
      // Handle network errors or exceptions here
      console.error("Error while sending email:", error);
    }
  };

  const updateTransactionStatus = async (transactionId, newStatus, amount) => {
    try {
      // Make a POST request to your backend API to update the transaction status
      const response = await fetch(`/db/history/updateDeposit/api`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          transactionId,
          newStatus,
          amount,
          name,
        }),
      });

      if (response.ok) {
        // Transaction status updated successfully on the backend, update the frontend
        const updatedData = data.map((transaction) => {
          if (transaction.id === transactionId) {
            // Update the transaction status
            toast.success("Changes Applied");
            return { ...transaction, transactionStatus: newStatus };
          }
          return transaction;
        });

        // Update the state with the new data
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
          placeholder="Search by dates..."
          value={table.getColumn("dateAdded")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("dateAdded")?.setFilterValue(event.target.value)
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
