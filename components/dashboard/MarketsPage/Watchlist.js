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
import { currencies } from "./data/stocks";
import Image from "next/image";
import axios from "axios";

export default function StockPage() {
  const [stockPrices, setStockPrices] = useState({}); // Updated state variable name

  useEffect(() => {
    const fetchStockPrices = async () => {
      try {
        // Create an array of unique symbols from stocks, join them and convert to uppercase
        // Make a single API request to fetch prices for all symbols using Polygon.io
        const response = await axios.get(
          `https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/2023-01-09?adjusted=true&apiKey=uBHWmV9nY9dXSxbrZJ8iiuFrcHsEiHED`
        );
        console.log(response);
        if (
          response.data &&
          response.data.status === "OK" &&
          response.data.results
        ) {
          const stockData = response.data.results;
          const priceData = {};

          stockData.forEach((stock) => {
            priceData[stock.T] = stock.c;
          });

          setStockPrices(priceData);
        }
      } catch (error) {
        console.error("Error fetching stock prices:", error);
      }
    };

    fetchStockPrices();
  }, []);

  const { isDarkMode } = useTheme();
  return (
    <div className={`px-4 pb-2 ${isDarkMode ? "text-white" : ""}`}>
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
                className={`${
                  isDarkMode ? "text-white/80" : "text-black/80"
                } font-bold`}
              >
                Star
              </TableHead>
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
                Name
              </TableHead>
              <TableHead
                className={`${
                  isDarkMode ? "text-white/80" : "text-black/80"
                } font-bold`}
              >
                Value
              </TableHead>
              <TableHead
                className={`${
                  isDarkMode ? "text-white/80" : "text-black/80"
                } font-bold`}
              >
                Price
              </TableHead>
              <TableHead
                className={`${
                  isDarkMode ? "text-white/80" : "text-black/80"
                } font-bold`}
              ></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <>
              <TableRow
                key={crypto.id}
                className={`border-none cursor-pointer ${
                  isDarkMode
                    ? "bg-[#111] font-bold text-white hover:bg-white/5"
                    : ""
                }`}
              >
                <TableCell
                  colSpan="6"
                  className={`text-center ${
                    isDarkMode ? "font-bold text-white" : ""
                  }`}
                >
                  You have no watchlist yet
                </TableCell>
              </TableRow>
            </>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
