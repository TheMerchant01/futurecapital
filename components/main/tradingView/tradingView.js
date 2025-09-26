"use client";
import { TickerTape } from "react-tradingview-embed";
import { useTheme } from "../../../contexts/themeContext";

export default function TradingView() {
  const { isDarkMode } = useTheme();
  return (
    <div className=" w-full">
      <div className="tradingview-widget-container w-full ">
        <TickerTape
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
            showSymbolLogo: true,
            colorTheme: isDarkMode ? "dark" : "light",
            isTransparent: true,
            displayMode: "adaptive",
            locale: "en",
          }}
        />
      </div>
    </div>
  );
}
