/* eslint-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import { useTheme } from "../../../contexts/themeContext";

export default function Sponsors() {
  const { isDarkMode, baseColor } = useTheme();
  const settings2 = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipeToSlide: true,
    initialSlide: 0,
    rtl: true,
    nextArrow: <></>,
    prevArrow: <></>,
  };
  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipeToSlide: true,
    initialSlide: 0,
    nextArrow: <></>,
    prevArrow: <></>,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          vertical: false,
          verticalSwiping: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 2,
          vertical: false,
          verticalSwiping: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          vertical: false,
          verticalSwiping: false,
        },
      },
    ],
  };
  return (
    <>
      <div
        id="Partners"
        className={`spons-cont items-center  bg-gray50 py-6  w-full relative ${
          isDarkMode ? `${baseColor} text-gray-200` : ""
        }`}
      >
        {/* <div className="absolute w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <Image
            width={500}
            height={500}
            alt=""
            src="/assets/map-pattern.png"
          />
        </div> */}
        <div className="spons-message-cont mx-10 lg:w-2/3">
          <div className="message">
            <div
              className="message-little flex items-center font-bold uppercase"
              data-aos="fade-up"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 mr-1 text-[#0066b1]"
              >
                <path d="M5.625 3.75a2.625 2.625 0 100 5.25h12.75a2.625 2.625 0 000-5.25H5.625zM3.75 11.25a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75zM3 15.75a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75zM3.75 18.75a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75z" />
              </svg>

              <p className="text-sm">Honoured Sponsors</p>
            </div>
            <div
              className="message-head capitalize"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <p className="text-xl md:text-2xl lg:text-3xl font-bold my-3">
                Top <span className="text-[#0066b1]">Companies</span> and{" "}
                <span className="text-[#0066b1]">Trade</span> Partners 🤝
              </p>
            </div>
            <div
              className="message-text text-sm "
              data-aos="fade-up"
              data-aos-delay="150"
            >
              Companies and agencies from various industries have not only
              recognized Future Capital Market as a trusted and reliable entity
              but have also extended their support in forming strong
              partnerships. This collaborative effort reflects the high level of
              trust and credibility that Future Capital Market has garnered
              within the financial sector. Our commitment to excellence in
              testing and validation has earned us the respect and endorsement
              of key players in the industry, further solidifying our position
              as a leader in the field.
            </div>
          </div>
        </div>
        <div className="spons-sides pt-10 mx-auto w-[90%]  lg:my-0 items-center ">
          <div data-aos="fade-left">
            <Slider {...settings}>
              <div className="slide1">
                <div className="img-holder mx-2">
                  <Image
                    alt=""
                    width={100}
                    height={100}
                    src="/assets/fpslideimg.png"
                  />
                </div>
              </div>
              <div className="slide2">
                <div className="img-holder mx-2">
                  <Image
                    alt=""
                    width={100}
                    height={100}
                    src="/assets/fpslideimg2.png"
                  />
                </div>
              </div>
              <div className="slide3">
                <div className="img-holder mx-2">
                  <Image
                    alt=""
                    width={100}
                    height={100}
                    src="/assets/fpslideimg4.png"
                  />
                </div>
              </div>
              <div className="slide4">
                <div className="img-holder mx-2">
                  <Image
                    alt=""
                    width={100}
                    height={100}
                    src="/assets/fpslideimg7.png"
                  />
                </div>
              </div>
              <div className="slide5 hidden md:block lg:block">
                <div className="img-holder mx-2">
                  <Image
                    alt=""
                    width={100}
                    height={100}
                    src="/assets/fpslideimg8.png"
                  />
                </div>
              </div>
              <div className="slide6 hidden md:block lg:block">
                <div className="img-holder mx-2">
                  <Image
                    alt=""
                    width={100}
                    height={100}
                    src="/assets/fpslideimg5.png"
                  />
                </div>
              </div>
            </Slider>
          </div>
          <div className="my-4  lg:block" data-aos="fade-right">
            <Slider {...settings2}>
              <div className="slide1">
                <div className="img-holder mx-2">
                  <Image
                    alt=""
                    width={100}
                    height={100}
                    src="/assets/fpslideimg.png"
                  />
                </div>
              </div>
              <div className="slide2">
                <div className="img-holder mx-2">
                  <Image
                    alt=""
                    width={100}
                    height={100}
                    src="/assets/fpslideimg2.png"
                  />
                </div>
              </div>
              <div className="slide3">
                <div className="img-holder mx-2">
                  <Image
                    alt=""
                    width={100}
                    height={100}
                    src="/assets/fpslideimg4.png"
                  />
                </div>
              </div>
              <div className="slide4">
                <div className="img-holder mx-2">
                  <Image
                    alt=""
                    width={100}
                    height={100}
                    src="/assets/fpslideimg7.png"
                  />
                </div>
              </div>
              <div className="slide5 hidden md:block lg:block">
                <div className="img-holder mx-2">
                  <Image
                    alt=""
                    width={100}
                    height={100}
                    src="/assets/fpslideimg8.png"
                  />
                </div>
              </div>
              <div className="slide6 hidden md:block lg:block">
                <div className="img-holder mx-2">
                  <Image
                    alt=""
                    width={100}
                    height={100}
                    src="/assets/fpslideimg5.png"
                  />
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
}
