"use client";
import React, { useState, useEffect } from "react";
import { useUserData } from "../../../contexts/userrContext";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { CheckCircle, CreditCard, AlertCircle, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import Image from "next/image";

export default function WithdrawalFeePayment() {
  const { email, details, address, fetchDetails } = useUserData();
  const [withdrawalData, setWithdrawalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [feePaid, setFeePaid] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const withdrawalId = searchParams.get("id");

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

  const fetchWithdrawalData = async () => {
    try {
      const response = await axios.get("/db/getUser/api");
      const users = response.data.users || [];
      const currentUser = users.find((user) => user.email === email);

      if (currentUser && currentUser.withdrawalHistory) {
        const withdrawal = currentUser.withdrawalHistory.find(
          (w) => w.id === withdrawalId
        );

        if (withdrawal) {
          setWithdrawalData(withdrawal);
          setFeePaid(withdrawal.feePaid || false);
        } else {
          toast.error("Withdrawal request not found");
          router.push("/dashboard");
        }
      }

      // Also refresh the user context
      if (fetchDetails) {
        fetchDetails();
      }
    } catch (error) {
      console.error("Error fetching withdrawal data:", error);
      toast.error("Failed to fetch withdrawal data");
    }
  };

  useEffect(() => {
    if (withdrawalId) {
      fetchWithdrawalData();
    } else {
      // If no withdrawal ID, redirect to dashboard
      router.push("/dashboard");
    }
  }, [withdrawalId, fetchWithdrawalData, router]);

  const handlePayment = async () => {
    if (
      !withdrawalData ||
      !withdrawalData.withdrawalFee ||
      withdrawalData.withdrawalFee <= 0
    ) {
      toast.error("Withdrawal fee not found. Please contact support.");
      return;
    }

    if (!selectedMethod) {
      toast.error("Please select a payment method.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/db/withdrawalFee/api", {
        email: email,
        amount: withdrawalData.withdrawalFee,
        withdrawalId: withdrawalId,
        paymentMethod: selectedMethod,
      });

      if (response.status === 200) {
        toast.success("Withdrawal fee payment request submitted successfully!");
        setFeePaid(true);
        // Redirect to dashboard after successful payment
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      }
    } catch (error) {
      console.error("Error processing withdrawal fee payment:", error);
      toast.error("Failed to process payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!withdrawalData) {
    return (
      <div className="max-w-2xl mx-auto p-6 ">
        <Card className="bg-[#0a0a0a] border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (feePaid) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="bg-black border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <CreditCard className="w-6 h-6" />
              Withdrawal Fee Payment Submitted
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              Your withdrawal fee payment has been submitted and is being
              processed. You will be notified once your withdrawal is approved
              and processed.
            </p>
            <div className="flex gap-2">
              <Button
                onClick={() => router.push("/dashboard")}
                variant="outline"
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Go to Dashboard
              </Button>
              <Button
                onClick={fetchWithdrawalData}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
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
      <Card className="bg-[#0a0a0a] border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <CreditCard className="w-6 h-6" />
            Withdrawal Fee Payment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
            <h3 className="font-semibold text-blue-300 mb-2">
              Payment Required
            </h3>
            <p className="text-blue-200 text-sm">
              To process your withdrawal, you need to pay the withdrawal fee.
              This fee is 10% of your withdrawal amount and covers processing
              costs.
            </p>
          </div>

          <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-3">
              Withdrawal Details
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">
                  Withdrawal Amount:
                </span>
                <span className="font-bold text-lg text-white">
                  ${withdrawalData.amount}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">
                  Withdrawal Method:
                </span>
                <span className="font-medium text-gray-200">
                  {withdrawalData.withdrawMethod}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Account:</span>
                <span className="font-medium text-gray-200">
                  {withdrawalData.withdrawalAccount}
                </span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-600 pt-2">
                <span className="font-semibold text-white">
                  Withdrawal Fee (10%):
                </span>
                <span className="font-bold text-lg text-red-400">
                  ${withdrawalData.withdrawalFee}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-white">Choose Payment Method:</h4>

            <Select onValueChange={setSelectedMethod}>
              <SelectTrigger className="w-full bg-gray-800 border-gray-600 text-white">
                <SelectValue placeholder="Select a payment method" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectGroup>
                  <SelectLabel className="text-gray-300">
                    Recommended
                  </SelectLabel>
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
                  <SelectLabel className="text-gray-300">
                    Other Assets
                  </SelectLabel>
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

            {/* Payment Details */}
            {selectedMethod && (
              <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3">
                  Payment Details
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Image
                      src={
                        selectedMethod === "Bitcoin"
                          ? "/assets/bitcoin.webp"
                          : selectedMethod === "Ethereum"
                          ? "/assets/ethereum.webp"
                          : selectedMethod === "Tether"
                          ? "/assets/Tether.webp"
                          : selectedMethod === "binance"
                          ? "/assets/bnb.webp"
                          : selectedMethod === "Dogecoin"
                          ? "/assets/dogecoin.webp"
                          : selectedMethod === "Tron"
                          ? "/assets/tron-logo.webp"
                          : "/assets/bitcoin.webp"
                      }
                      alt={selectedMethod}
                      width={24}
                      height={24}
                    />
                    <span className="font-medium text-white">
                      {selectedMethod}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">
                        Amount to Pay:
                      </span>
                      <span className="font-bold text-lg text-white">
                        ${withdrawalData.withdrawalFee}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm text-gray-300">
                        Send to this address:
                      </label>
                      <div className="bg-gray-900 border border-gray-600 rounded-lg p-3">
                        <div className="flex items-center justify-between gap-2">
                          <code className="text-xs text-gray-300 break-all flex-1">
                            {selectedMethod === "Bitcoin" && address?.Bitcoin
                              ? address.Bitcoin
                              : selectedMethod === "Ethereum" &&
                                address?.Ethereum
                              ? address.Ethereum
                              : selectedMethod === "Tether" && address?.Tether
                              ? address.Tether
                              : selectedMethod === "binance" && address?.Binance
                              ? address.Binance
                              : selectedMethod === "Dogecoin" &&
                                address?.Dogecoin
                              ? address.Dogecoin
                              : selectedMethod === "Tron" && address?.Tron
                              ? address.Tron
                              : "Address not available"}
                          </code>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-600 text-gray-300 hover:bg-gray-700"
                            onClick={() => {
                              const addressToCopy =
                                selectedMethod === "Bitcoin" && address?.Bitcoin
                                  ? address.Bitcoin
                                  : selectedMethod === "Ethereum" &&
                                    address?.Ethereum
                                  ? address.Ethereum
                                  : selectedMethod === "Tether" &&
                                    address?.Tether
                                  ? address.Tether
                                  : selectedMethod === "binance" &&
                                    address?.Binance
                                  ? address.Binance
                                  : selectedMethod === "Dogecoin" &&
                                    address?.Dogecoin
                                  ? address.Dogecoin
                                  : selectedMethod === "Tron" && address?.Tron
                                  ? address.Tron
                                  : "";

                              if (addressToCopy) {
                                navigator.clipboard.writeText(addressToCopy);
                                toast.success("Address copied to clipboard!");
                              }
                            }}
                          >
                            Copy
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div className="text-xs text-yellow-200">
                          <p className="font-semibold mb-1">Important:</p>
                          <ul className="space-y-1 text-xs">
                            <li>
                              • Send exactly{" "}
                              <strong>${withdrawalData.withdrawalFee}</strong>{" "}
                              in {selectedMethod}
                            </li>
                            <li>• Double-check the address before sending</li>
                            <li>
                              • Payment confirmation may take 10-30 minutes
                            </li>
                            <li>• Contact support if you have any issues</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <Button
              onClick={handlePayment}
              disabled={loading || !selectedMethod}
              className="w-full h-12 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <CreditCard className="w-4 h-4" />
              )}
              {selectedMethod
                ? `Pay $${withdrawalData.withdrawalFee} with ${selectedMethod}`
                : "Select Payment Method"}
            </Button>
          </div>

          <div className="text-xs text-gray-400 text-center">
            <p>
              Payment will be processed securely. You will receive confirmation
              once payment is verified and your withdrawal is processed.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
