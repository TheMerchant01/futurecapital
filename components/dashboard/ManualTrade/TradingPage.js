"use client";
import React from "react";
import { AdvancedChart, SymbolInfo, TickerTape } from "react-tradingview-embed";
import { useTheme } from "../../../contexts/themeContext";
import TradingForm from "./TradingForm";
import { useRouter } from "next/navigation";

export default function TradingPage({ market, marketType, provider, price }) {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  return (
    <div className=" pr-3 flex flex-col">
      <div
        className="back mt-5 mb-2 cursor-pointer"
        onClick={() => router.back()}
      >
        <div className={`flex pl-3`}>
          <div
            className={`flex items-center gap-1 text-[#0066b1] rounded-full px-3 py-1 text-sm font-bold ${
              isDarkMode ? "bg-[#00a05520]" : "bg-[#00a05510]"
            }`}
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
                clipRule="evenodd"
              />
            </svg>
            <p>Back</p>
          </div>
        </div>
      </div>
      <div className={` ${isDarkMode ? "text-white" : ""}`}>
        {marketType === "crypto" && (
          <SymbolInfo
            widgetPropsAny={{
              symbol: `${provider}:${market}USD`,
              width: "100%",
              locale: "en",
              colorTheme: `${isDarkMode ? "dark" : "light"}`,
              isTransparent: true,
            }}
          />
        )}
        {marketType === "stock" && (
          <SymbolInfo
            widgetPropsAny={{
              symbol: `${market}`,
              width: "100%",
              locale: "en",
              colorTheme: `${isDarkMode ? "dark" : "light"}`,
              isTransparent: true,
            }}
          />
        )}
        {marketType === "forex" && (
          <SymbolInfo
            widgetPropsAny={{
              symbol: `${market}`,
              width: "100%",
              locale: "en",
              colorTheme: `${isDarkMode ? "dark" : "light"}`,
              isTransparent: true,
            }}
          />
        )}
        <TickerTape
          widgetProps={{
            symbols: [
              {
                proName: "FOREXCOM:SPXUSD",
                title: "S&P 500",
              },
              {
                proName: "FOREXCOM:NSXUSD",
                title: "US 100",
              },
              {
                proName: "FX_IDC:EURUSD",
                title: "EUR to USD",
              },
              {
                proName: "BITSTAMP:BTCUSD",
                title: "Bitcoin",
              },
              {
                proName: "BITSTAMP:ETHUSD",
                title: "Ethereum",
              },
            ],
            showSymbolLogo: true,
            colorTheme: `${isDarkMode ? "dark" : "light"}`,
            isTransparent: true,
            displayMode: "adaptive",
            locale: "en",
          }}
        />
        {marketType === "crypto" && (
          <div className=" w-full h-[610px]">
            <AdvancedChart
              widgetProps={{
                isTransparent: true,
                width: "100%",
                height: "610px",
                symbol: `${provider}:${market}USD`,
                interval: "D",
                timezone: "Etc/UTC",
                theme: `${isDarkMode ? "dark" : "light"}`,
                style: "1",
                locale: "en",
                enable_publishing: false,
                backgroundColor: `${isDarkMode ? "#0A0A0A" : "#ffffff"}`,
                withdateranges: true,
                hide_side_toolbar: true,
                allow_symbol_change: false,
                hotlist: false,
                calendar: false,
                studies: ["STD;Klinger%1Oscillator"],
                container_id: "tradingview_2c49b",
              }}
            />
          </div>
        )}
        {marketType === "stock" && (
          <div className=" w-full h-[610px]">
            <AdvancedChart
              widgetProps={{
                isTransparent: true,
                width: "100%",
                height: "610px",
                symbol: `${market}`,
                interval: "D",
                timezone: "Etc/UTC",
                theme: `${isDarkMode ? "dark" : "light"}`,
                style: "1",
                locale: "en",
                enable_publishing: false,
                backgroundColor: `${isDarkMode ? "#0A0A0A" : "#ffffff"}`,
                withdateranges: true,
                hide_side_toolbar: true,
                allow_symbol_change: false,
                hotlist: false,
                calendar: false,
                studies: ["STD;Klinger%1Oscillator"],
                container_id: "tradingview_2c49b",
              }}
            />
          </div>
        )}
        {marketType === "forex" && (
          <div className=" w-full h-[610px]">
            <AdvancedChart
              widgetProps={{
                isTransparent: true,
                width: "100%",
                height: "610px",
                symbol: `${market}`,
                interval: "D",
                timezone: "Etc/UTC",
                theme: `${isDarkMode ? "dark" : "light"}`,
                style: "1",
                locale: "en",
                enable_publishing: false,
                backgroundColor: `${isDarkMode ? "#0A0A0A" : "#ffffff"}`,
                withdateranges: true,
                hide_side_toolbar: true,
                allow_symbol_change: false,
                hotlist: false,
                calendar: false,
                studies: ["STD;Klinger%1Oscillator"],
                container_id: "tradingview_2c49b",
              }}
            />
          </div>
        )}
      </div>
      <div>
        <TradingForm
          market={market}
          marketType={marketType}
          provider={provider}
          price={price}
        />
      </div>
    </div>
  );
}
