"use client";
import React, { useState, useEffect } from "react";
import { FlagIcon } from "react-flag-kit";
import { useTheme } from "../../contexts/themeContext";
import { useUserData } from "../../contexts/userrContext";
import { Skeleton } from "../ui/skeleton";

export default function Footer() {
  const { isDarkMode, baseColor } = useTheme();
  const [currentTime, setCurrentTime] = useState("");
  const { details } = useUserData();

  useEffect(() => {
    const getTime = () => {
      const date = new Date();
      const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
      const dayName = days[date.getDay()];
      const dateSuffix = ["th", "st", "nd", "rd"];
      const v = date.getDate() % 100;
      const dateTh =
        dateSuffix[(v - 20) % 10] || dateSuffix[v] || dateSuffix[0];
      const formattedTime = `${dayName} ${date.getDate()}${dateTh} ${date
        .toLocaleString("en-US", {
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
        .toUpperCase()}`;

      setCurrentTime(`CURRENT TIME: ${formattedTime}`);
    };

    const intervalId = setInterval(getTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {details === 0 ? (
        <div
          className={` w-full px-10 py-0.5 ${
            isDarkMode
              ? `${baseColor} text-gray-200 border-t border-white/5`
              : "bg-white text-black/80 border"
          }`}
        >
          {" "}
          <Skeleton
            className={`  h-10 ${isDarkMode ? "bg-[#333]" : "bg-gray-200/80"}`}
          />
        </div>
      ) : (
        <div
          className={`nav-container flex flex-col md:flex-row w-full duration-300 items-center  transition-colors  ${
            isDarkMode
              ? `${baseColor} text-gray-200 border-t border-white/5`
              : "bg-white text-black/80 border"
          }`}
        >
          {details.autoTrades ? (
            <div className="flex items-center text-sm bg-gren-100 order px-4">
              <div className="auto-trade-text font-bold text-700 py-3">
                Auto-Trade:
              </div>
              <div className="active-cont flex items-center font-bold">
                <p className="mx-1 text-green-600 b">Active</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 text-green-600"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          ) : (
            <div className="flex items-center text-sm bg-gren-100 order px-4">
              <div className="auto-trade-text font-bold text-700 py-3">
                Auto-Trade:
              </div>
              <div className="active-cont flex items-center font-bold">
                <p className="mx-1 text-red-600 b">Not Active</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 text-red-600"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          )}

          <div className="md:flex items-center text-sm bg-bue-50 hidden  px-4">
            <div className="auto-trade-text font-bold text-700 py-3">
              Trading Balance ~ ${" "}
            </div>
            <div className="active-cont flex items-center font-old">
              <p className="mx-2 text--600 font-bold">
                <code>
                  {details !== 0
                    ? details.tradingBalance.toLocaleString()
                    : "0"}
                  .00
                </code>
              </p>
            </div>
          </div>
          <div className="font-bold text-sm pl-4 flex pb-3 md:pb-0 items-center">
            <FlagIcon code={details.country} size={16} />
            <div className="mx-2">
              <code>{currentTime}</code>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
