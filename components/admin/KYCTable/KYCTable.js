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
import { CheckCircle, XCircle, Clock, UserCheck } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

export default function KYCTable() {
  const [kycRequests, setKycRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchKYCRequests();
  }, []);

  const fetchKYCRequests = async () => {
    try {
      const response = await axios.get("/db/getUser/api");
      if (response.status === 200) {
        // Filter users who have KYC requests (pending, approved, or declined)
        const kycUsers = response.data.users.filter(
          (user) => user.kycStatus && user.kycStatus !== "not_submitted"
        );
        setKycRequests(kycUsers);
      }
    } catch (error) {
      console.error("Error fetching KYC requests:", error);
      toast.error("Failed to fetch KYC requests");
    } finally {
      setLoading(false);
    }
  };

  const handleApproveKYC = async (email) => {
    try {
      const response = await axios.post("/db/approveKYC/api", {
        email,
        status: "approved",
      });

      if (response.status === 200) {
        toast.success("KYC verification approved successfully");
        fetchKYCRequests();
      }
    } catch (error) {
      console.error("Error approving KYC:", error);
      toast.error("Failed to approve KYC verification");
    }
  };

  const handleDeclineKYC = async (email, reason) => {
    const declineReason =
      reason ||
      prompt("Please provide a reason for declining KYC verification:");

    if (!declineReason) {
      toast.error("Please provide a reason for declining");
      return;
    }

    try {
      const response = await axios.post("/db/approveKYC/api", {
        email,
        status: "declined",
        reason: declineReason,
      });

      if (response.status === 200) {
        toast.success("KYC verification declined");
        fetchKYCRequests();
      }
    } catch (error) {
      console.error("Error declining KYC:", error);
      toast.error("Failed to decline KYC verification");
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
          <CardTitle>KYC Verification Requests</CardTitle>
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
          <UserCheck className="w-5 h-5" />
          KYC Verification Requests
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>KYC Fee</TableHead>
                <TableHead>Fee Paid</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kycRequests.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-8 text-gray-500"
                  >
                    No KYC verification requests found
                  </TableCell>
                </TableRow>
              ) : (
                kycRequests.map((request) => (
                  <TableRow key={request._id}>
                    <TableCell className="font-medium">
                      {request.name}
                    </TableCell>
                    <TableCell>{request.email}</TableCell>
                    <TableCell>{request.phone}</TableCell>
                    <TableCell>{request.country}</TableCell>
                    <TableCell className="font-semibold text-blue-600">
                      ${request.kycFee}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          request.kycFeePaid
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }
                      >
                        {request.kycFeePaid ? "Paid" : "Unpaid"}
                      </Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(request.kycStatus)}</TableCell>
                    <TableCell>
                      {request.kycStatus === "pending" &&
                        request.kycFeePaid && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleApproveKYC(request.email)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeclineKYC(request.email)}
                            >
                              <XCircle className="w-3 h-3 mr-1" />
                              Decline
                            </Button>
                          </div>
                        )}
                      {request.kycStatus === "pending" &&
                        !request.kycFeePaid && (
                          <Badge className="bg-yellow-100 text-yellow-800">
                            Fee Required
                          </Badge>
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
