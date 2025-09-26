"use client";
import React from "react";
import { MiniChart } from "react-tradingview-embed";
import { useTheme } from "../../../contexts/themeContext";

function AssetWidgetFive() {
  const { isDarkMode } = useTheme();

  const height = 250;
  return (
    <div className="h-full w-full flex flex-col flex-grow justify-stretch">
      <div className="rounded-lg my-1 h-full shadow[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
        <MiniChart
          widgetPropsAny={{
            symbol: "FX:EURUSD",
            width: "100%",
            height,
            trendLineColor: "rgb(8, 153, 129)",
            underLineColor: "rgba(8, 153, 129, 0.2)",
            underLineBottomColor: "rgba(8, 153, 129, 0)",
            locale: "en",
            dateRange: "12M",
            colorTheme: isDarkMode ? "dark" : "light",
            isTransparent: true,
            autosize: true,
            autosize: false,
          }}
        />
      </div>
      <div className="rounded-lg my-1 h-full shadow[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
        <MiniChart
          widgetPropsAny={{
            symbol: "BITSTAMP:BTCUSD",
            width: "100%",
            height,
            trendLineColor: "rgb(8, 153, 129)",
            underLineColor: "rgba(8, 153, 1296, 0.2)",
            underLineBottomColor: "rgba(8, 153, 129, 0)",
            locale: "en",
            dateRange: "12M",
            colorTheme: isDarkMode ? "dark" : "light",
            isTransparent: true,
            autosize: false,
          }}
        />
      </div>
    </div>
  );
}

export default AssetWidgetFive;
