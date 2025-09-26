"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../../components/ui/table";
import { useUserData } from "../../../contexts/userrContext";
import { useTheme } from "../../../contexts/themeContext";
import Image from "next/image";

export default function Mystakings() {
  const { details } = useUserData();
  const currentDate = new Date();
  const millisecondsInAMonth = 30 * 24 * 60 * 60 * 1000;
  // const [loading, isloading] = useState(false);
  const { isDarkMode } = useTheme();

  return (
    <div className={` mt-3 pb-2 ${isDarkMode ? "text-white" : ""}`}>
      <div className="rounded-sm overflow-hidden relative">
        {/* {loading && (
          <div
            className={`absolute w-full h-full ${
              isDarkMode ? "bg-black/60" : "bg-white/40"
            }`}
          ></div>
        )} */}
        <Table>
          <TableHeader>
            <TableRow
              className={`border-none rounded-sm ${
                isDarkMode
                  ? "bg-[#222] font-bold text-white hover:bg-white/5"
                  : "bg-black/5"
              }`}
            >
              <TableHead
                className={`whitespace-nowrap ${
                  isDarkMode ? "text-white/80" : "text-black/80"
                } font-bold`}
              >
                Staked Asset
              </TableHead>
              <TableHead
                className={`whitespace-nowrap ${
                  isDarkMode ? "text-white/80" : "text-black/80"
                } font-bold`}
              >
                Staked Amount
              </TableHead>
              <TableHead
                className={`whitespace-nowrap ${
                  isDarkMode ? "text-white/80" : "text-black/80"
                } font-bold`}
              >
                Staked Duration
              </TableHead>
              <TableHead
                className={`whitespace-nowrap ${
                  isDarkMode ? "text-white/80" : "text-black/80"
                } font-bold`}
              >
                Monthly Returns
              </TableHead>
              <TableHead
                className={`whitespace-nowrap ${
                  isDarkMode ? "text-white/80" : "text-black/80"
                } font-bold`}
              >
                Total Returns
              </TableHead>
              <TableHead
                className={`${
                  isDarkMode ? "text-white/80" : "text-black/80"
                } font-bold`}
              >
                Status
              </TableHead>
              {/* <TableHead
                className={`${
                  isDarkMode ? "text-white/80" : "text-black/80"
                } font-bold`}
              ></TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {details !== 0 && details.stakings.length === 0 && (
              <TableRow
                key={crypto.id}
                className={`border-none cursor-pointer ${
                  isDarkMode
                    ? "bg-[#111] font-bold text-white hover:bg-white/5"
                    : ""
                }`}
              >
                <TableCell className={`font-bold text-center`} colSpan="8">
                  No stakings yet
                </TableCell>
              </TableRow>
            )}
            {details !== 0 && details.stakings.length !== 0 && (
              <>
                {details.stakings.reverse().map((stake) => (
                  <>
                    <TableRow
                      key={stake.id}
                      className={`border-none cursor-pointer ${
                        isDarkMode
                          ? "bg-[#111] font-bold text-white hover:bg-white/5"
                          : "bg-[#11111105]"
                      }`}
                    >
                      <TableCell className={`font-bold text-center`}>
                        <div className="flex items-center gap-x-3">
                          <div className="image w-7 h-7">
                            <Image
                              src={stake.stakedAssetImagePath}
                              alt=""
                              width={1000}
                              height={1000}
                            />
                          </div>{" "}
                          <div className="text text-left">
                            <p>{stake.stakedAssetSymbol}</p>
                            <p className="opacity-70">{stake.stakedAsset}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className={`font-bold text-sm text-center`}>
                        ${stake.stakedAmount}
                      </TableCell>
                      <TableCell className={`font-bold text-sm text-center`}>
                        {stake.stakedDuration} month(s)
                        <div className="opacity-60 mt-1 whitespace-nowrap">
                          {Math.floor(
                            stake.stakedDuration -
                              (currentDate - new Date(stake.dateStaked)) /
                                millisecondsInAMonth
                          ) < 0 ? (
                            "Completed"
                          ) : (
                            <div className="whitespace-nowrap">
                              {Math.floor(
                                stake.stakedDuration -
                                  (currentDate - stake.dateStaked) /
                                    millisecondsInAMonth
                              )}{" "}
                              month(s) left
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className={`font-bold text-sm text-center`}>
                        ${stake.monthlyReturns}
                      </TableCell>
                      <TableCell className={`font-bold text-sm text-center`}>
                        ${stake.totalReturns}
                      </TableCell>
                      <TableCell className={`font-bold text-center`}>
                        {(stake.status === "ongoing" ||
                          stake.status === "Ongoing") && (
                          <div className="flex item-center font-bold text-orange-500 gap-x-1">
                            <div className="icon animate-spin">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-5 h-5 text-orange-500"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm5-2.25A.75.75 0 017.75 7h4.5a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75h-4.5a.75.75 0 01-.75-.75v-4.5z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <div className="text capitalize text-sm">
                              {stake.status}
                            </div>
                          </div>
                        )}

                        {(stake.status === "completed" ||
                          stake.status === "Completed") && (
                          <div className="flex item-center font-bold text-green-500 gap-x-1">
                            <div className="icon">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-5 h-5 text-green-500"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <div className="text capitalize text-sm">
                              {stake.status}
                            </div>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  </>
                ))}{" "}
              </>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
