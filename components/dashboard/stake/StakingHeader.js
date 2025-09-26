"use client";
import React from "react";
import { useTheme } from "../../../contexts/themeContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function StakingHeader() {
  const { isDarkMode } = useTheme();
  const pathname = usePathname();

  return (
    <div
      className={`mt-6  px-4 ${isDarkMode ? "text-white" : "text-black/90"}`}
    >
      <div>
        <div className="header text-xk font-bold">Staking</div>
        <p className="text-sm opacity-90">
          Lock up asset for a given period for a certain percentage to earn more
        </p>
      </div>
      <div className={`currency-tabs-container w-full font-bold`}>
        <div className={`flex items-center mt-4`}>
          <Link href="/dashboard/stake" passHref>
            {" "}
            <div
              className={`py-2 px-3 e rounded-sm font-bold ${
                isDarkMode && pathname === "/dashboard/stake"
                  ? "bg-[#222] "
                  : !isDarkMode && pathname === "/dashboard/stake"
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
          <Link href="/dashboard/stake/stock" passHref>
            {" "}
            <div
              className={`py-2 px-3 ${
                isDarkMode && pathname === "/dashboard/stake/stock"
                  ? "bg-[#222] "
                  : !isDarkMode && pathname === "/dashboard/stake/stock"
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
          <Link href="/dashboard/stake/currencies" passHref>
            {" "}
            <div
              className={`py-2 px-3 rounded-sm mx-1 text-sm ${
                isDarkMode && pathname === "/dashboard/stake/currencies"
                  ? "bg-[#222] "
                  : !isDarkMode && pathname === "/dashboard/stake/currencies"
                  ? "bg-black/5 "
                  : ""
              }  cursor-pointer ${
                isDarkMode ? "hover:bg-[#333]" : "hover:bg-black/10"
              } transition-all`}
            >
              {" "}
              Currencies
            </div>
          </Link>
          <Link href="/dashboard/stake/mystakings" passHref>
            {" "}
            <div
              className={`py-2 px-3 rounded-sm mx-1 text-sm ${
                isDarkMode && pathname === "/dashboard/stake/mystakings"
                  ? "bg-[#222] "
                  : !isDarkMode && pathname === "/dashboard/stake/mystakings"
                  ? "bg-black/5 "
                  : ""
              }  cursor-pointer ${
                isDarkMode ? "hover:bg-[#333]" : "hover:bg-black/10"
              } transition-all`}
            >
              {" "}
              My stakings
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
