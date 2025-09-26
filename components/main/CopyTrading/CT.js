"use client";
import Image from "next/image";
import React from "react";
import { Dialog, DialogTrigger } from "../../ui/dialog";
import AuthUi from "../AuthUi/AuthUi";
import { useTheme } from "../../../contexts/themeContext";
import Link from "next/link";

export default function CT() {
  const { isDarkMode, baseColor } = useTheme();
  return (
    <div className={`py-10 ${isDarkMode ? `${baseColor} text-gray-100` : ""}`}>
      <div className="mt-container grid grid-cols-1 md:grid-cols-2 md:px-10 px-5 py-8 md:py-5">
        {" "}
        <section className="image_section flex w-full h-full items-center pt-6 justify-center">
          <div className="img_container px-4">
            <Image
              src="/assets/fpimg1.png"
              alt=""
              width={1000}
              height={1000}
              data-aos="fade-down"
              data-aos-delay=""
            />
            <div
              className="flex items-center justify-center w-full"
              data-aos="fade-up"
            ></div>
          </div>
        </section>
        <section className="text_section md:px-8 px-2 pt-7">
          <div className="textcontaier">
            <div
              className="maintext text-xl md:text-2xl lg:text-3xl font-bold mb-12"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Follow <span className="text-[#0066b1]">Top-performing</span>{" "}
              traders
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
                  Follow & copy{" "}
                  <span className="font-bold text-[#0066b1]">
                    top-performing
                  </span>{" "}
                  traders
                </div>
              </div>
              <div
                className="list_text2 flex pb-5"
                data-aos="fade-up"
                data-aos-delay="300"
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
                  Forex, Indices, Shares, Commodities, Metals, Digital
                  Currencies, Bonds & ETFs
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
                  No need to develop your own{" "}
                  <span className="text-[#0066b1] font-bold">trading plan</span>
                </div>
              </div>
            </div>
          </div>
          <div className="btn-container">
            <Link href="/auth" passHref className="flex">
              <div
                className="btn ml-2 mt-5 md:mt-12 mb-5 lg:block"
                data-aos="fade-up"
                data-aos-delay="500"
              >
                <div className="px-5 py-4 bg-[#0066b1] text-white font-semibold text-sm items-center rounded-xl flex">
                  <p>Start Copy-Trading</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 ml-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
