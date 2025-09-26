"use client";
import { useEffect, useRef } from "react";
import { useTheme } from "../../../contexts/themeContext";
let tvScriptLoadingPromise;
export default function AdvancedCh() {
  const { isDarkMode } = useTheme();
  const onLoadScriptRef = useRef();

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement("script");
        script.id = "tradingview-widget-loading-script";
        script.src = "https://s3.tradingview.com/tv.js";
        script.type = "text/javascript";
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current()
    );

    return () => (onLoadScriptRef.current = null);

    function createWidget() {
      if (
        document.getElementById("tradingview_ed05f") &&
        "TradingView" in window
      ) {
        new window.TradingView.widget({
          width: "100%",
          height: 610,
          symbol: "NASDAQ:AAPL",
          interval: "D",
          timezone: "Etc/UTC",
          transparent: true,
          theme: isDarkMode ? "dark" : "light",
          style: "1",
          locale: "en",
          hide_top_toolbar: true,
          backgroundColor: isDarkMode
            ? "rgba(10, 10, 10,1)"
            : "rgb(255,255,255,1)",

          enable_publishing: false,
          allow_symbol_change: true,
          container_id: "tradingview_ed05f",
        });
      }
    }
  }, [isDarkMode]);

  return (
    <div className="w-full h-auto my-2 py-2 px-4">
      <div className="tradingview-widget-container relative">
        <div id="tradingview_ed05f" />
      </div>
    </div>
  );
}
