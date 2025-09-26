/* eslint-disable react/no-unescaped-entities */
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
import { useTheme } from "../../../contexts/themeContext";
import { currencies } from "./data/currencies";
import Image from "next/image";
import axios from "axios";
import { useUserData } from "../../../contexts/userrContext";
import Link from "next/link";
import { Input } from "../../ui/input";

export default function CurrencyPage() {
  const { currncyPrices } = useUserData();

  const [searchQuery, setSearchQuery] = useState("");

  const { isDarkMode } = useTheme();

  const filteredMarkets = currencies.filter((trader) =>
    trader.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <div className={`px-4 pb-2 ${isDarkMode ? "text-white" : ""}`}>
      <div className="input-region mb-4">
        <div
          className={`rounded-md mt-5 flex items-center px-3 capitalize w-full ${
            isDarkMode
              ? "bg-[#222] border border-white/10 text-white"
              : "bg-black/5"
          }`}
        >
          <Input
            type="text"
            onChange={handleSearchInputChange}
            placeholder="Search Forex eg. 'USD' "
            className="bg-transparent font-bold border-0 h-12 ring-0 focus-within:ring-0 focus:ring-0 focus-visible:ring-0"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 opacity-50"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div className="rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow
              className={`border-none rounded-md ${
                isDarkMode
                  ? "bg-[#222] font-bold text-white hover:bg-white/5"
                  : ""
              }`}
            >
              <TableHead
                className={` hidden md:flex md:items-center ${
                  isDarkMode ? "text-white/80" : "text-black/80"
                } font-bold`}
              >
                ID
              </TableHead>
              <TableHead
                className={`${
                  isDarkMode ? "text-white/80" : "text-black/80"
                } font-bold`}
              >
                Asset
              </TableHead>
              <TableHead
                className={` ${
                  isDarkMode ? "text-white/80" : "text-black/80"
                } font-bold`}
              >
                Name
              </TableHead>

              <TableHead
                className={` whitespace-nowrap${
                  isDarkMode ? "text-white/80" : "text-black/80"
                } font-bold`}
              >
                Current Price
              </TableHead>
              <TableHead
                className={`${
                  isDarkMode ? "text-white/80" : "text-black/80"
                } font-bold`}
              ></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMarkets.map((crypto, index) => (
              <>
                <TableRow
                  key={crypto.id}
                  className={`border-none cursor-pointer ${
                    isDarkMode
                      ? "bg-[#111] font-bold text-white hover:bg-white/5"
                      : ""
                  }`}
                >
                  <TableCell className="font-bold hidden md:flex md:items-center">
                    {index + 1}
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-orange-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg> */}
                  </TableCell>
                  <TableCell className="text-sm">
                    <div
                      className={`flex items-center gap-x-2 ${
                        isDarkMode ? "text-white/80" : "text-black/80"
                      }`}
                    >
                      <div className="crypto-image w-full">
                        <Image
                          alt=""
                          src={crypto.image}
                          className="w-9 h-7"
                          width={1000}
                          height={1000}
                        />
                      </div>
                      <div className="crypto-name font-bold">
                        {crypto.symbol}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell
                    className={`text-sm ${
                      isDarkMode ? "text-white/80" : "text-black/80"
                    }`}
                  >
                    {crypto.name}
                  </TableCell>

                  <TableCell
                    className={`text-sm ${
                      isDarkMode ? "text-white/80" : "text-black/80"
                    }`}
                  >
                    {currncyPrices[
                      `C:${crypto.name.replace("/", "").toUpperCase()}`
                    ]
                      ? currncyPrices[
                          `C:${crypto.name.replace("/", "").toUpperCase()}`
                        ]
                      : "0.00"}
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/dashboard/trade/en/forex/${crypto.name
                        .replace("/", "")
                        .toUpperCase()}/active/${
                        currncyPrices[
                          `C:${crypto.name.replace("/", "").toUpperCase()}`
                        ]
                      }`}
                      passHref
                    >
                      <button className="px-3 py-2 bg-green-600/10 text-green-600 rounded-sm text-sm">
                        Trade
                      </button>
                    </Link>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
