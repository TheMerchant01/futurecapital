"use client";
import React from "react";
import { useTheme } from "../../../contexts/themeContext";

export default function Commodities() {
  const { isDarkMode, baseColor } = useTheme();
  return (
    <div
      className={`px-2 py-4 mt- ${
        isDarkMode ? `${baseColor} text-gray-300` : ""
      }`}
    >
      <div className="inner-cont w-full md:ext-center px-5">
        <div className="smallertex">
          <div className="inner-smaller-text flex items-center font-semibold my-2 uppercase  text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 mr-2 text-[#0066b1]"
            >
              <path
                fillRule="evenodd"
                d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z"
                clipRule="evenodd"
              />
            </svg>

            <p className={`${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>
              Products
            </p>
          </div>
        </div>
        <div
          data-aos="fade-right"
          className={`larger-text text-xl md:text-2xl lg:text-3xl font-bold mb-4  ${
            isDarkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          Trade with world-wide accepted{" "}
          <span className="text-[#0066b1]">Product</span>
        </div>
        <div
          data-aos="fade-left"
          className={`text-writeUp text-sm my-5 w-full md:w-[60%] md:m ${
            isDarkMode ? "text-white/70" : "text-gray-600"
          }`}
        >
          <p>
            With years of industry experience, our team comprises highly skilled
            professionals who are experts in their respective fields. We bring
            extensive knowledge and insights to deliver exceptional results
            tailored to your unique needs.
          </p>{" "}
        </div>
      </div>
      <div className="other-cont">
        <div className="commodities grid md:grid-cols-4 gap-2 grid-cols-2 px-2">
          <div
            data-aos="fade-up"
            className={`cm1 s   rounded-md p-3 8 flex items-center ${
              isDarkMode
                ? "bg-[#111]"
                : "hadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
            }`}
          >
            <div className="innercont p-3 rounded-md mr-2 bg-gradient-to-br from-orange-400 to-rose-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 text-white"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM7.346 5.294a.75.75 0 00-1.192.912L9.056 10H6.75a.75.75 0 000 1.5h2.5v1h-2.5a.75.75 0 000 1.5h2.5v1.25a.75.75 0 001.5 0V14h2.5a.75.75 0 100-1.5h-2.5v-1h2.5a.75.75 0 100-1.5h-2.306l2.902-3.794a.75.75 0 10-1.192-.912L10 8.765l-2.654-3.47z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="text font-bold textlg text-sm md:text-base">
              Indices
            </div>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className={`cm1 s   rounded-md p-3 8 flex items-center ${
              isDarkMode
                ? "bg-[#111]"
                : "hadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
            }`}
          >
            <div className="innercont p-3 rounded-md mr-2 bg-gradient-to-br from-orange-400 to-rose-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 text-white"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a8 8 0 100 16 8 8 0 000-16zM5.94 5.5c.944-.945 2.56-.276 2.56 1.06V8h5.75a.75.75 0 010 1.5H8.5v4.275c0 .296.144.455.26.499a3.5 3.5 0 004.402-1.77h-.412a.75.75 0 010-1.5h.537c.462 0 .887.21 1.156.556.278.355.383.852.184 1.337a5.001 5.001 0 01-6.4 2.78C7.376 15.353 7 14.512 7 13.774V9.5H5.75a.75.75 0 010-1.5H7V6.56l-.22.22a.75.75 0 11-1.06-1.06l.22-.22z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="text font-bold text-g text-sm md:text-base">
              ETFs
            </div>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className={`cm1 s   rounded-md p-3 8 flex items-center ${
              isDarkMode
                ? "bg-[#111]"
                : "hadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
            }`}
          >
            <div className="innercont p-3 rounded-md mr-2 bg-gradient-to-br from-orange-400 to-rose-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 text-white"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.798 7.45c.512-.67 1.135-.95 1.702-.95s1.19.28 1.702.95a.75.75 0 001.192-.91C12.637 5.55 11.596 5 10.5 5s-2.137.55-2.894 1.54A5.205 5.205 0 006.83 8H5.75a.75.75 0 000 1.5h.77a6.333 6.333 0 000 1h-.77a.75.75 0 000 1.5h1.08c.183.528.442 1.023.776 1.46.757.99 1.798 1.54 2.894 1.54s2.137-.55 2.894-1.54a.75.75 0 00-1.192-.91c-.512.67-1.135.95-1.702.95s-1.19-.28-1.702-.95a3.505 3.505 0 01-.343-.55h1.795a.75.75 0 000-1.5H8.026a4.835 4.835 0 010-1h2.224a.75.75 0 000-1.5H8.455c.098-.195.212-.38.343-.55z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="text font-bold text-g text-sm md:text-base">
              Commodities
            </div>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className={`cm1 s   rounded-md p-3 8 flex items-center ${
              isDarkMode
                ? "bg-[#111]"
                : "hadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
            }`}
          >
            <div className="innercont p-3 rounded-md mr-2 bg-gradient-to-br from-orange-400 to-rose-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 text-white"
              >
                <path
                  fillRule="evenodd"
                  d="M10.362 1.093a.75.75 0 00-.724 0L2.523 5.018 10 9.143l7.477-4.125-7.115-3.925zM18 6.443l-7.25 4v8.25l6.862-3.786A.75.75 0 0018 14.25V6.443zm-8.75 12.25v-8.25l-7.25-4v7.807a.75.75 0 00.388.657l6.862 3.786z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="text font-bold text-g text-sm">Bonds</div>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="400"
            className={`cm1 s   rounded-md p-3 8 flex items-center ${
              isDarkMode
                ? "bg-[#111]"
                : "hadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
            }`}
          >
            <div className="innercont p-3 rounded-md mr-2 bg-gradient-to-br from-orange-400 to-rose-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 text-white"
              >
                <path d="M10.75 10.818v2.614A3.13 3.13 0 0011.888 13c.482-.315.612-.648.612-.875 0-.227-.13-.56-.612-.875a3.13 3.13 0 00-1.138-.432zM8.33 8.62c.053.055.115.11.184.164.208.16.46.284.736.363V6.603a2.45 2.45 0 00-.35.13c-.14.065-.27.143-.386.233-.377.292-.514.627-.514.909 0 .184.058.39.202.592.037.051.08.102.128.152z" />
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-6a.75.75 0 01.75.75v.316a3.78 3.78 0 011.653.713c.426.33.744.74.925 1.2a.75.75 0 01-1.395.55 1.35 1.35 0 00-.447-.563 2.187 2.187 0 00-.736-.363V9.3c.698.093 1.383.32 1.959.696.787.514 1.29 1.27 1.29 2.13 0 .86-.504 1.616-1.29 2.13-.576.377-1.261.603-1.96.696v.299a.75.75 0 11-1.5 0v-.3c-.697-.092-1.382-.318-1.958-.695-.482-.315-.857-.717-1.078-1.188a.75.75 0 111.359-.636c.08.173.245.376.54.569.313.205.706.353 1.138.432v-2.748a3.782 3.782 0 01-1.653-.713C6.9 9.433 6.5 8.681 6.5 7.875c0-.805.4-1.558 1.097-2.096a3.78 3.78 0 011.653-.713V4.75A.75.75 0 0110 4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="text font-bold text-g text-sm">Forex</div>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="500"
            className={`cm1 s   rounded-md p-3 8 flex items-center ${
              isDarkMode
                ? "bg-[#111]"
                : "hadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
            }`}
          >
            <div className="innercont p-3 rounded-md mr-2 bg-gradient-to-br from-orange-400 to-rose-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 text-white"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM6 5.75A.75.75 0 016.75 5h6.5a.75.75 0 010 1.5h-2.127c.4.5.683 1.096.807 1.75h1.32a.75.75 0 010 1.5h-1.32a4.003 4.003 0 01-3.404 3.216l1.754 1.754a.75.75 0 01-1.06 1.06l-3-3a.75.75 0 01.53-1.28H8c1.12 0 2.067-.736 2.386-1.75H6.75a.75.75 0 010-1.5h3.636A2.501 2.501 0 008 6.5H6.75A.75.75 0 016 5.75z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="text font-bold text-g text-sm">CFDs</div>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="600"
            className={`cm1 s   rounded-md p-3 8 flex items-center ${
              isDarkMode
                ? "bg-[#111]"
                : "hadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
            }`}
          >
            <div className="innercont p-3 rounded-md mr-2 bg-gradient-to-br from-orange-400 to-rose-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 text-white"
              >
                <path d="M12 9a1 1 0 01-1-1V3c0-.553.45-1.008.997-.93a7.004 7.004 0 015.933 5.933c.078.547-.378.997-.93.997h-5z" />
                <path d="M8.003 4.07C8.55 3.992 9 4.447 9 5v5a1 1 0 001 1h5c.552 0 1.008.45.93.997A7.001 7.001 0 012 11a7.002 7.002 0 016.003-6.93z" />
              </svg>
            </div>
            <div className="text font-bold text-g text-sm">Metals</div>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="700"
            className={`cm1 s   rounded-md p-3 8 flex items-center ${
              isDarkMode
                ? "bg-[#111]"
                : "hadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
            }`}
          >
            <div className="innercont p-3 rounded-md mr-2 bg-gradient-to-br from-orange-400 to-rose-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 text-white"
              >
                <path
                  fillRule="evenodd"
                  d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="text font-bold text-g text-sm">Futures</div>
          </div>
        </div>
      </div>
    </div>
  );
}
