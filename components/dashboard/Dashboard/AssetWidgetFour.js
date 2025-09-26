"use client";
import React from "react";
import { CryptocurrencyMarket } from "react-tradingview-embed";
import { useTheme } from "../../../contexts/themeContext";

export default function AssetWidgetFour() {
  const { isDarkMode } = useTheme();

  return (
    <div className="card mt-5 rounded-lg shadow[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
      <div className="header p-5">
        <h2 className={`text-lg font-bold ${isDarkMode ? "text-white" : ""}`}>
          Tradable Coins
        </h2>
      </div>
      <CryptocurrencyMarket
        widgetPropsAny={{
          width: "100%",
          height: 490,
          defaultColumn: "overview",
          screener_type: "crypto_mkt",
          displayCurrency: "USD",
          colorTheme: isDarkMode ? "dark" : "light",
          locale: "en",
          isTransparent: true,
        }}
      />
    </div>
  );
}
