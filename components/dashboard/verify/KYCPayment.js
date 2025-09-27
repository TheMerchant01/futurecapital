"use client";
import React, { useState, useEffect } from "react";
import { useUserData } from "../../../contexts/userrContext";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { CheckCircle, CreditCard, AlertCircle, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import Image from "next/image";

export default function KYCPayment() {
  const { email, details, address, fetchDetails } = useUserData();
  const [kycFee, setKycFee] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userKycStatus, setUserKycStatus] = useState("pending");
  const [kycFeePaid, setKycFeePaid] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("");
  const router = useRouter();

  // Payment methods data (same as deposit page)
  const deposits = [
    {
      coinName: "Bitcoin",
      short: "Bitcoin",
      image: "/assets/bitcoin.webp",
      address: address && address.Bitcoin,
    },
    {
      coinName: "Ethereum",
      short: "Ethereum",
      image: "/assets/ethereum.webp",
      address: address && address.Ethereum,
    },
    {
      coinName: "Tether USDT",
      short: "Tether",
      image: "/assets/Tether.webp",
      address: address && address.Tether,
    },
  ];

  const othermeans = [
    {
      coinName: "Binance",
      short: "binance",
      image: "/assets/bnb.webp",
      address: address && address.Binance,
    },
    {
      coinName: "Dogecoin",
      short: "Dogecoin",
      image: "/assets/dogecoin.webp",
      address: address && address.Dogecoin,
    },
    {
      coinName: "Tron",
      short: "Tron",
      image: "/assets/tron-logo.webp",
      address: address && address.Tron,
    },
  ];

  const fetchKycInfo = async () => {
    try {
      const response = await axios.get("/db/getUser/api");
      const users = response.data.users || [];
      const currentUser = users.find((user) => user.email === email);

      if (currentUser) {
        setKycFee(currentUser.kycFee || 0);
        setUserKycStatus(currentUser.kycStatus || "pending");
        setKycFeePaid(currentUser.kycFeePaid || false);
      }

      // Also refresh the user context to update verification status
      if (fetchDetails) {
        fetchDetails();
      }
    } catch (error) {
      console.error("Error fetching KYC info:", error);
    }
  };

  useEffect(() => {
    fetchKycInfo();
  }, [fetchKycInfo]);

  const handlePayment = async () => {
    if (!kycFee || kycFee <= 0) {
      toast.error("KYC fee not set. Please contact support.");
      return;
    }

    if (!selectedMethod) {
      toast.error("Please select a payment method.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/db/kycPayment/api", {
        email: email,
        amount: kycFee,
        paymentMethod: selectedMethod,
      });

      if (response.status === 200) {
        toast.success("KYC payment request submitted successfully!");
        setKycFeePaid(true);
        // Redirect to dashboard after successful payment
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      }
    } catch (error) {
      console.error("Error processing KYC payment:", error);
      toast.error("Failed to process payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case "declined":
        return <Badge className="bg-red-100 text-red-800">Declined</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  if (userKycStatus === "approved") {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-6 h-6" />
              KYC Verification Approved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Congratulations! Your KYC verification has been approved. You can
              now access all platform features.
            </p>
            <Button
              onClick={() => router.push("/dashboard")}
              className="w-full"
            >
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (userKycStatus === "declined") {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle className="w-6 h-6" />
              KYC Verification Declined
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Your KYC verification has been declined. Please contact support
              for more information.
            </p>
            <Button
              onClick={() => router.push("/dashboard/verify")}
              className="w-full"
            >
              Re-submit Verification
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (kycFeePaid) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-600">
              <CreditCard className="w-6 h-6" />
              KYC Payment Submitted
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Your KYC payment has been submitted and is being processed. You
              will be notified once your verification is complete.
            </p>
            <div className="flex gap-2">
              <Button
                onClick={() => router.push("/dashboard")}
                variant="outline"
                className="flex-1"
              >
                Go to Dashboard
              </Button>
              <Button onClick={fetchKycInfo} className="flex-1">
                Check Status
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-6 h-6" />
            KYC Verification Payment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">
              Payment Required
            </h3>
            <p className="text-blue-800 text-sm">
              To complete your KYC verification, you need to pay the
              verification fee. This fee covers the cost of processing your
              identity verification documents.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">KYC Verification Fee:</span>
              <span className="font-bold text-lg">${kycFee}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Status:</span>
              {getStatusBadge(userKycStatus)}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Choose Payment Method:</h4>

            <Select onValueChange={setSelectedMethod}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Recommended</SelectLabel>
                  {deposits.map((option) => (
                    <SelectItem key={option.short} value={option.short}>
                      <div className="flex items-center gap-2">
                        <Image
                          src={option.image}
                          alt={option.coinName}
                          width={20}
                          height={20}
                        />
                        <span className="font-medium">{option.coinName}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Other Assets</SelectLabel>
                  {othermeans.map((option) => (
                    <SelectItem key={option.short} value={option.short}>
                      <div className="flex items-center gap-2">
                        <Image
                          src={option.image}
                          alt={option.coinName}
                          width={20}
                          height={20}
                        />
                        <span className="font-medium">{option.coinName}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Button
              onClick={handlePayment}
              disabled={loading || !selectedMethod}
              className="w-full h-12 flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <CreditCard className="w-4 h-4" />
              )}
              {selectedMethod
                ? `Pay with ${selectedMethod}`
                : "Select Payment Method"}
            </Button>
          </div>

          <div className="text-xs text-gray-500 text-center">
            <p>
              Payment will be processed securely. You will receive confirmation
              once payment is verified.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
