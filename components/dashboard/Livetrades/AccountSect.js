"use client";
import React, { useEffect, useState } from "react";
import { Switch } from "../../ui/switch";
import { usePathname } from "next/navigation";
import { useUserData } from "../../../contexts/userrContext";
import { Skeleton } from "../../ui/skeleton";
import { useTheme } from "../../../contexts/themeContext";

export default function AccountSect() {
  const { details } = useUserData();
  const path = usePathname();
  const [signalStrength, setSignalStrength] = useState(90);
  const [maintenanceGauge, setMaintenanceGauge] = useState(99);
  const autoTrades = details.autoTrades;
  useEffect(() => {
    const timer = setInterval(() => {
      setSignalStrength(Math.floor(Math.random() * (100 - 90) + 90));
      setMaintenanceGauge(Math.floor(Math.random() * (100 - 95) + 95));
    }, 3000);

    return () => clearInterval(timer); // Clear the interval when the component unmounts
  }, []);
  const { isDarkMode } = useTheme();
  return (
    <div className="p-4">
      {details === 0 ? (
        <div className="w-full px-7">
          <Skeleton
            className={`  h-60 ${isDarkMode ? "bg-[#333]" : "bg-gray-200/80"}`}
          />
        </div>
      ) : (
        <div
          className={`card-container ${
            isDarkMode
              ? "bg-[#111] border-white/10 text-white/90"
              : "bg-[#fdfcfc]"
          } p-4 border ${
            path.includes("livetrades")
              ? ""
              : "grid grid-cols-1 lg:grid-cols-2 gap-2"
          }  rounded-xl`}
        >
          <div
            className={`accoutsect ${
              isDarkMode
                ? "bg-[#222] p-3 rounded-md border-white/10 border"
                : ""
            } font-medium my-2 ${path.includes("livetrades") ? "hidden" : ""}`}
          >
            <div
              className={`title ${
                isDarkMode ? "text-white" : ""
              } my-4 pb-3 text-sm/ font-bold text-lg`}
            >
              Account Information
            </div>
            <div className="name-cont flex items-center text-sm py-1">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className={`w-5 h-5 mr-1  ${
                  isDarkMode ? "text-white/80" : "text-slate-700"
                }`}
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="userName ml-2 font-bold">
                {details && details.name}
              </div>
            </div>
            <div className="email-cont my-4 flex items-center text-sm py-1">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={`w-5 h-5 mr-1  ${
                    isDarkMode ? "text-white/80" : "text-slate-700"
                  }`}
                >
                  <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                  <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                </svg>
                <div className="ml-2 font-bold">Email:</div>
              </div>
              <div className="email mx-2">{details && details.email}</div>
            </div>
            <div className="inventment-cont my-4 flex items-center text-sm py-1">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={`w-5 h-5 mr-1  ${
                    isDarkMode ? "text-white/80" : "text-slate-700"
                  }`}
                >
                  <path
                    fillRule="evenodd"
                    d="M1 2.75A.75.75 0 011.75 2h16.5a.75.75 0 010 1.5H18v8.75A2.75 2.75 0 0115.25 15h-1.072l.798 3.06a.75.75 0 01-1.452.38L13.41 18H6.59l-.114.44a.75.75 0 01-1.452-.38L5.823 15H4.75A2.75 2.75 0 012 12.25V3.5h-.25A.75.75 0 011 2.75zM7.373 15l-.391 1.5h6.037l-.392-1.5H7.373zM13.25 5a.75.75 0 01.75.75v5.5a.75.75 0 01-1.5 0v-5.5a.75.75 0 01.75-.75zm-6.5 4a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 016.75 9zm4-1.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z"
                    clipRule="evenodd"
                  />
                </svg>

                <div className="ml-2 font-bold">Balance:</div>
              </div>
              <div className="plan font-bold mx-2 capitalize">
                ${details && details.tradingBalance.toLocaleString()}
              </div>
            </div>
            <div className="email-cont my-4 flex items-center text-sm py-1">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={`w-5 h-5 mr-1  ${
                    isDarkMode ? "text-white/80" : "text-slate-700"
                  }`}
                >
                  <path d="M14 6H6v8h8V6z" />
                  <path
                    fillRule="evenodd"
                    d="M9.25 3V1.75a.75.75 0 011.5 0V3h1.5V1.75a.75.75 0 011.5 0V3h.5A2.75 2.75 0 0117 5.75v.5h1.25a.75.75 0 010 1.5H17v1.5h1.25a.75.75 0 010 1.5H17v1.5h1.25a.75.75 0 010 1.5H17v.5A2.75 2.75 0 0114.25 17h-.5v1.25a.75.75 0 01-1.5 0V17h-1.5v1.25a.75.75 0 01-1.5 0V17h-1.5v1.25a.75.75 0 01-1.5 0V17h-.5A2.75 2.75 0 013 14.25v-.5H1.75a.75.75 0 010-1.5H3v-1.5H1.75a.75.75 0 010-1.5H3v-1.5H1.75a.75.75 0 010-1.5H3v-.5A2.75 2.75 0 015.75 3h.5V1.75a.75.75 0 011.5 0V3h1.5zM4.5 5.75c0-.69.56-1.25 1.25-1.25h8.5c.69 0 1.25.56 1.25 1.25v8.5c0 .69-.56 1.25-1.25 1.25h-8.5c-.69 0-1.25-.56-1.25-1.25v-8.5z"
                    clipRule="evenodd"
                  />
                </svg>

                <div className="ml-2 font-bold">Plan Bonus</div>
              </div>
              <div className="plan font-bold mx-2 capitalize">
                ${details && details.planBonus}
              </div>
            </div>
          </div>

          {/* <div className="settingGuage col-span2 text-sm pr-3">
            <div className="switch-container flex items-center my-4 justify-between w-full">
              <label className="switch-label capitalize font-bold w-ull">
                Auto Trades
              </label>
              <Switch
                className="bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-red-800 via-red-600 to-orange-500 mr-3"
                checked={autoTrades}
                disabled
                // onCheckedChange={setAutoTrades(!autoTrades)}
              />
            </div>
            <div
              className={`slider-container flex items-center my-8 justify-between w-full ${
                isDarkMode
                  ? "p-3 border border-white/10 bg-[#222] rounded-md"
                  : ""
              }`}
            >
              <label className="slider-label capitalize w-ull font-bold">
                signal strength
              </label>
              <div className="progress-cont w-2/3">
                <div
                  className={`progress-underlay h-2 w-full rounded-full relative  overflow-hidden ${
                    isDarkMode ? "bg-red-500/10" : "bg-slate-200"
                  }`}
                >
                  <div
                    className={`progress-line h-full transition-all top-0 left-0 bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-red-800 via-red-600 to-orange-500 rounded-full`}
                    style={{ width: `${signalStrength}%` }}
                  ></div>
                </div>
              </div>
              <div className="slider-value mx-3 font-bold">
                {signalStrength}%
              </div>
            </div>

            <div
              className={`slider-container flex items-center my-8 justify-between w-full ${
                isDarkMode
                  ? "p-3 border border-white/10 bg-[#222] rounded-md"
                  : ""
              }`}
            >
              {" "}
              <label className="slider-label capitalize font-bold w-ull">
                mainten. gauge
              </label>
              <div className="progress-cont w-2/3">
                <div
                  className={`progress-underlay h-2 w-full rounded-full relative  overflow-hidden ${
                    isDarkMode ? "bg-red-500/10" : "bg-slate-200"
                  }`}
                >
                  <div
                    className={`progress-line h-full transition-all top-0 left-0 bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-red-800 via-red-600 to-orange-500 rounded-full`}
                    style={{ width: `${maintenanceGauge}%` }}
                  ></div>
                </div>
              </div>
              <div className="slider-value mx-3 font-bold">
                {maintenanceGauge}%
              </div>
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
}
