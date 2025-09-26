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
} from "../../../../components/ui/table";
import { useUserData } from "../../../../contexts/userrContext";
import { useTheme } from "../../../../contexts/themeContext";
import Image from "next/image";

export default function MyTrades() {
  const { details } = useUserData();
  const { isDarkMode } = useTheme();
  return (
    <div className={` mt-3 pb-2 ${isDarkMode ? "text-white" : ""}`}>
      <div className="rounded overflow-hidden relative">
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
                className={`${
                  isDarkMode ? "text-white/80" : "text-black/80"
                } font-bold`}
              >
                Asset
              </TableHead>
              <TableHead
                className={`${
                  isDarkMode ? "text-white/80" : "text-black/80"
                } font-bold`}
              >
                Amount
              </TableHead>
              <TableHead
                className={`px-1 ${
                  isDarkMode ? "text-white/80" : "text-black/80"
                } font-bold`}
              >
                Duration
              </TableHead>
              <TableHead
                className={`${
                  isDarkMode ? "text-white/80" : "text-black/80"
                } font-bold`}
              >
                Type
              </TableHead>
              <TableHead
                className={`whitespace-nowrap ${
                  isDarkMode ? "text-white/80" : "text-black/80"
                } font-bold`}
              >
                Entry Price
              </TableHead>
              <TableHead
                className={`whitespace-nowrap ${
                  isDarkMode ? "text-white/80" : "text-black/80"
                } font-bold`}
              >
                Lot Size
              </TableHead>
              <TableHead
                className={`whitespace-nowrap ${
                  isDarkMode ? "text-white/80" : "text-black/80"
                } font-bold`}
              >
                Stop Loss
              </TableHead>
              <TableHead
                className={`whitespace-nowrap ${
                  isDarkMode ? "text-white/80" : "text-black/80"
                } font-bold`}
              >
                Take Profit
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
            {details !== 0 && details.latestTrades.length === 0 && (
              <TableRow 
                key={crypto.id}
                className={`border-none cursor-pointer ${
                  isDarkMode
                    ? "bg-[#111] font-bold text-white hover:bg-white/5"
                    : ""
                }`}
              >
                <TableCell className={`font-bold text-center`} colSpan="9">
                  No trades yet
                </TableCell>
              </TableRow>
            )}
            {details !== 0 && details.latestTrades.length !== 0 && (
              <>
                {details.latestTrades.reverse().map((trade) => (
                  <>
                    <TableRow
                      key={trade._id}
                      className={`border-none cursor-pointer ${
                        isDarkMode
                          ? "bg-[#111] font-bold text-white hover:bg-white/5"
                          : "bg-[#11111105]"
                      }`}
                    >
                      <TableCell className={`font-bold text-center`}>
                        <div className="flex items-center gap-x-3">
                          {trade?.marketType !== "forex" ? (
                            <div className="image w-7 h-7">
                              <Image
                                src={`/assets/markets/${trade.marketType}/${trade.market}.svg`}
                                alt=""
                                width={1000}
                                height={1000}
                              />
                            </div>
                          ) : (
                            <div className="image w-7 h-7">
                              <Image
                                src={`/assets/markets/currencies/${trade.market}.svg`}
                                alt=""
                                width={1000}
                                height={1000}
                              />
                            </div>
                          )}{" "}
                          <div className="text text-left">
                            <p>{trade.market}</p>
                            <p className="opacity-70 capitalize">
                              {trade.marketType}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className={`font-bold text-sm text-center`}>
                        ${trade.amount}
                      </TableCell>
                      <TableCell className={`font-bold  text-sm /text-center`}>
                        <div className="md:flex md:items-center md:gap-x-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4 hidden md:block"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <p className="whitespace-nowrap">{trade.duration}</p>
                        </div>
                      </TableCell>
                      <TableCell className={`font-bold text-sm text-center`}>
                        {trade?.type === "Buy" ? (
                          <>
                            <div className="flex items-center gap-x-2">
                              <p className="text-green-600">{trade?.type}</p>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-5 h-5 text-green-600"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          </>
                        ) : (
                          <>
                            {" "}
                            <div className="flex items-center font-bold gap-x-2">
                              <p className="text-red-600">{trade?.type}</p>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-5 h-5 text-red-600"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M1.22 5.222a.75.75 0 011.06 0L7 9.942l3.768-3.769a.75.75 0 011.113.058 20.908 20.908 0 013.813 7.254l1.574-2.727a.75.75 0 011.3.75l-2.475 4.286a.75.75 0 01-1.025.275l-4.287-2.475a.75.75 0 01.75-1.3l2.71 1.565a19.422 19.422 0 00-3.013-6.024L7.53 11.533a.75.75 0 01-1.06 0l-5.25-5.25a.75.75 0 010-1.06z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          </>
                        )}
                      </TableCell>
                      <TableCell className={`font-bold text-sm text-center`}>
                        {trade?.entryPrice}
                      </TableCell>
                      <TableCell className={`font-bold text-sm text-center`}>
                        {trade?.lotSize}
                      </TableCell>
                      <TableCell className={`font-bold text-sm text-center`}>
                        {trade?.stopLoss}
                      </TableCell>
                      <TableCell className={`font-bold text-sm text-center`}>
                        {trade?.takeProfit}
                      </TableCell>

                      <TableCell className={`font-bold text-sm text-center`}>
                        {trade?.status === "Running" && (
                          <div className="flex items-center gap-x-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="w-5 h-5 animate-spin"
                            >
                              <path
                                fillRule="evenodd"
                                d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
                                clipRule="evenodd"
                              />
                            </svg>

                            <p>{trade?.status}</p>
                          </div>
                        )}
                        {trade?.status === "Gain" && (
                          <div className="flex items-center gap-x-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5 text-green-500"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>

                            <p className="text-green-500 font-bold">
                              {trade?.status}
                            </p>
                          </div>
                        )}

                        {trade?.status === "Loss" && (
                          <div className="flex items-center gap-x-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5 text-red-500 font-bold"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>

                            <p className="text-red-600">{trade?.status}</p>
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
