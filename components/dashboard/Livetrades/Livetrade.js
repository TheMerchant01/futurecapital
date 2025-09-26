"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../../ui/card";
import CountUp from "react-countup";
import { useUserData } from "../../../contexts/userrContext";
import { Skeleton } from "../../ui/skeleton";
import { useTheme } from "../../../contexts/themeContext";

const Livetrade = () => {
  const [randomNumbers, setRandomNumbers] = useState({});
  const [changePercent, setChangePercent] = useState(0); // Store the change percentage for "live" only
  const { details } = useUserData();
  const { isDarkMode } = useTheme();
  const livess = [
    {
      name: "live",
      bal: "",

      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5 animate-pulse text-green-500"
        >
          <path
            fillRule="evenodd"
            d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "last profit",
      bal: `$${details && details.lastProfit.toLocaleString()}`,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5 text-red-600"
        >
          <path
            fillRule="evenodd"
            d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm5.25-9.25a.75.75 0 00-1.5 0v4.59l-1.95-2.1a.75.75 0 10-1.1 1.02l3.25 3.5a.75.75 0 001.1 0l3.25-3.5a.75.75 0 10-1.1-1.02l-1.95 2.1V7.75z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "balance",
      bal: `$${details && details.tradingBalance.toLocaleString()}`,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5 text-blue-700"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.798 7.45c.512-.67 1.135-.95 1.702-.95s1.19.28 1.702.95a.75.75 0 001.192-.91C12.637 5.55 11.596 5 10.5 5s-2.137.55-2.894 1.54A5.205 5.205 0 006.83 8H5.75a.75.75 0 000 1.5h.77a6.333 6.333 0 000 1h-.77a.75.75 0 000 1.5h1.08c.183.528.442 1.023.776 1.46.757.99 1.798 1.54 2.894 1.54s2.137-.55 2.894-1.54a.75.75 0 00-1.192-.91c-.512.67-1.135.95-1.702.95s-1.19-.28-1.702-.95a3.505 3.505 0 01-.343-.55h1.795a.75.75 0 000-1.5H8.026a4.835 4.835 0 010-1h2.224a.75.75 0 000-1.5H8.455c.098-.195.212-.38.343-.55z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "trades",
      bal: details.trade || 0,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5 text-yellow-600"
        >
          <path
            fillRule="evenodd"
            d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "total won",
      bal: details.totalWon || 0,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5 text-yellow-600"
        >
          <path
            fillRule="evenodd"
            d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "total loss",
      bal: details.totalLoss || 0,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5 text-yellow-600"
        >
          <path
            fillRule="evenodd"
            d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    // Initialize random numbers
    const initialRandomNumbers = {};
    livess.forEach((item) => {
      initialRandomNumbers[item.name] =
        Math.floor(Math.random() * (120 - 20 + 1)) + 20;
    });
    setRandomNumbers(initialRandomNumbers);

    // Set interval to update the random numbers every second
    const interval = setInterval(() => {
      setRandomNumbers((prevRandomNumbers) => {
        const updatedRandomNumbers = { ...prevRandomNumbers };
        const previousNumber = prevRandomNumbers["live"];
        const minDiff = -10;
        const maxDiff = 10;
        const randomDiff =
          Math.floor(Math.random() * (maxDiff - minDiff + 1)) + minDiff;
        const newNumber = Math.max(previousNumber + randomDiff, 20);
        updatedRandomNumbers["live"] = newNumber;

        const percentChange =
          ((newNumber - previousNumber) / previousNumber) * 100;
        setChangePercent(percentChange);

        return updatedRandomNumbers;
      });
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-4">
      {details === 0 ? (
        <div className=" my-2 w-full grid md:grid-cols-2 grid-cols-2 lg:grid-cols-3 gap-4 overflow-hidden rounded-md">
          <Skeleton
            className={`  h-32 ${isDarkMode ? "bg-[#333]" : "bg-gray-200/80"}`}
          />
          <Skeleton
            className={`  h-32 ${isDarkMode ? "bg-[#333]" : "bg-gray-200/80"}`}
          />
          <Skeleton
            className={`  h-32 ${isDarkMode ? "bg-[#333]" : "bg-gray-200/80"}`}
          />
          <Skeleton
            className={`  h-32 ${isDarkMode ? "bg-[#333]" : "bg-gray-200/80"}`}
          />
          <Skeleton
            className={`  h-32 ${isDarkMode ? "bg-[#333]" : "bg-gray-200/80"}`}
          />
          <Skeleton
            className={`  h-32 ${isDarkMode ? "bg-[#333]" : "bg-gray-200/80"}`}
          />
        </div>
      ) : (
        <div className="dash-boards w-full my-2 text-sm grid md:grid-cols-2 grid-cols-2 lg:grid-cols-3 gap-2">
          {livess.map((items) => (
            <div key={items.name}>
              <Card
                className={`rounded-xl ${
                  isDarkMode ? "border-0 bg-[#111]" : ""
                }`}
              >
                <CardContent
                  className={`p-4 rounded-xl overflow-hidden /border-0 ${
                    isDarkMode ? "bg-[#111]  text-white" : "bg-gray-50"
                  }`}
                >
                  <div className="cont flex justify-between rounded-xl">
                    <div className="deets w-full">
                      <div
                        className={`name capitalize text-sm font-bold ${
                          isDarkMode ? `text-white/70` : ""
                        }`}
                      >
                        {items.name}
                      </div>
                      <div
                        className={`bal font-bold text-xl  my-2 md:text-2xl  ${
                          isDarkMode ? `text-white` : "text-black"
                        }`}
                      >
                        {items.name === "live" ? (
                          <CountUp
                            end={randomNumbers[items.name]}
                            duration={0.5}
                          />
                        ) : (
                          items.bal
                        )}
                      </div>
                    </div>
                    <div className="icon">
                      <div>
                        {items.name === "live" ? (
                          <div className="live">
                            <div className="live-info p-1 flex items-center bg-green-700 text-xs text-white rounded-full">
                              <div className="dot w-1 h-1 animate-ping bg-white  rounded-full"></div>{" "}
                            </div>
                          </div>
                        ) : (
                          items.icon
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`extra font-semibold text-xs ${
                      isDarkMode ? "text-green-600" : "text-green-700"
                    }`}
                  >
                    {items.name === "live"
                      ? `${changePercent.toFixed(1)}% from last second`
                      : "+0% from last month"}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Livetrade;
