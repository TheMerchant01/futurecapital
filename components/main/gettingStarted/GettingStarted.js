"use client";
import Image from "next/image";
import AOS from "aos";
import { useEffect, useState } from "react";
import { DialogTrigger } from "../../ui/dialog";
import AuthUi from "../AuthUi/AuthUi";
import { Dialog } from "@radix-ui/react-dialog";
import dynamic from "next/dynamic";
import { useUserData } from "../../../contexts/userrContext";
import { useTheme } from "../../../contexts/themeContext";
import Link from "next/link";

/* eslint-disable react/no-unescaped-entities */
export default function GettingStarted() {
  const { isDarkMode, baseColor } = useTheme();
  const defaultOpen = true;

  //   const [defaultOpen] = useState(
  //   localStorage.getItem("defaultOpen")
  // );

  return (
    <>
      <section
        id="Getting Started"
        className={`stepContainer w-full flex flex-col lg:flex-row md:flex-col pt-16 md:pt-16 px-3 relative max-w[100vw] ${
          isDarkMode ? `${baseColor} text-gray-100` : "bg-white text-black"
        }`}
      >
        <div className="absolute w-full h-full" data-aos="fade-right">
          {" "}
          <div
            className={`w-40 h-40 absolute  ${
              isDarkMode ? "opacity-30" : "opacity-100"
            }`}
          >
            <Image
              src="/assets/dot.png"
              fill
              alt=""
              className={`top-0 lg:left-0 right-0 md:left-0  w-full h-full ${
                isDarkMode ? "opacity-10" : "opacity-50"
              }`}
            />
          </div>
        </div>

        <div className="textSection lg:w-1/2 md:w-1/2 mt-10 z-20">
          <div
            className="title font-black flex max-w-[170px] items-center  rounded-xl px-3  uppercase justify-start text-sm "
            data-aos="fade-down"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 text-[#0066b1]"
            >
              <path d="M11.644 1.59a.75.75 0 01.712 0l9.75 5.25a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.712 0l-9.75-5.25a.75.75 0 010-1.32l9.75-5.25z" />
              <path d="M3.265 10.602l7.668 4.129a2.25 2.25 0 002.134 0l7.668-4.13 1.37.739a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.71 0l-9.75-5.25a.75.75 0 010-1.32l1.37-.738z" />
              <path d="M10.933 19.231l-7.668-4.13-1.37.739a.75.75 0 000 1.32l9.75 5.25c.221.12.489.12.71 0l9.75-5.25a.75.75 0 000-1.32l-1.37-.738-7.668 4.13a2.25 2.25 0 01-2.134-.001z" />
            </svg>

            <p className="ml-2">Getting Started</p>
          </div>
          <div className="mainTitle mt-3 mx-3">
            <div
              className="howItWorks font-black text-2xl md:text-4xl lg:text-4xl"
              data-aos="fade-down"
            >
              <p>
                How It <span className="text-[#0066b1]">Works?</span>{" "}
              </p>
            </div>
          </div>

          <div
            className="text-content mb-3 mt-3 lg:mt-9 mx-3 text-sm"
            data-aos="fade-up"
          >
            We all have to start somewhere. Let us help get you on the right
            track as you start your investing journey. With this innovative
            platform you'll be ready to start in no time. The fund is started in
            literally several minutes with minimal costs using blockchain-based
            infrastructure that infos. We believe it is incredibly important to
            redistribute this power & profitability.
          </div>
          <Link href="/auth" passHref className="flex items-center">
            <div
              className="btn ml-2 mt-5 md:mt-12 mb-5 lg:block"
              data-aos="fade-up"
            >
              <div className="px-5 py-4 bg-[#0066b1] text-white font-semibold text-sm items-center rounded-xl flex">
                <p>Create an account</p>
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
        <div className="stepSection my-4 w-full lg:flex md:flex md flex-grow  px-3 md:px-0">
          <div
            className="stepRowOne lg:flex lg:flex-col md:flex md:mx-4 md:flex-col w-full"
            data-aos="fade-right"
          >
            <div
              className={`stepOne  py-6 px-3 rounded-xl ${
                isDarkMode
                  ? "bg-[#111]"
                  : "shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] "
              }`}
            >
              <div className="stepHead ">
                <div className="small-text">
                  <div className="cont flex items-center uppercase font-semibold opacit-70 text-xs">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4 mr-2 text-[#0066b1]"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.362 1.093a.75.75 0 00-.724 0L2.523 5.018 10 9.143l7.477-4.125-7.115-3.925zM18 6.443l-7.25 4v8.25l6.862-3.786A.75.75 0 0018 14.25V6.443zm-8.75 12.25v-8.25l-7.25-4v7.807a.75.75 0 00.388.657l6.862 3.786z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p>Registration</p>
                  </div>
                </div>
                <div className="large-text capitalize text-lg py-2 font-semibold ml-3">
                  <p>
                    create an <span className="text-[#0066b1]">account</span>
                  </p>
                </div>
              </div>
              <div className="stepBody">
                <div
                  className={`body-cont text-sm px-3  ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  <p>
                    Getting started with us is really easy. Fill in the
                    requested fields regarding your personal information and
                    trading expertise to complete Client Area registration.
                  </p>
                </div>
              </div>
            </div>
            <div
              className={`stepOne my-2  py-6 px-3 rounded-xl ${
                isDarkMode
                  ? "bg-[#111]"
                  : "shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] "
              }`}
            >
              <div className="stepHead ">
                <div className="small-text">
                  <div className="cont flex items-center uppercase font-semibold opacit-70 text-xs">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4 mr-2 text-[#0066b1]"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.362 1.093a.75.75 0 00-.724 0L2.523 5.018 10 9.143l7.477-4.125-7.115-3.925zM18 6.443l-7.25 4v8.25l6.862-3.786A.75.75 0 0018 14.25V6.443zm-8.75 12.25v-8.25l-7.25-4v7.807a.75.75 0 00.388.657l6.862 3.786z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p>Investment Plans</p>
                  </div>
                </div>
                <div className="large-text capitalize text-lg py-2 font-semibold ml-3">
                  <p>
                    make a <span className="text-[#0066b1]">deposit</span>{" "}
                  </p>
                </div>
              </div>
              <div className="stepBody">
                <div
                  className={`body-cont text-sm px-3  ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  <p>
                    You have an unlimited access to our wide range of profitable
                    assets to investon. Once your contract is started, your
                    earnings will automatically be credited to you wallet.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="stepRowTwo lg:flex lg:flex-col md:flex md:flex-col w-full"
            data-aos="fade-left"
          >
            <div
              className={`stepOne  py-6 px-3 rounded-xl ${
                isDarkMode
                  ? "bg-[#111]"
                  : "shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] "
              }`}
            >
              <div className="stepHead ">
                <div className="small-text">
                  <div className="cont flex items-center uppercase font-semibold  text-xs">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4 mr-2 text-[#0066b1]"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.362 1.093a.75.75 0 00-.724 0L2.523 5.018 10 9.143l7.477-4.125-7.115-3.925zM18 6.443l-7.25 4v8.25l6.862-3.786A.75.75 0 0018 14.25V6.443zm-8.75 12.25v-8.25l-7.25-4v7.807a.75.75 0 00.388.657l6.862 3.786z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p>Financial Growth</p>
                  </div>
                </div>
                <div className="large-text capitalize text-lg py-2 font-semibold ml-3">
                  <p>
                    <span className="text-[#0066b1]">Trading</span> Interception
                  </p>
                </div>
              </div>
              <div className="stepBody">
                <div
                  className={`body-cont text-sm px-3  ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  <p>
                    Getting started with us is really easy. Fill in the
                    requested fields regarding your personal information and
                    trading expertise to complete Client Area registration.
                  </p>
                </div>
              </div>
            </div>
            <div
              className={`stepOne my-2 py-6 px-3 rounded-xl ${
                isDarkMode
                  ? "bg-[#111]"
                  : "shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] "
              }`}
            >
              <div className="stepHead ">
                <div className="small-text">
                  <div className="cont flex items-center uppercase font-semibold opacit-0 text-xs">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4 mr-2 text-[#0066b1]"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.362 1.093a.75.75 0 00-.724 0L2.523 5.018 10 9.143l7.477-4.125-7.115-3.925zM18 6.443l-7.25 4v8.25l6.862-3.786A.75.75 0 0018 14.25V6.443zm-8.75 12.25v-8.25l-7.25-4v7.807a.75.75 0 00.388.657l6.862 3.786z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p>Withrawals</p>
                  </div>
                </div>
                <div className="large-text capitalize text-lg py-2 font-semibold ml-3">
                  <p>
                    Make <span className="text-[#0066b1]">withdrawal</span>{" "}
                    request
                  </p>
                </div>
              </div>
              <div className="stepBody">
                <div
                  className={`body-cont text-sm px-3  ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  <p>
                    Once earnings has been collected or claimed, you can
                    confidently head straight for the withdrawal section to
                    withdraw your funds. Funds are immediately sent to your
                    wallet address.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
