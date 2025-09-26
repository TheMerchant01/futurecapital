/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";
import Slider from "react-slick";
import AOS from "aos";
import { useTheme } from "../../../contexts/themeContext";

export default function Wcy() {
  const { isDarkMode, baseColor } = useTheme();
  return (
    <div
      className={`relative w-full ${
        isDarkMode ? `${baseColor} text-gray-200` : ""
      }`}
    >
      <div
        id="Advantages"
        className="wcy-container   w-full pt-20 px-5 md:px-10 "
      >
        <div className="inner-cont w-full md:ext-center ">
          <div className="smallertex  md:jusify-center ">
            <div
              data-aos="fade-down"
              className="inner-smaller-text flex md:bg-reen-700 rounded-full  items-center font-semibold my-2 uppercase text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 mr-2 text-[#0066b1]"
              >
                <path d="M16.881 4.346A23.112 23.112 0 018.25 6H7.5a5.25 5.25 0 00-.88 10.427 21.593 21.593 0 001.378 3.94c.464 1.004 1.674 1.32 2.582.796l.657-.379c.88-.508 1.165-1.592.772-2.468a17.116 17.116 0 01-.628-1.607c1.918.258 3.76.75 5.5 1.446A21.727 21.727 0 0018 11.25c0-2.413-.393-4.735-1.119-6.904zM18.26 3.74a23.22 23.22 0 011.24 7.51 23.22 23.22 0 01-1.24 7.51c-.055.161-.111.322-.17.482a.75.75 0 101.409.516 24.555 24.555 0 001.415-6.43 2.992 2.992 0 00.836-2.078c0-.806-.319-1.54-.836-2.078a24.65 24.65 0 00-1.415-6.43.75.75 0 10-1.409.516c.059.16.116.321.17.483z" />
              </svg>

              <p>Trading Advantages</p>
            </div>
          </div>
          <div
            data-aos="fade-right"
            className={`text-xl md:text-2xl lg:text-3xl  font-bold mb-4 ${
              isDarkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            Reasons <span className={`text-[#0066b1]`}>Why</span> You Need
            <span className={`text-[#0066b1]`}> Choose Us??</span>
          </div>
          <div
            data-aos="fade-left"
            className={`text-writeUp text-sm my-5 w-full md:w-[60%] md:m ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            <p>
              With years of industry experience, our team comprises highly
              skilled professionals who are experts in their respective fields.
              We bring extensive knowledge and insights to deliver exceptional
              results tailored to your unique needs.
            </p>{" "}
          </div>
        </div>
        <div className="cardcontainer  ">
          <div
            data-aos="fade-up"
            className="row-one grid lg:grid-cols-3 md:grid-cols-2 gap-4"
          >
            <div
              className={`stepOne ${
                isDarkMode
                  ? "bg-[#111]"
                  : "shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
              }   py-6 px-3 rounded-xl`}
            >
              <div className="stepHead ">
                <div
                  className={`small-text ${
                    isDarkMode ? "text-amber-500" : "text-amber-700"
                  }`}
                >
                  <div className="cont flex items-center uppercase font-semibold opacity-70 text-xs">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 mr-2"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <p>Security</p>
                  </div>
                </div>
                <div className="large-text capitalize text-lg py-2 font-semibold ml-3">
                  <p>
                    safe &{" "}
                    <span
                      className={`text-amber-700 ${
                        isDarkMode ? "text-amber-500" : "text-amber-700"
                      }`}
                    >
                      {" "}
                      secure
                    </span>
                  </p>
                </div>
              </div>
              <div className="stepBody">
                <div
                  className={`body-cont text-sm pl-3 pr-6 ${
                    isDarkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  <p>
                    Trade with 100% peace of mind as we have the best system
                    security team onboard.
                  </p>
                </div>
              </div>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className={`stepOne ${
                isDarkMode
                  ? "bg-[#111]"
                  : "shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
              }   py-6 px-3 rounded-xl`}
            >
              <div className="stepHead ">
                <div
                  className={`small-text ${
                    isDarkMode ? "text-green-500" : "text-green-700"
                  }`}
                >
                  <div className="cont flex items-center uppercase font-semibold opacity-70 text-xs">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 mr-2"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.54 15h6.42l.5 1.5H8.29l.5-1.5zm8.085-8.995a.75.75 0 10-.75-1.299 12.81 12.81 0 00-3.558 3.05L11.03 8.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l2.47-2.47 1.617 1.618a.75.75 0 001.146-.102 11.312 11.312 0 013.612-3.321z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <p>Efficiency</p>
                  </div>
                </div>
                <div className="large-text capitalize text-lg py-2 font-semibold ml-3">
                  <p>
                    Instant{" "}
                    <span
                      className={`${
                        isDarkMode ? "text-green-500" : "text-green-700"
                      }`}
                    >
                      Trading
                    </span>
                  </p>
                </div>
              </div>
              <div className="stepBody">
                <div
                  className={`body-cont text-sm pl-3 pr-6 ${
                    isDarkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  <p>
                    With our lightning speed servers, you are sure to get the
                    best out of your investments.
                  </p>
                </div>
              </div>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className={`stepOne ${
                isDarkMode
                  ? "bg-[#111]"
                  : "shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
              }   py-6 px-3 rounded-xl`}
            >
              <div className="stepHead ">
                <div
                  className={`small-text ${
                    isDarkMode ? "text-yellow-500" : "text-yellow-700"
                  }`}
                >
                  <div className="cont flex items-center uppercase font-semibold opacity-70 text-xs">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 mr-2"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.5 3.798v5.02a3 3 0 01-.879 2.121l-2.377 2.377a9.845 9.845 0 015.091 1.013 8.315 8.315 0 005.713.636l.285-.071-3.954-3.955a3 3 0 01-.879-2.121v-5.02a23.614 23.614 0 00-3 0zm4.5.138a.75.75 0 00.093-1.495A24.837 24.837 0 0012 2.25a25.048 25.048 0 00-3.093.191A.75.75 0 009 3.936v4.882a1.5 1.5 0 01-.44 1.06l-6.293 6.294c-1.62 1.621-.903 4.475 1.471 4.88 2.686.46 5.447.698 8.262.698 2.816 0 5.576-.239 8.262-.697 2.373-.406 3.092-3.26 1.47-4.881L15.44 9.879A1.5 1.5 0 0115 8.818V3.936z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <p>Income</p>
                  </div>
                </div>
                <div className="large-text capitalize text-lg py-2 font-semibold ml-3">
                  <p>
                    progressive{" "}
                    <span
                      className={`small-text ${
                        isDarkMode ? "text-yellow-500" : "text-yellow-700"
                      }`}
                    >
                      Revenue
                    </span>{" "}
                  </p>
                </div>
              </div>
              <div className="stepBody">
                <div
                  className={`body-cont text-sm pl-3 pr-6 ${
                    isDarkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  <p>
                    Watch your accruals grow in real time and monitor how much
                    revenue is being generated for you..
                  </p>
                </div>
              </div>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className={`stepOne ${
                isDarkMode
                  ? "bg-[#111]"
                  : "shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
              }   py-6 px-3 rounded-xl`}
            >
              <div className="stepHead ">
                <div
                  className={`small-text ${
                    isDarkMode ? "text-red-500" : "text-red-700"
                  }`}
                >
                  <div className="cont flex items-center uppercase font-semibold opacity-70 text-xs">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 mr-2"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z"
                        clipRule="evenodd"
                      />
                      <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
                    </svg>

                    <p>Accessibility</p>
                  </div>
                </div>
                <div className="large-text capitalize text-lg py-2 font-semibold ml-3">
                  <p>
                    investment for{" "}
                    <span
                      className={`small-text ${
                        isDarkMode ? "text-red-500" : "text-red-700"
                      }`}
                    >
                      All
                    </span>{" "}
                  </p>
                </div>
              </div>
              <div className="stepBody">
                <div
                  className={`body-cont text-sm pl-3 pr-6 ${
                    isDarkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  <p>
                    With different packages, Our system is modelled to
                    accommodate everyone no matter how much you have to invest..
                  </p>
                </div>
              </div>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="400"
              className={`stepOne ${
                isDarkMode
                  ? "bg-[#111]"
                  : "shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
              }   py-6 px-3 rounded-xl`}
            >
              <div className="stepHead ">
                <div
                  className={`small-text ${
                    isDarkMode ? "text-green-500" : "text-green-700"
                  }`}
                >
                  <div className="cont flex items-center uppercase font-semibold opacity-70 text-xs">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 mr-2"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.5 3.75a6 6 0 00-5.98 6.496A5.25 5.25 0 006.75 20.25H18a4.5 4.5 0 002.206-8.423 3.75 3.75 0 00-4.133-4.303A6.001 6.001 0 0010.5 3.75zm2.03 5.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72v4.94a.75.75 0 001.5 0v-4.94l1.72 1.72a.75.75 0 101.06-1.06l-3-3z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <p>protection</p>
                  </div>
                </div>
                <div className="large-text capitalize text-lg py-2 font-semibold ml-3">
                  <p>
                    covered by{" "}
                    <span
                      className={`small-text ${
                        isDarkMode ? "text-green-500" : "text-green-700"
                      }`}
                    >
                      Insurance
                    </span>{" "}
                  </p>
                </div>
              </div>
              <div className="stepBody">
                <div
                  className={`body-cont text-sm pl-3 pr-6 ${
                    isDarkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  <p>
                    You have zero chances of losing your investments as all our
                    assets are duly covered by inssurance..
                  </p>
                </div>
              </div>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="500"
              className={`stepOne ${
                isDarkMode
                  ? "bg-[#111]"
                  : "shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
              }   py-6 px-3 rounded-xl`}
            >
              <div className="stepHead ">
                <div
                  className={`small-text ${
                    isDarkMode ? "text-orange-500" : ""
                  }`}
                >
                  <div className="cont flex items-center uppercase font-semibold opacity-70 text-xs">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 mr-2"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM9.763 9.51a2.25 2.25 0 013.828-1.351.75.75 0 001.06-1.06 3.75 3.75 0 00-6.38 2.252c-.033.307 0 .595.032.822l.154 1.077H8.25a.75.75 0 000 1.5h.421l.138.964a3.75 3.75 0 01-.358 2.208l-.122.242a.75.75 0 00.908 1.047l1.539-.512a1.5 1.5 0 01.948 0l.655.218a3 3 0 002.29-.163l.666-.333a.75.75 0 10-.67-1.342l-.667.333a1.5 1.5 0 01-1.145.082l-.654-.218a3 3 0 00-1.898 0l-.06.02a5.25 5.25 0 00.053-1.794l-.108-.752H12a.75.75 0 000-1.5H9.972l-.184-1.29a1.863 1.863 0 01-.025-.45z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <p>cryptocurrency</p>
                  </div>
                </div>
                <div className="large-text capitalize text-lg py-2 font-semibold ml-3">
                  <p>
                    <span className="text-orange-600">bitcoin</span>{" "}
                    transactions
                  </p>
                </div>
              </div>
              <div className="stepBody">
                <div
                  className={`body-cont text-sm pl-3 pr-6 ${
                    isDarkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  <p>
                    Invest in the world's most popular cryptocurrency and enjoy
                    all the benefits that come with it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
