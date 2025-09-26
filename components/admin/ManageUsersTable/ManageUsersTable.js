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
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  Users,
  Eye,
  Trash2,
  Edit,
  Plus,
  Mail,
} from "lucide-react";

import { Button } from "../../ui/button";
import { Checkbox } from "../../ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Input } from "../../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { useState, useEffect } from "react";
import { ScrollArea } from "../../ui/scroll-area";
import Link from "next/link";
import toast from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";

async function deleteUser(email) {
  try {
    const response = await fetch(`/db/deleteUser/api/${email}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log("deleted");
      return true;
    } else {
      console.error("User deletion failed");
      return false;
    }
  } catch (error) {
    console.error("Error while deleting user:", error);
    return false;
  }
}

export default function ManageUsersTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/db/getUser/api", {
        cache: "no-store",
      });
      if (response.ok) {
        const result = await response.json();
        if (result.users && result.users.length > 0) {
          const formattedData = result.users.map((user) => ({
            name: user.name,
            email: user.email,
            phone: user.phone,
            country: user.country || "N/A",
            password: user.password,
            withdrawalPin: user.withdrawalPin,
            taxCodePin: user.taxCodePin,
            tradeBalance: user.tradingBalance,
            depositHistory: user.depositHistory,
            withdrawalHistory: user.withdrawalHistory,
            trades: user.trades,
            stakings: user.stakings,
            kycStatus: user.kycStatus || "pending",
            totalDeposits:
              user.depositHistory && Array.isArray(user.depositHistory)
                ? user.depositHistory.reduce(
                    (sum, deposit) => sum + (parseFloat(deposit.amount) || 0),
                    0
                  )
                : 0,
            totalWithdrawals:
              user.withdrawalHistory && Array.isArray(user.withdrawalHistory)
                ? user.withdrawalHistory.reduce(
                    (sum, withdrawal) =>
                      sum + (parseFloat(withdrawal.amount) || 0),
                    0
                  )
                : 0,
          }));
          setData(formattedData);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
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
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 px-2 text-xs sm:text-sm"
          >
            <span className="hidden sm:inline">Name</span>
            <span className="sm:hidden">Name</span>
            <ArrowUpDown className="ml-1 h-3 w-3 sm:ml-2 sm:h-4 sm:w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="font-medium text-xs sm:text-sm truncate max-w-[100px] sm:max-w-none">
          {row.getValue("name")}
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 px-2 text-xs sm:text-sm"
          >
            <span className="hidden sm:inline">Email</span>
            <span className="sm:hidden">Email</span>
            <ArrowUpDown className="ml-1 h-3 w-3 sm:ml-2 sm:h-4 sm:w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase text-xs sm:text-sm truncate max-w-[120px] sm:max-w-none">
          {row.getValue("email")}
        </div>
      ),
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => (
        <div className="text-xs sm:text-sm">
          {row.getValue("phone") || "N/A"}
        </div>
      ),
    },
    {
      accessorKey: "country",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 px-2 text-xs sm:text-sm"
          >
            <span className="hidden sm:inline">Country</span>
            <span className="sm:hidden">Country</span>
            <ArrowUpDown className="ml-1 h-3 w-3 sm:ml-2 sm:h-4 sm:w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-xs sm:text-sm">{row.getValue("country")}</div>
      ),
    },
    {
      accessorKey: "kycStatus",
      header: "KYC Status",
      cell: ({ row }) => {
        const status = row.getValue("kycStatus");
        return (
          <Badge
            className={
              status === "approved"
                ? "bg-green-100 text-green-800"
                : status === "declined"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
            }
          >
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "totalDeposits",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 px-2 text-xs sm:text-sm"
          >
            <span className="hidden sm:inline">Total Deposits</span>
            <span className="sm:hidden">Deposits</span>
            <ArrowUpDown className="ml-1 h-3 w-3 sm:ml-2 sm:h-4 sm:w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("totalDeposits"));
        return (
          <div className="font-medium text-green-600 text-xs sm:text-sm">
            ${amount.toLocaleString()}
          </div>
        );
      },
    },
    {
      accessorKey: "totalWithdrawals",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 px-2 text-xs sm:text-sm"
          >
            <span className="hidden sm:inline">Total Withdrawals</span>
            <span className="sm:hidden">Withdrawals</span>
            <ArrowUpDown className="ml-1 h-3 w-3 sm:ml-2 sm:h-4 sm:w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("totalWithdrawals"));
        return (
          <div className="font-medium text-red-600 text-xs sm:text-sm">
            ${amount.toLocaleString()}
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const user = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(user.email)}
              >
                Copy email
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <Link href={`/admin/${user.email}`} passHref>
                <DropdownMenuItem className="py-3">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit User Details
                </DropdownMenuItem>
              </Link>
              <Link href={`/admin/add-depositHistory/${user.email}`} passHref>
                <DropdownMenuItem className="py-3">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Deposit History
                </DropdownMenuItem>
              </Link>
              <Link href={`/admin/add-latestTradess/${user.email}`} passHref>
                <DropdownMenuItem className="py-3">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Latest Trades
                </DropdownMenuItem>
              </Link>
              <Link href={`/admin/custom-emails/${user.email}`} passHref>
                <DropdownMenuItem className="py-3">
                  <Mail className="w-4 h-4 mr-2" />
                  Send An Email
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <Link href={`/admin/history/deposit/${user.email}`} passHref>
                <DropdownMenuItem className="py-3">
                  <Eye className="w-4 h-4 mr-2" />
                  View Deposits
                </DropdownMenuItem>
              </Link>
              <Link href={`/admin/history/withdrawal/${user.email}`} passHref>
                <DropdownMenuItem className="py-3">
                  <Eye className="w-4 h-4 mr-2" />
                  View Withdrawals
                </DropdownMenuItem>
              </Link>
              <Link href={`/admin/trades/${user.email}`} passHref>
                <DropdownMenuItem className="py-3">
                  <Eye className="w-4 h-4 mr-2" />
                  View Trades
                </DropdownMenuItem>
              </Link>
              <Link href={`/admin/stakings/${user.email}`} passHref>
                <DropdownMenuItem className="py-3">
                  <Eye className="w-4 h-4 mr-2" />
                  View Stakes
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleDelete(user.email)}
                className="bg-red-50 font-bold hover:text-red-600 text-red-700 py-3"
              >
                <Trash2 className="w-4 h-4 mr-2" />
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
    withdrawalPin: false,
    taxCodePin: false,
    password: false,
  });
  const [rowSelection, setRowSelection] = React.useState({});

  const handleDelete = async (email) => {
    const userDeleted = await deleteUser(email);

    if (userDeleted) {
      const updatedData = data.filter((user) => user.email !== email);
      setData(updatedData);
      toast.success("User deleted successfully");
    } else {
      toast.error("Failed to delete user");
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

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Users Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <Users className="w-5 h-5" />
          Users Management ({data.length} users)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center py-4 gap-4">
            <Input
              placeholder="Filter by name or email..."
              value={
                (table.getColumn("name")?.getFilterValue() ?? "") ||
                (table.getColumn("email")?.getFilterValue() ?? "")
              }
              onChange={(event) => {
                const value = event.target.value;
                table.getColumn("name")?.setFilterValue(value);
                table.getColumn("email")?.setFilterValue(value);
              }}
              className="w-full sm:max-w-sm"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto sm:ml-auto"
                >
                  Columns <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
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
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* Desktop Table View */}
          <div className="hidden sm:block rounded-md border overflow-x-auto">
            <Table className="min-w-[800px]">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead
                          key={header.id}
                          className="px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium"
                        >
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
                        <TableCell
                          key={cell.id}
                          className="px-2 sm:px-4 py-2 text-xs sm:text-sm"
                        >
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

          {/* Mobile Card View */}
          <div className="sm:hidden space-y-3">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                const user = row.original;
                return (
                  <div
                    key={row.id}
                    className="bg-white border border-gray-200 rounded-lg p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={row.getIsSelected()}
                          onChange={(e) => row.toggleSelected(e.target.checked)}
                          className="rounded"
                        />
                        <h3 className="font-medium text-gray-900">
                          {user.name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={
                            user.kycStatus === "approved"
                              ? "bg-green-100 text-green-800"
                              : user.kycStatus === "declined"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {user.kycStatus}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() =>
                                navigator.clipboard.writeText(user.email)
                              }
                            >
                              Copy email
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <Link href={`/admin/${user.email}`} passHref>
                              <DropdownMenuItem className="py-3">
                                <Edit className="w-4 h-4 mr-2" />
                                Edit User Details
                              </DropdownMenuItem>
                            </Link>
                            <Link
                              href={`/admin/add-depositHistory/${user.email}`}
                              passHref
                            >
                              <DropdownMenuItem className="py-3">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Deposit History
                              </DropdownMenuItem>
                            </Link>
                            <Link
                              href={`/admin/add-latestTradess/${user.email}`}
                              passHref
                            >
                              <DropdownMenuItem className="py-3">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Latest Trades
                              </DropdownMenuItem>
                            </Link>
                            <Link
                              href={`/admin/custom-emails/${user.email}`}
                              passHref
                            >
                              <DropdownMenuItem className="py-3">
                                <Mail className="w-4 h-4 mr-2" />
                                Send An Email
                              </DropdownMenuItem>
                            </Link>
                            <DropdownMenuSeparator />
                            <Link
                              href={`/admin/history/deposit/${user.email}`}
                              passHref
                            >
                              <DropdownMenuItem className="py-3">
                                <Eye className="w-4 h-4 mr-2" />
                                View Deposits
                              </DropdownMenuItem>
                            </Link>
                            <Link
                              href={`/admin/history/withdrawal/${user.email}`}
                              passHref
                            >
                              <DropdownMenuItem className="py-3">
                                <Eye className="w-4 h-4 mr-2" />
                                View Withdrawals
                              </DropdownMenuItem>
                            </Link>
                            <Link href={`/admin/trades/${user.email}`} passHref>
                              <DropdownMenuItem className="py-3">
                                <Eye className="w-4 h-4 mr-2" />
                                View Trades
                              </DropdownMenuItem>
                            </Link>
                            <Link
                              href={`/admin/stakings/${user.email}`}
                              passHref
                            >
                              <DropdownMenuItem className="py-3">
                                <Eye className="w-4 h-4 mr-2" />
                                View Stakes
                              </DropdownMenuItem>
                            </Link>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDelete(user.email)}
                              className="bg-red-50 font-bold hover:text-red-600 text-red-700 py-3"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-500">Email</p>
                        <p className="font-medium truncate">{user.email}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Phone</p>
                        <p className="font-medium">{user.phone || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Country</p>
                        <p className="font-medium">{user.country}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Deposits</p>
                        <p className="font-medium text-green-600">
                          ${user.totalDeposits?.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Withdrawals</p>
                        <p className="font-medium text-red-600">
                          ${user.totalWithdrawals?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-gray-500">No results.</div>
            )}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="text-xs sm:text-sm"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="text-xs sm:text-sm"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
