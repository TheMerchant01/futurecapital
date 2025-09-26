"use client";
import React from "react";
import { Ticker } from "react-tradingview-embed";
import { useTheme } from "../../../contexts/themeContext";

export default function AssetWidgetTwo() {
  const { isDarkMode } = useTheme();
  return (
    <>
      <div className="mb-3 shadow[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-lg">
        <div className="flex"></div>{" "}
        <Ticker
          widgetPropsAny={{
            symbols: [
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
            colorTheme: isDarkMode ? "dark" : "light",
            isTransparent: true,
            showSymbolLogo: true,
            locale: "en",
          }}
        />
      </div>
      <div className="mb-3 md:hidden shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-lg">
        <Ticker
          widgetPropsAny={{
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
            colorTheme: isDarkMode ? "dark" : "light",
            isTransparent: true,
            showSymbolLogo: true,
            locale: "en",
          }}
        />
      </div>
    </>
  );
}
