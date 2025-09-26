/* eslint-disable react/no-unescaped-entities */
"use client";
import { useEffect, useState } from "react";
import { Parallax } from "react-parallax";
import AOS from "aos";

import Image from "next/image";
import CounterRating from "../whatnrating/CounterRating";
import { useTheme } from "../../../contexts/themeContext";

export default function WhatNRating() {
  const { isDarkMode, baseColor } = useTheme();
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    setIsLargeScreen(window.innerWidth >= 768);
    AOS.init();
  }, []);
  return (
    <div className={isDarkMode ? baseColor : "bg-white"}>
      <section
        id="About Us"
        className={`lg:h-[70vh] md:h-[60vh] sm:h-[60] h-[50vh] py-3 relative w-full ${
          isDarkMode ? baseColor : "bg-white"
        }`}
      >
        {isLargeScreen ? (
          <Parallax
            bgImage="/assets/first.jpg"
            strength={600}
            className="h-full"
            id="parallax-container"
            data-aos="fade-up"
          ></Parallax>
        ) : (
          <div className="h-full">
            <Image src="/assets/first.jpg" alt="Background Image" fill />
          </div>
        )}

        <div
          className="parallax-content w-full top-0 left-0 absolute flex flex-col justify-center lg:items-center md:items-center items-start  h-full"
          data-aos="fade-down"
        >
          <div className="little-message bg-[#ffffff20] text-white rounded-xl px-3 py-3 mb-2 mx-10">
            <div className="elem-cont capitalize flex items-center font-semibold ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M16.5 7.5h-9v9h9v-9z" />
                <path
                  fillRule="evenodd"
                  d="M8.25 2.25A.75.75 0 019 3v.75h2.25V3a.75.75 0 011.5 0v.75H15V3a.75.75 0 011.5 0v.75h.75a3 3 0 013 3v.75H21A.75.75 0 0121 9h-.75v2.25H21a.75.75 0 010 1.5h-.75V15H21a.75.75 0 010 1.5h-.75v.75a3 3 0 01-3 3h-.75V21a.75.75 0 01-1.5 0v-.75h-2.25V21a.75.75 0 01-1.5 0v-.75H9V21a.75.75 0 01-1.5 0v-.75h-.75a3 3 0 01-3-3v-.75H3A.75.75 0 013 15h.75v-2.25H3a.75.75 0 010-1.5h.75V9H3a.75.75 0 010-1.5h.75v-.75a3 3 0 013-3h.75V3a.75.75 0 01.75-.75zM6 6.75A.75.75 0 016.75 6h10.5a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V6.75z"
                  clipRule="evenodd"
                />
              </svg>

              <p className="ml-2 text-sm lg:text-base md:text-base sm:text-base">
                A brag little about us
              </p>
            </div>
          </div>
          <div className="bigger-message text-white font-extrabold text-2xl mx-10 l my-5 lg:text-4xl lg:text-center">
            <p>
              We'll help you grow <br className="hidden " /> your money.
            </p>
          </div>
          <div className=" text-white ml-10 mr-5 mt-5  lg:text-center lg:mt-1 md:text-center font-extralight">
            <p>
              Future Capital Market innovative trading platforms and tools
              provide <br className="hidden lg:flex md:flex" /> the power and
              reliability you need to feel more confident in{" "}
              <br className="hidden lg:flex md:flex" /> your trading.
            </p>
          </div>
        </div>
      </section>
      <CounterRating />
    </div>
  );
}
