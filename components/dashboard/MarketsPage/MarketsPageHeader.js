"use client";
import React from "react";
import { useTheme } from "../../../contexts/themeContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Livetrade from "../Livetrades/Livetrade";

export default function MarketsPageHeader() {
  const pathname = usePathname();
  const { isDarkMode } = useTheme();
  return (
    <>
      <div className={`${isDarkMode ? "text-white/80" : "text-black/80"} p-4`}>
        <div className="title mt-3 text-xl font-bold">Markets</div>

        <div className={`currency-tabs-container w-full font-bold`}>
          <div className={`flex items-center mt-4`}>
            <Link href="/dashboard/markets" passHref>
              {" "}
              <div
                className={`py-2 px-3 e rounded-sm font-bold ${
                  isDarkMode && pathname === "/dashboard/markets"
                    ? "bg-[#222] "
                    : !isDarkMode && pathname === "/dashboard/markets"
                    ? "bg-black/5 "
                    : ""
                }  mr-1 text-sm cursor-pointer ${
                  isDarkMode ? "hover:bg-[#333]" : "hover:bg-black/10"
                } transition-all`}
              >
                {" "}
                Crypto
              </div>
            </Link>
            <Link href="/dashboard/markets/stock" passHref>
              {" "}
              <div
                className={`py-2 px-3 ${
                  isDarkMode && pathname === "/dashboard/markets/stock"
                    ? "bg-[#222] "
                    : !isDarkMode && pathname === "/dashboard/markets/stock"
                    ? "bg-black/5 "
                    : ""
                } rounded-sm mx-1 text-sm cursor-pointer ${
                  isDarkMode ? "hover:bg-[#333]" : "hover:bg-black/10"
                } transition-all`}
              >
                {" "}
                Stock
              </div>
            </Link>
            <Link href="/dashboard/markets/currencies" passHref>
              {" "}
              <div
                className={`py-2 px-3 rounded-sm mx-1 text-sm ${
                  isDarkMode && pathname === "/dashboard/markets/currencies"
                    ? "bg-[#222] "
                    : !isDarkMode &&
                      pathname === "/dashboard/markets/currencies"
                    ? "bg-black/5 "
                    : ""
                }  cursor-pointer ${
                  isDarkMode ? "hover:bg-[#333]" : "hover:bg-black/10"
                } transition-all`}
              >
                {" "}
                Forex
              </div>
            </Link>
            <Link href="/dashboard/markets/mytrades" passHref>
              {" "}
              <div
                className={`py-2 px-3 rounded-sm mx-1 text-sm ${
                  isDarkMode && pathname === "/dashboard/markets/mytrades"
                    ? "bg-[#222] "
                    : !isDarkMode && pathname === "/dashboard/markets/mytrades"
                    ? "bg-black/5 "
                    : ""
                }  cursor-pointer ${
                  isDarkMode ? "hover:bg-[#333]" : "hover:bg-black/10"
                } transition-all`}
              >
                {" "}
                My Trades
              </div>
            </Link>
            {/* <Link href="/dashboard/markets/watchlist" passHref>
            {" "}
            <div
              className={`py-2 px-3 rounded-sm  mx-1 text-sm  ${
                isDarkMode && pathname === "/dashboard/markets/watchlist"
                  ? "bg-[#222] "
                  : !isDarkMode && pathname === "/dashboard/markets/watchlist"
                  ? "bg-black/5 "
                  : ""
              }  cursor-pointer ${
                isDarkMode ? "hover:bg-[#333]" : "hover:bg-black/10"
              } transition-all`}
            >
              {" "}
              Watchlist
            </div>
          </Link>*/}
          </div>
        </div>
      </div>{" "}
      <Livetrade />
    </>
  );
}

//  ${
//               isDarkMode ? "bg-[#222]" : "bg-black/5"
//             }
