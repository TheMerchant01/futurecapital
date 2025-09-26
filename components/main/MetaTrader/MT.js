"use client";
import Image from "next/image";
import React from "react";
import { useTheme } from "../../../contexts/themeContext";

export default function MT() {
  const { isDarkMode, baseColor } = useTheme();

  return (
    <div className={`${isDarkMode ? `${baseColor} text-white` : ""}`}>
      <div className="mt-container grid grid-cols-1 md:grid-cols-2 md:px-10 px-5 py-8 md:py-5">
        <section className="image_section flex w-full h-full items-center justify-center">
          <div className="img_container px-4">
            <Image
              src="/assets/trade.png"
              alt=""
              width={400}
              height={400}
              data-aos="fade-down"
            />
            <div
              className="flex items-center justify-center w-full"
              data-aos="fade-up"
            >
              <div
                className={`py-1 w-40 mt-4 h-[1px]  ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-400"
                } blur-md rounded-[100%] shadow-2xl shadow-gray-100 `}
              ></div>
            </div>
          </div>
        </section>
        <section className="text_section md:px-8 px-2 pt-7">
          <div className="textcontaier">
            <div
              className="maintext text-xl md:text-2xl lg:text-3xl font-bold mb-12"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Advanced <span className="text-[#0066b1]">AI Crypto Trading</span>{" "}
              <br /> Platforms &{" "}
              <span className="text-[#0066b1]">Financial Technology</span>
            </div>
            <div
              className={`listtext font-seibold text-sm ${
                isDarkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              <div
                className="list_text1 flex pb-5 items-start"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-6 h-6 mr-2 text-[#0066b1] mt-0.5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="message">
                  <span
                    className="
text-[#0066b1] font-bold"
                  >
                    MetaTrader 4{" "}
                  </span>
                  (MT4) &{" "}
                  <span
                    className="
text-[#0066b1] font-bold"
                  >
                    MetaTrader 5{" "}
                  </span>{" "}
                  (MT5) , IRESS,{" "}
                  <span
                    className="
text-[#0066b1] font-bold"
                  >
                    cTrader
                  </span>{" "}
                  and WebTrader & mobile apps for iPhone and Android devices
                </div>
              </div>
              <div
                className="list_text2 flex pb-5 items-center"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-6 h-6 mr-2 text-[#0066b1] mt-0.5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="message">
                  Advanced client portal to track your trading in real-time
                </div>
              </div>
              <div
                className="list_text3 flex pb-5"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <div className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-6 h-6 mr-2 text-[#0066b1]"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="message">
                  Superior{" "}
                  <span
                    className="
text-[#0066b1] font-bold"
                  >
                    Virtual Private Servers (VPS)
                  </span>{" "}
                  solutions for Expert Advisors (EAs) , scalping and
                  auto-trading
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
