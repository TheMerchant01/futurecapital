/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import {
  faCancel,
  faCheckCircle,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { useUserData } from "../../../contexts/userrContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Skeleton } from "../../ui/skeleton";
import { useTheme } from "../../../contexts/themeContext";

export default function History() {
  const { details } = useUserData();
  const depositHistory = Array.isArray(details.depositHistory)
    ? details.depositHistory
    : [];
  const withdrawalHistory = Array.isArray(details.withdrawalHistory)
    ? details.withdrawalHistory
    : [];

  const combinedHistory = [...depositHistory, ...withdrawalHistory];
  combinedHistory.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));

  const hist = [
    {
      name: "all",
      data: combinedHistory.reverse(),
    },
    {
      name: "deposit",
      data: details.depositHistory || [], // Initialize as empty array if data is not available yet
    },
    {
      name: "withdrawal",
      data: details.withdrawalHistory || [], // Initialize as empty array if data is not available yet
    },
  ];
  const [selectedHistory, setSelectedHistory] = useState("all");

  const history = hist.find((h) => h.name === selectedHistory);
  const currentHistory = [...history.data].reverse();
  const { isDarkMode } = useTheme();

  return (
    <>
      {details === 0 ? (
        <div className="p-4">
          <Skeleton
            className={`  h-60 ${isDarkMode ? "bg-[#333]" : "bg-gray-200/80"}`}
          />
        </div>
      ) : (
        <div className="p-4 overflow-x-hidden max-w-[100vw] mt-10">
          <div
            className={`font-bold textsm mb-3 ml-2 ${
              isDarkMode ? " text-white border-0" : ""
            }`}
          >
            Select a transaction history{" "}
          </div>
          <Select
            defaultValue="all"
            onValueChange={(value) => setSelectedHistory(value)}
            className="font-bold"
          >
            <SelectTrigger
              className={`font-bold ${
                isDarkMode ? "bg-[#222] text-white border-0" : ""
              }`}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent
              className={`font-bold ${
                isDarkMode ? "bg-[#222] text-white border-0" : ""
              }`}
            >
              <SelectItem value="all" className="font-bold">
                All Transactions
              </SelectItem>
              <SelectItem value="deposit" className="font-bold">
                Deposit
              </SelectItem>
              <SelectItem value="withdrawal" className="font-bold">
                Withdrawal
              </SelectItem>
            </SelectContent>
          </Select>
          <div
            className={`rounded-xl my-4 py-3 ${
              isDarkMode
                ? "border border-white/10 bg-[#111]"
                : "shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
            }`}
          >
            {" "}
            <Table className="p-0">
              <TableCaption>
                {selectedHistory.charAt(0).toUpperCase() +
                  selectedHistory.slice(1)}{" "}
                History
              </TableCaption>
              <TableHeader
                className={`  ${isDarkMode ? "border-b border-white/10" : ""}`}
              >
                <TableRow
                  className={`border-none ${
                    isDarkMode ? "hover:bg-transparent" : ""
                  }`}
                >
                  {selectedHistory === "deposit" ? (
                    <>
                      <TableHead
                        className={` ${
                          isDarkMode ? "text-white/80" : "text-black/80"
                        } font-bold`}
                      >
                        Date Added
                      </TableHead>
                      <TableHead
                        className={` ${
                          isDarkMode ? "text-white/80" : "text-black/80"
                        } font-bold`}
                      >
                        Deposit Method
                      </TableHead>
                      <TableHead
                        className={` ${
                          isDarkMode ? "text-white/80" : "text-black/80"
                        } font-bold`}
                      >
                        Amount
                      </TableHead>
                      <TableHead
                        className={` ${
                          isDarkMode ? "text-white/80" : "text-black/80"
                        } font-bold`}
                      >
                        Transaction Status
                      </TableHead>
                    </>
                  ) : selectedHistory === "withdrawal" ? (
                    <>
                      <TableHead
                        className={` ${
                          isDarkMode ? "text-white/80" : "text-black/80"
                        } font-bold`}
                      >
                        Date Added
                      </TableHead>
                      <TableHead
                        className={` ${
                          isDarkMode ? "text-white/80" : "text-black/80"
                        } font-bold`}
                      >
                        Withdrawal Method
                      </TableHead>
                      <TableHead
                        className={` ${
                          isDarkMode ? "text-white/80" : "text-black/80"
                        } font-bold`}
                      >
                        Amount
                      </TableHead>
                      <TableHead
                        className={` ${
                          isDarkMode ? "text-white/80" : "text-black/80"
                        } font-bold`}
                      >
                        Transaction Status
                      </TableHead>
                    </>
                  ) : (
                    <>
                      <TableHead
                        className={` ${
                          isDarkMode ? "text-white/80" : "text-black/80"
                        } font-bold`}
                      >
                        Date Added
                      </TableHead>
                      <TableHead
                        className={` ${
                          isDarkMode ? "text-white/80" : "text-black/80"
                        } font-bold`}
                      >
                        Transaction Method
                      </TableHead>
                      <TableHead
                        className={` ${
                          isDarkMode ? "text-white/80" : "text-black/80"
                        } font-bold`}
                      >
                        Amount
                      </TableHead>
                      <TableHead
                        className={` ${
                          isDarkMode ? "text-white/80" : "text-black/80"
                        } font-bold`}
                      >
                        Transaction Status
                      </TableHead>
                    </>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentHistory.length === 0 ? (
                  <TableRow
                    className={`border-none ${
                      isDarkMode ? "hover:bg-transparent" : ""
                    }`}
                  >
                    <TableCell
                      colSpan={4}
                      className={`text-center font-bold ${
                        isDarkMode ? "text-white/80" : "text-black/75"
                      }`}
                    >
                      No {selectedHistory} history
                    </TableCell>
                  </TableRow>
                ) : (
                  currentHistory.map((item, index) => (
                    <TableRow
                      className={`border-none ${
                        isDarkMode ? "hover:bg-transparent text-white/50" : ""
                      }`}
                      key={index}
                    >
                      {selectedHistory === "deposit" ? (
                        <>
                          <TableCell>{item.dateAdded}</TableCell>
                          <TableCell className="capitalize">
                            {item.depositMethod}
                          </TableCell>
                          <TableCell>
                            {"$" +
                              (typeof item.amount === "string"
                                ? parseFloat(item.amount).toLocaleString(
                                    undefined,
                                    {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    }
                                  )
                                : item.amount.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }))}
                          </TableCell>
                          <TableCell
                            className={
                              item.transactionStatus === "Pending" ||
                              item.transactionStatus === "pending"
                                ? "text-orange-500 capitalize font-/bold"
                                : item.transactionStatus === "failed" ||
                                  item.transactionStatus === "Failed"
                                ? "text-red-500 capitalize font-/bold"
                                : "text-green-500 capitalize font/-bold"
                            }
                          >
                            {item.transactionStatus === "Pending" ||
                            item.transactionStatus === "pending" ? (
                              <div className="flex items-center gap-x-2">
                                <FontAwesomeIcon icon={faExclamationCircle} />{" "}
                                {item.transactionStatus}
                              </div>
                            ) : item.transactionStatus === "failed" ||
                              item.transactionStatus === "Failed" ? (
                              <div className="flex items-center gap-x-2">
                                <FontAwesomeIcon icon={faCancel} />{" "}
                                {item.transactionStatus}
                              </div>
                            ) : (
                              <div className="flex items-center gap-x-2">
                                <FontAwesomeIcon icon={faCheckCircle} />{" "}
                                {item.transactionStatus}
                              </div>
                            )}
                          </TableCell>
                        </>
                      ) : selectedHistory === "withdrawals" ? (
                        <>
                          <TableCell>{item.dateAdded}</TableCell>
                          <TableCell className="capitalize">
                            {item.withdrawMethod}
                          </TableCell>
                          <TableCell>
                            {"$" +
                              (typeof item.amount === "string"
                                ? parseFloat(item.amount).toLocaleString(
                                    undefined,
                                    {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    }
                                  )
                                : item.amount.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }))}
                          </TableCell>
                          <TableCell
                            className={
                              item.transactionStatus === "Pending" ||
                              item.transactionStatus === "pending"
                                ? "text-orange-500 capitalize font-/bold"
                                : item.transactionStatus === "failed" ||
                                  item.transactionStatus === "Failed"
                                ? "text-red-500 capitalize font-/bold"
                                : "text-green-500 capitalize font/-bold"
                            }
                          >
                            {item.transactionStatus === "Pending" ||
                            item.transactionStatus === "pending" ? (
                              <div className="flex items-center gap-x-2">
                                <FontAwesomeIcon icon={faExclamationCircle} />{" "}
                                {item.transactionStatus}
                              </div>
                            ) : item.transactionStatus === "failed" ||
                              item.transactionStatus === "Failed" ? (
                              <div className="flex items-center gap-x-2">
                                <FontAwesomeIcon icon={faCancel} />{" "}
                                {item.transactionStatus}
                              </div>
                            ) : (
                              <div className="flex items-center gap-x-2">
                                <FontAwesomeIcon icon={faCheckCircle} />{" "}
                                {item.transactionStatus}
                              </div>
                            )}
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell>{item.dateAdded}</TableCell>
                          <TableCell className="capitalize">
                            {item.withdrawMethod || item.depositMethod}
                          </TableCell>
                          <TableCell>
                            {"$" +
                              (typeof item.amount === "string"
                                ? parseFloat(item.amount).toLocaleString(
                                    undefined,
                                    {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    }
                                  )
                                : item.amount.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }))}
                          </TableCell>
                          <TableCell
                            className={
                              item.transactionStatus === "Pending" ||
                              item.transactionStatus === "pending"
                                ? "text-orange-500 capitalize font-/bold"
                                : item.transactionStatus === "failed" ||
                                  item.transactionStatus === "Failed"
                                ? "text-red-500 capitalize font-/bold"
                                : "text-green-500 capitalize font/-bold"
                            }
                          >
                            {item.transactionStatus === "Pending" ||
                            item.transactionStatus === "pending" ? (
                              <div className="flex items-center gap-x-2">
                                <FontAwesomeIcon icon={faExclamationCircle} />{" "}
                                {item.transactionStatus}
                              </div>
                            ) : item.transactionStatus === "failed" ||
                              item.transactionStatus === "Failed" ? (
                              <div className="flex items-center gap-x-2">
                                <FontAwesomeIcon icon={faCancel} />{" "}
                                {item.transactionStatus}
                              </div>
                            ) : (
                              <div className="flex items-center gap-x-2">
                                <FontAwesomeIcon icon={faCheckCircle} />{" "}
                                {item.transactionStatus}
                              </div>
                            )}
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </>
  );
}
