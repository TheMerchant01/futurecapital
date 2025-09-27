"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import {
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  UserCheck,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import axios from "axios";

export default function AdminOverview() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDeposits: 0,
    totalWithdrawals: 0,
    pendingKYC: 0,
    pendingFees: 0,
    todayTransactions: 0,
  });
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch user stats
      const usersResponse = await axios.get("/db/getUser/api");
      const users = usersResponse.data.users || [];

      // Calculate stats
      const totalUsers = users.length;
      const totalDeposits = users.reduce(
        (sum, user) =>
          sum +
          (user.depositHistory && Array.isArray(user.depositHistory)
            ? user.depositHistory.reduce(
                (userSum, deposit) =>
                  userSum + (parseFloat(deposit.amount) || 0),
                0
              )
            : 0),
        0
      );
      const totalWithdrawals = users.reduce(
        (sum, user) =>
          sum +
          (user.withdrawalHistory && Array.isArray(user.withdrawalHistory)
            ? user.withdrawalHistory.reduce(
                (userSum, withdrawal) =>
                  userSum + (parseFloat(withdrawal.amount) || 0),
                0
              )
            : 0),
        0
      );
      const pendingKYC = users.filter(
        (user) => user.kycStatus === "pending"
      ).length;
      const pendingFees = users.reduce(
        (sum, user) =>
          sum +
          (user.withdrawalFeeHistory?.filter((fee) => fee.status === "pending")
            .length || 0),
        0
      );

      setStats({
        totalUsers,
        totalDeposits,
        totalWithdrawals,
        pendingKYC,
        pendingFees,
        todayTransactions: 0, // Will be calculated from recent transactions
      });

      // Get recent transactions (last 10)
      const recentDeposits = users.flatMap((user) =>
        (user.depositHistory && Array.isArray(user.depositHistory)
          ? user.depositHistory.slice(-3)
          : []
        ).map((deposit) => ({
          ...deposit,
          userEmail: user.email,
          userName: user.name,
          type: "deposit",
        }))
      );

      const recentWithdrawals = users.flatMap((user) =>
        (user.withdrawalHistory && Array.isArray(user.withdrawalHistory)
          ? user.withdrawalHistory.slice(-3)
          : []
        ).map((withdrawal) => ({
          ...withdrawal,
          userEmail: user.email,
          userName: user.name,
          type: "withdrawal",
        }))
      );

      const allTransactions = [...recentDeposits, ...recentWithdrawals]
        .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
        .slice(0, 10);

      setRecentTransactions(allTransactions);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTransactionIcon = (type) => {
    return type === "deposit" ? (
      <TrendingUp className="w-4 h-4 text-green-600" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-600" />
    );
  };

  const getTransactionBadge = (status) => {
    switch (status) {
      case "success":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Success
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "failure":
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Failed
          </Badge>
        );
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Welcome back! Here&apos;s what&apos;s happening with your platform.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalUsers}
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Deposits
                </p>
                <p className="text-2xl font-bold text-green-600">
                  ${stats.totalDeposits.toLocaleString()}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Withdrawals
                </p>
                <p className="text-2xl font-bold text-red-600">
                  ${stats.totalWithdrawals.toLocaleString()}
                </p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending KYC</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {stats.pendingKYC}
                </p>
              </div>
              <UserCheck className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Pending Fees
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  {stats.pendingFees}
                </p>
              </div>
              <CreditCard className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Today&apos;s Transactions
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {stats.todayTransactions}
                </p>
              </div>
              <Activity className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        <Link href="/admin/manage-users">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Manage Users</h3>
                  <p className="text-sm text-gray-600">
                    View and manage all users
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/verification">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <UserCheck className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Verification</h3>
                  <p className="text-sm text-gray-600">
                    KYC and fee management
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/edit-address">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <CreditCard className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Edit Address</h3>
                  <p className="text-sm text-gray-600">
                    Manage crypto addresses
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Activity className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Analytics</h3>
                <p className="text-sm text-gray-600">View detailed reports</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Activity className="w-5 h-5" />
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-3 sm:space-y-4">
            {recentTransactions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No recent transactions found
              </div>
            ) : (
              recentTransactions.map((transaction, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border border-gray-200 rounded-lg gap-2 sm:gap-0"
                >
                  <div className="flex items-center gap-4">
                    {getTransactionIcon(transaction.type)}
                    <div>
                      <p className="font-medium text-gray-900">
                        {transaction.userName} -{" "}
                        {transaction.type === "deposit"
                          ? "Deposit"
                          : "Withdrawal"}
                      </p>
                      <p className="text-sm text-gray-600">
                        {transaction.userEmail}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      ${transaction.amount}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      {getTransactionBadge(transaction.transactionStatus)}
                      <span className="text-sm text-gray-500">
                        {transaction.dateAdded}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="mt-6 text-center">
            <Button variant="outline" asChild>
              <Link href="/admin/manage-users">View All Transactions</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
