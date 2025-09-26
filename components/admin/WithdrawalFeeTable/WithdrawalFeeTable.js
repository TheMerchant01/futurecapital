"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { CheckCircle, XCircle, Clock, Eye } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

export default function WithdrawalFeeTable() {
  const [feePayments, setFeePayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeePayments();
  }, []);

  const fetchFeePayments = async () => {
    try {
      const response = await axios.get("/db/getWithdrawalFees/api");
      if (response.status === 200) {
        setFeePayments(response.data.feePayments);
      }
    } catch (error) {
      console.error("Error fetching withdrawal fees:", error);
      toast.error("Failed to fetch withdrawal fees");
    } finally {
      setLoading(false);
    }
  };

  const handleApproveFee = async (email, feePaymentId, withdrawalId) => {
    try {
      const response = await axios.post("/db/approveWithdrawalFee/api", {
        email,
        feePaymentId,
        status: "approved",
        withdrawalId,
      });

      if (response.status === 200) {
        toast.success("Withdrawal fee approved successfully");
        fetchFeePayments();
      }
    } catch (error) {
      console.error("Error approving fee:", error);
      toast.error("Failed to approve withdrawal fee");
    }
  };

  const handleDeclineFee = async (email, feePaymentId) => {
    try {
      const response = await axios.post("/db/approveWithdrawalFee/api", {
        email,
        feePaymentId,
        status: "declined",
      });

      if (response.status === 200) {
        toast.success("Withdrawal fee declined");
        fetchFeePayments();
      }
    } catch (error) {
      console.error("Error declining fee:", error);
      toast.error("Failed to decline withdrawal fee");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        );
      case "declined":
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Declined
          </Badge>
        );
      default:
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Withdrawal Fee Payments</CardTitle>
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
          <Eye className="w-5 h-5" />
          Withdrawal Fee Payments
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Withdrawal ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feePayments.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-8 text-gray-500"
                  >
                    No withdrawal fee payments found
                  </TableCell>
                </TableRow>
              ) : (
                feePayments.map((payment) => (
                  <TableRow key={payment._id}>
                    <TableCell className="font-medium">
                      {payment.userName}
                    </TableCell>
                    <TableCell>{payment.email}</TableCell>
                    <TableCell className="font-semibold text-green-600">
                      ${payment.amount}
                    </TableCell>
                    <TableCell>{payment.paymentMethod}</TableCell>
                    <TableCell className="font-mono text-sm">
                      {payment.withdrawalId}
                    </TableCell>
                    <TableCell>{payment.dateAdded}</TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                    <TableCell>
                      {payment.status === "pending" && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() =>
                              handleApproveFee(
                                payment.email,
                                payment.id,
                                payment.withdrawalId
                              )
                            }
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() =>
                              handleDeclineFee(payment.email, payment.id)
                            }
                          >
                            <XCircle className="w-3 h-3 mr-1" />
                            Decline
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
