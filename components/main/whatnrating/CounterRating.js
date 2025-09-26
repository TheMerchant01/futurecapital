import { Poppins } from "next/font/google";
import React, { useEffect } from "react";
import AOS from "aos";
import CountUp from "react-countup";
import { useTheme } from "../../../contexts/themeContext";
export default function CounterRating() {
  const { isDarkMode, baseColor } = useTheme();
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div
      className={`${
        isDarkMode ? `${baseColor} text-white` : "bg-white"
      } lg:-translate-y-16 mx-auto lg:w-[80vw] rounded-xl lg:shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden`}
    >
      <div
        className="flexed-container grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2  w-full h-full"
        data-aos="fade-up"
      >
        <div
          className={`item flex w-full h-full justify-center items-center p-4    text-center  ${
            isDarkMode ? "border-gray-900" : ""
          }`}
          data-aos="fade-up"
        >
          <div className="inner w-full h-full ">
            <div className="icon-cont  flex justify-center items-center ">
              <div
                className={`p-4 rounded-full  ${
                  isDarkMode ? "bg-[#00a05520]" : "bg-[#00a05510]"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-[#0066b1]"
                >
                  <path
                    fillRule="evenodd"
                    d="M15.22 6.268a.75.75 0 01.968-.432l5.942 2.28a.75.75 0 01.431.97l-2.28 5.941a.75.75 0 11-1.4-.537l1.63-4.251-1.086.483a11.2 11.2 0 00-5.45 5.174.75.75 0 01-1.199.19L9 12.31l-6.22 6.22a.75.75 0 11-1.06-1.06l6.75-6.75a.75.75 0 011.06 0l3.606 3.605a12.694 12.694 0 015.68-4.973l1.086-.484-4.251-1.631a.75.75 0 01-.432-.97z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className={`text-count my-3 font-bold text-xl`}>
              <CountUp
                end={510}
                duration={10}
                className="font-extrabold"
                enableScrollSpy
              />
              <span className="font-extrabold text-ed-700">K+</span>
            </div>
            <div
              className={`count-res uppercase text-sm font-bld ${
                isDarkMode ? "text-gray-400" : "text-gray-700"
              }`}
            >
              <p>
                Successfull <span className="text-rd-700">Trades</span>{" "}
              </p>
            </div>
          </div>
        </div>
        <div
          className={`item flex w-full h-full justify-center items-center p-4    text-center  ${
            isDarkMode ? "border-gray-900" : ""
          }`}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="inner w-full h-full">
            <div className="icon-cont  flex justify-center items-center ">
              <div
                className={`p-4 rounded-full  ${
                  isDarkMode ? "bg-green-600/10" : "bg-green-600/5"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-green-600"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z"
                    clipRule="evenodd"
                  />
                  <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
                </svg>
              </div>
            </div>
            <div className={`text-count my-3 font-bold text-xl`}>
              <CountUp
                end={127}
                duration={10}
                enableScrollSpy
                className="font-extrabold"
              />
              <spzn className="font-extrabold text-gren-700">K+</spzn>
            </div>
            <div
              className={`count-res uppercase text-sm font-bld ${
                isDarkMode ? "text-gray-400" : "text-gray-700"
              }`}
            >
              <p>
                <span>Happy</span> Customers
              </p>
            </div>
          </div>
        </div>
        <div
          data-aos="fade-up"
          data-aos-delay="400"
          className={`item flex w-full h-full justify-center items-center p-4    text-center  ${
            isDarkMode ? "border-gray-900" : ""
          }`}
        >
          <div className="inner w-full h-full ">
            <div className="icon-cont  flex justify-center items-center ">
              <div
                className={`p-4 rounded-full  ${
                  isDarkMode ? "bg-fuchsia-700/10" : "bg-fuchsia-700/5"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-fuchsia-600"
                >
                  <path d="M16.881 4.346A23.112 23.112 0 018.25 6H7.5a5.25 5.25 0 00-.88 10.427 21.593 21.593 0 001.378 3.94c.464 1.004 1.674 1.32 2.582.796l.657-.379c.88-.508 1.165-1.592.772-2.468a17.116 17.116 0 01-.628-1.607c1.918.258 3.76.75 5.5 1.446A21.727 21.727 0 0018 11.25c0-2.413-.393-4.735-1.119-6.904zM18.26 3.74a23.22 23.22 0 011.24 7.51 23.22 23.22 0 01-1.24 7.51c-.055.161-.111.322-.17.482a.75.75 0 101.409.516 24.555 24.555 0 001.415-6.43 2.992 2.992 0 00.836-2.078c0-.806-.319-1.54-.836-2.078a24.65 24.65 0 00-1.415-6.43.75.75 0 10-1.409.516c.059.16.116.321.17.483z" />
                </svg>
              </div>
            </div>
            <div className={`text-count my-3 font-bold text-xl`}>
              <CountUp
                end={2017}
                start={1960}
                duration={8}
                className="font-extrabold"
                separator=""
                enableScrollSpy
              />
            </div>
            <div
              className={`count-res uppercase text-sm font-bld ${
                isDarkMode ? "text-gray-400" : "text-gray-700"
              }`}
            >
              <p>
                Trading <span className="text-re-700">Since</span>{" "}
              </p>
            </div>
          </div>
        </div>
        <div
          data-aos="fade-up"
          data-aos-delay="600"
          className={`item flex w-full h-full justify-center items-center p-4    text-center  ${
            isDarkMode ? "border-gray-900" : ""
          }`}
        >
          <div className="inner w-full h-full ">
            <div className="icon-cont  flex justify-center items-center ">
              <div
                className={`p-4 rounded-full  ${
                  isDarkMode ? "bg-red-600/10" : "bg-red-600/5"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-red-600"
                >
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
              </div>
            </div>
            <div className={`text-count my-3  font-bold text-xl`}>
              <CountUp
                end={100}
                duration={10}
                enableScrollSpy
                className="font-extrabold"
              />
              <spzn className="font-extrabold text-red-70">%</spzn>
            </div>
            <div
              className={`count-res uppercase text-sm font-bld ${
                isDarkMode ? "text-gray-400" : "text-gray-700"
              }`}
            >
              <p>
                Client <span className="text-rd-700">Satisfaction</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
