/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Image from "next/image";
import React, { useState } from "react";
import Btcpayment from "./Btcpayment";
import { useUserData } from "../../../contexts/userrContext";
import axios from "axios";
import { useTheme } from "../../../contexts/themeContext";
import { Skeleton } from "../../ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  CreditCard,
} from "lucide-react";
import Swal from "sweetalert2";

export default function Withdrawals() {
  const { details, coinPrices, setNotification, setDetails } = useUserData();
  const { isDarkMode } = useTheme();
  const { email } = useUserData();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    walletAddress: "",
    cryptoType: "BTC",
    amount: "",
    password: "",
    withdrawalAccount: "mainAccount",
  });
  const [btcFilled, setBtcFilled] = useState(true);
  const [formErrors, setFormErrors] = useState({
    walletAddress: "",
    cryptoType: "",
    amount: "",
    password: "",
    withdrawalAccount: "",
  });

  const validateForm = (computedTradeBonus) => {
    const errors = {};
    let isValid = true;

    if (!formData.walletAddress) {
      errors.walletAddress = "Wallet Address is required";
      isValid = false;
    }
    if (!formData.amount) {
      errors.amount = "Amount is required";
      isValid = false;
    }
    if (!formData.cryptoType) {
      errors.cryptoType = "Crypto Type is required";
      isValid = false;
    }
    if (!formData.password) {
      errors.password = "Password is required";
      isValid = false;
    }

    const amount = Number(formData.amount);
    if (amount > computedTradeBonus) {
      errors.amount = `Insufficient Balance, you can only withdraw $${computedTradeBonus.toLocaleString()}`;
      isValid = false;
    }
    if (amount <= 0) {
      errors.amount = "Please add a valid amount";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  async function loginUser(email, password) {
    const errors = {};
    setLoading(true);
    try {
      const response = await axios.post("/withdrawals/verifypw/api", {
        email,
        password,
      });

      if (response.data.success) {
        return true;
      } else {
        errors.password = "Incorrect! Check password and try again";
        setFormErrors(errors);
        return false;
      }
    } catch (error) {
      errors.password = "An error occurred. Please try again later";
      setFormErrors(errors);
      return false;
    } finally {
      setLoading(false);
    }
  }

  const handleToast = () => {
    Swal.fire({
      icon: "success",
      title: "Withdrawal In Progress",
      text: `Your withdrawal of $${formData.amount} is now under review.`,
      background: isDarkMode ? "#111" : "#fff",
      color: isDarkMode ? "#fff" : "#000",
      timer: 4000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
    resetFormData();
  };

  const sendWithdrawHistory = async () => {
    try {
      const response = await axios.post("/history/withdraw/api", {
        email,
        withdrawMethod: `${formData.cryptoType} Payment - ${formData.walletAddress}`,
        amount: formData.amount,
        transactionStatus: "Pending",
        withdrawalAccount: formData.withdrawalAccount,
      });

      console.log("[DEBUG] Withdrawal API response:", response.data);

      if (response.data.success) {
        setDetails((prevDeets) => ({
          ...prevDeets,
          withdrawalHistory: [
            ...prevDeets.withdrawalHistory,
            {
              id: response.data.id,
              withdrawMethod: "Crypto Payment",
              withdrawalAccount: formData.withdrawalAccount,
              amount: formData.amount,
              transactionStatus: "Pending",
              dateAdded: response.data.date,
            },
          ],
        }));

        setNotification(
          `Withdrawal of $${formData.amount} submitted - Fee payment required`,
          "transaction",
          "pending"
        );

        // Redirect to withdrawal fee payment page
        setTimeout(() => {
          window.location.href = `/dashboard/withdrawal-fee-payment?id=${response.data.id}`;
        }, 2000);
      } else {
        Swal.fire({
          icon: "error",
          title: "Withdrawal Failed",
          text:
            response.data.message ||
            "Unable to process your withdrawal. Please try again.",
          background: isDarkMode ? "#111" : "#fff",
          color: isDarkMode ? "#fff" : "#000",
        });
        setLoading(false);
      }
    } catch (error) {
      console.error(
        "Withdrawal Error:",
        error?.response?.data || error.message
      );
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Please try again later.",
        background: isDarkMode ? "#111" : "#fff",
        color: isDarkMode ? "#fff" : "#000",
      });
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check KYC status first
    if (details.kycStatus !== "approved") {
      Swal.fire({
        icon: "warning",
        title: "KYC Verification Required",
        text: "Please complete KYC verification before making withdrawals.",
        background: isDarkMode ? "#111" : "#fff",
        color: isDarkMode ? "#fff" : "#000",
      });
      setLoading(false);
      return;
    }

    let computedTradeBonus = 0;
    if (formData.withdrawalAccount === "mainAccount") {
      computedTradeBonus = Number(details.tradingBalance);
    } else if (formData.withdrawalAccount === "profit") {
      computedTradeBonus = Number(details.planBonus);
    } else if (formData.withdrawalAccount === "totalWon") {
      computedTradeBonus = Number(details.totalWon);
    }

    if (!validateForm(computedTradeBonus)) {
      setLoading(false);
      return;
    }

    const isPasswordCorrect = await loginUser(email, formData.password);

    if (isPasswordCorrect) {
      await sendWithdrawHistory();
    } else {
      setLoading(false);
    }
  };

  const resetFormData = () => {
    setFormData({
      walletAddress: "",
      amount: "",
      password: "",
      cryptoType: "BTC",
      withdrawalAccount: "mainAccount",
    });
    setFormErrors({});
    setBtcFilled(true);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "success":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        );
      case "failure":
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Failed
          </Badge>
        );
      case "pending_fee":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <CreditCard className="w-3 h-3 mr-1" />
            Fee Required
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3 mr-1" />
            Processing
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            {status}
          </Badge>
        );
    }
  };

  return (
    <>
      {details === 0 ? (
        <div className="p-4">
          <Skeleton
            className={`h-80 ${isDarkMode ? "bg-[#333]" : "bg-gray-200/80"}`}
          />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Balance Card */}
          <div
            className={`sticky rounded-lg px-2 py-4 ${
              isDarkMode ? "bg-[#111] text-white" : "bg-white border"
            } transition-all`}
          >
            <div className="card-info shado-md flex items-center justify-between">
              <div className="card-header font-bold ml-1 flex items-center">
                <div className="block">
                  <div
                    className={`icon-cont bg-gry-50 rounded-full p-3 mr-2 text-[#00a055] ${
                      isDarkMode ? "bg-[#00a05520]" : "bg-[#00a05510]"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4 text-[#00a055]"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1 4a1 1 0 011-1h16a1 1 0 011 1v8a1 1 0 01-1 1H2a1 1 0 01-1-1V4zm12 4a3 3 0 11-6 0 3 3 0 016 0zM4 9a1 1 0 100-2 1 1 0 000 2zm13-1a1 1 0 11-2 0 1 1 0 012 0zM1.75 14.5a.75.75 0 000 1.5c4.417 0 8.693.603 12.749 1.73 1.111.309 2.251-.512 2.251-1.696v-.784a.75.75 0 00-1.5 0v.784a.272.272 0 01-.35.25A49.043 49.043 0 001.75 14.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col md:flex-rw md:items-center text-xs ml-2">
                  <div
                    className={`flex items-center ${
                      isDarkMode ? "text-white/80" : ""
                    }`}
                  >
                    <p>Available Balance</p>
                  </div>
                  <div
                    className={`mt-2 text-lg ${
                      isDarkMode ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {`$${
                      details && details.tradingBalance.toLocaleString()
                    }.00`}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Withdrawal Form */}
          <div className="space-y-4">
            <Card
              className={`${
                isDarkMode ? "bg-[#111] border-gray-700" : "bg-white"
              }`}
            >
              <CardHeader>
                <CardTitle
                  className={`${isDarkMode ? "text-white" : "text-gray-900"}`}
                >
                  Make Withdrawal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Btcpayment
                  formErrors={formErrors}
                  loading={loading}
                  handleInputChange={handleInputChange}
                  handleSubmit={handleSubmit}
                  formData={formData}
                />
              </CardContent>
            </Card>
          </div>

          {/* Withdrawal History */}
          <div className="space-y-4">
            <Card
              className={`${
                isDarkMode ? "bg-[#111] border-gray-700" : "bg-white"
              }`}
            >
              <CardHeader>
                <CardTitle
                  className={`${isDarkMode ? "text-white" : "text-gray-900"}`}
                >
                  Withdrawal History
                </CardTitle>
              </CardHeader>
              <CardContent>
                {details &&
                details.withdrawalHistory &&
                details.withdrawalHistory.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow
                          className={`${isDarkMode ? "border-gray-700" : ""}`}
                        >
                          <TableHead
                            className={`${
                              isDarkMode ? "text-gray-300" : "text-gray-600"
                            }`}
                          >
                            Amount
                          </TableHead>
                          <TableHead
                            className={`${
                              isDarkMode ? "text-gray-300" : "text-gray-600"
                            }`}
                          >
                            Method
                          </TableHead>
                          <TableHead
                            className={`${
                              isDarkMode ? "text-gray-300" : "text-gray-600"
                            }`}
                          >
                            Date
                          </TableHead>
                          <TableHead
                            className={`${
                              isDarkMode ? "text-gray-300" : "text-gray-600"
                            }`}
                          >
                            Status
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {details.withdrawalHistory
                          .slice()
                          .reverse()
                          .slice(0, 5)
                          .map((withdrawal, index) => (
                            <TableRow
                              key={withdrawal.id || index}
                              className={`${
                                isDarkMode ? "border-gray-700" : ""
                              }`}
                            >
                              <TableCell
                                className={`${
                                  isDarkMode ? "text-white" : "text-gray-900"
                                }`}
                              >
                                ${withdrawal.amount}
                              </TableCell>
                              <TableCell
                                className={`${
                                  isDarkMode ? "text-gray-300" : "text-gray-600"
                                }`}
                              >
                                {withdrawal.withdrawMethod}
                              </TableCell>
                              <TableCell
                                className={`${
                                  isDarkMode ? "text-gray-300" : "text-gray-600"
                                }`}
                              >
                                {withdrawal.dateAdded}
                              </TableCell>
                              <TableCell>
                                {getStatusBadge(withdrawal.transactionStatus)}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div
                    className={`text-center py-8 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    <p>No withdrawal history found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}
