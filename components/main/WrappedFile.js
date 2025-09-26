"use client";
import React from "react";
import Slider from "./sliders/Sliders";
import TradingView from "./tradingView/tradingView";
import GettingStarted from "./gettingStarted/GettingStarted";
import WhatNRating from "./whatnrating/WhatNRating";
import Sponsors from "./sponsors/Sponsors";
import AboutUs from "./AboutUs/AboutUs";
import Wcy from "./whyUs/Wcy";
import Testimonials from "./Testimonials/Testimonials";
import FAQ from "./Faq/FAQ";
import Footer from "./footer/Footer";
import Commodities from "./commodities/Commodities";
import MT from "./MetaTrader/MT";
import CT from "./CopyTrading/CT";
import Stock from "./Stocks/Stocks";
import Navbar from "./navbars/Navbar";
import GoogleTranslate from "../Translator/GoogleTranslator";
import LoadingScreen from "./LoadingScreen";
import { Toaster } from "react-hot-toast";
import { ThemeProvider, useTheme } from "../../contexts/themeContext";

export default function WrappedFile() {
  const { isDarkMode, baseColor } = useTheme();
  return (
    <main
      className={`relative transition-all /duration-1000 ${
        isDarkMode ? baseColor : ""
      }`}
    >
      <GoogleTranslate isDarkMode={isDarkMode} />
      <div className="z-50 w-full">
        <LoadingScreen />
      </div>
      <div className="fixed top-0 left-0 w-full text-white z-30 ">
        <Navbar />
      </div>
      <div className=" w-full relative overflow-hidden">
        <div className="w-full ">
          <Slider />
        </div>
      </div>

      <div className=" w-full relative overflow-hidden">
        <section className="relative w-full h-auto">
          <TradingView />
        </section>
        <GettingStarted />
        <WhatNRating />
        <AboutUs />
        {/* <ImageUsing /> */}
        <MT />
        <Commodities />
        <Stock />
        <Wcy />
        <CT />
        <Sponsors />
        <Testimonials />
        <FAQ />
        <Footer />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              backgroundColor: isDarkMode ? "#111111" : "white",
              color: isDarkMode ? "white" : "#111111",
              fontSize: "13px",
              // fontWeight: "bold",
            },
          }}
        />
      </div>
    </main>
  );
}
