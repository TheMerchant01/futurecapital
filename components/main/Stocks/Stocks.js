/* eslint-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import React from "react";
import { useTheme } from "../../../contexts/themeContext";

export default function MT() {
  const { isDarkMode, baseColor } = useTheme();
  return (
    <div className={`pt-10 ${isDarkMode ? `${baseColor} text-white` : ""}`}>
      <div className="mt-container grid grid-cols-1 md:grid-cols-2 md:px-10 px-5 py-8 md:py-5">
        <section className="image_section flex w-full h-full items-center justify-center">
          <div className="img_container " data-aos="fade-down">
            <Image src="/assets/fpimg.png" alt="" width={700} height={700} />
            <div className="flex items-center justify-center w-full"></div>
          </div>
        </section>
        <section className="text_section md:px-8 px-2 pt-7">
          <div className="textcontaier">
            <div
              className="maintext text-xl md:text-2xl lg:text-3xl font-bold mb-12"
              data-aos="fade-up"
            >
              Enhancing{" "}
              <span
                className="
text-[#0066b1]"
              >
                Investment
              </span>{" "}
              Opportunities with Future Capital Market Versatile{" "}
              <span
                className="
text-[#0066b1]"
              >
                CFD Trading
              </span>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className={`listtext font-semibld  text-sm ${
                isDarkMode ? "text-white/80" : "text-gray-800"
              }`}
            >
              Although trading Forex is a key component of our business,Capital
              Nexus also offers a diverse range of CFD trading options. With
              Future Capital Market, you can engage in CFD trading across
              various asset classes, including{" "}
              <span
                className="
text-[#0066b1] font-bold"
              >
                Forex, Indices, Shares, Commodities, Metals, Digital Currencies,
                Bonds, and ETFs
              </span>
              . Our CFD trading platform provides you with access to the biggest
              global exchanges, including the NASDAQ and NYSE in the United
              States, along with the{" "}
              <span
                className="
text-[#0066b1] font-bold"
              >
                Australian Stock Exchange (ASX)
              </span>
              . This means you can trade some of the world's largest and most
              influential companies, allowing you to diversify your portfolio
              and explore a wide range of trading opportunities.
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
