/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../ui/accordion";
import { useTheme } from "../../../contexts/themeContext";

export default function FAQ() {
  const { isDarkMode, baseColor } = useTheme();

  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div id="FAQ" className={`my-20 ${isDarkMode ? "text-white" : ""} py-5 `}>
      <div className="inner-cont mx-10 mb-10 lg:w-1/2 md:w-2/3">
        <div className="smallertex" data-aos="fade-up">
          <div className="inner-smaller-text flex items-center font-semibold my-2 uppercase text-sm ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 mr-2 text-[#0066b1]"
            >
              <path
                fillRule="evenodd"
                d="M2.25 4.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875V17.25a4.5 4.5 0 11-9 0V4.125zm4.5 14.25a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z"
                clipRule="evenodd"
              />
              <path d="M10.719 21.75h9.156c1.036 0 1.875-.84 1.875-1.875v-5.25c0-1.036-.84-1.875-1.875-1.875h-.14l-8.742 8.743c-.09.089-.18.175-.274.257zM12.738 17.625l6.474-6.474a1.875 1.875 0 000-2.651L15.5 4.787a1.875 1.875 0 00-2.651 0l-.1.099V17.25c0 .126-.003.251-.01.375z" />
            </svg>

            <p>queries</p>
          </div>
        </div>
        <div
          className="larger-text text-2xl font-bold capitalize"
          data-aos="fade-left"
        >
          You Got <span className="text-[#0066b1]">questions?</span> we got{" "}
          <span className="text-[#0066b1]">answers!</span>
        </div>
        <div className="text-writeUp text-sm my-3" data-aos="fade-left">
          <p>
            Immerse yourself in an unparalleled experience of exceptional
            service. Our dedicated team is committed to exceeding your
            expectations with meticulous attention to detail and personalized
            care. From the moment you arrive, we create a warm and sophisticated
            atmosphere tailored to your desires.{" "}
          </p>{" "}
        </div>
      </div>
      <div className="faq-cont mx-10">
        <Accordion
          type="single"
          collapsible
          className="grid  grid-cols-1 transition-all sadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-xl md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AccordionItem
            value="item-1"
            className={`${isDarkMode ? "border-white/5" : ""}`}
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <AccordionTrigger className="font-bold text-sm hover:no-underline">
              How can I get started with your platform?
            </AccordionTrigger>
            <AccordionContent>
              To get started, simply sign up on our website and follow the
              onboarding process. You'll have access to all our platform
              features and tools.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-2"
            className={`${isDarkMode ? "border-white/5" : ""}`}
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <AccordionTrigger className="font-bold text-sm hover:no-underline">
              What payment methods do you support?
            </AccordionTrigger>
            <AccordionContent>
              We support a variety of payment methods, including credit cards,
              bank transfers, and popular digital wallets such as PayPal and
              Stripe.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-3"
            className={`${isDarkMode ? "border-white/5" : ""}`}
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <AccordionTrigger className="font-bold text-sm hover:no-underline">
              Are my funds safe with your platform?
            </AccordionTrigger>
            <AccordionContent>
              Absolutely. We take security seriously and have implemented robust
              measures to ensure the safety of your funds. Your account is
              protected by advanced encryption and authentication protocols.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-4"
            className={`${isDarkMode ? "border-white/5" : ""}`}
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <AccordionTrigger className="font-bold text-sm hover:no-underline">
              Do you provide customer support?
            </AccordionTrigger>
            <AccordionContent>
              Yes, we offer 24/7 customer support via email, live chat, and
              phone. Our dedicated support team is ready to assist you with any
              questions or issues you may have.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-5"
            className={`${isDarkMode ? "border-white/5" : ""}`}
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <AccordionTrigger className="font-bold text-sm hover:no-underline">
              Can I trade on mobile devices?
            </AccordionTrigger>
            <AccordionContent>
              Absolutely. Our trading platform is fully responsive and supports
              trading on various devices, including smartphones and tablets. You
              can trade anytime, anywhere.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-6"
            className={`${isDarkMode ? "border-white/5" : ""}`}
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <AccordionTrigger className="font-bold text-sm hover:no-underline">
              How can I withdraw my profits?
            </AccordionTrigger>
            <AccordionContent>
              Withdrawing your profits is easy. Simply navigate to the
              withdrawal section in your account dashboard and follow the
              instructions to initiate a withdrawal. Your funds will be
              transferred to your designated bank account or payment method.
            </AccordionContent>
          </AccordionItem>
          {showMore && (
            <>
              <AccordionItem
                value="item-7"
                className={`${isDarkMode ? "border-white/5" : ""}`}
                data-aos="fade-up"
                data-aos-delay="700"
              >
                <AccordionTrigger className="font-bold text-sm hover:no-underline">
                  What should I do if I forgot my password?
                </AccordionTrigger>
                <AccordionContent>
                  If you forgot your password, you can click on the "Forgot
                  Password" link on the login page. Follow the instructions to
                  reset your password and regain access to your account.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="item-8"
                className={`${isDarkMode ? "border-white/5" : ""}`}
                data-aos="fade-up"
                data-aos-delay="800"
              >
                <AccordionTrigger className="font-bold text-sm hover:no-underline">
                  Is there a minimum deposit amount?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, there is a minimum deposit amount required to open an
                  account. The specific minimum deposit requirement will be
                  mentioned during the account registration process.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="item-9"
                className={`${isDarkMode ? "border-white/5" : ""}`}
                data-aos="fade-up"
                data-aos-delay="900"
              >
                <AccordionTrigger className="font-bold text-sm hover:no-underline">
                  What trading tools do you offer?
                </AccordionTrigger>
                <AccordionContent>
                  We offer a comprehensive range of trading tools, including
                  advanced charting, technical analysis indicators, real-time
                  market data, and trade execution features. These tools are
                  designed to assist traders in making informed decisions and
                  maximizing their trading potential.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="item-10"
                className={`${isDarkMode ? "border-white/5" : ""}`}
                data-aos="fade-up"
                data-aos-delay="1000"
              >
                <AccordionTrigger className="font-bold text-sm hover:no-underline">
                  Are there any trading fees?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, we charge trading fees based on the specific financial
                  instruments and trading activities. The fee structure is
                  transparent and can be found on our website. We strive to
                  provide competitive and fair pricing for our traders.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="item-11"
                className={`${isDarkMode ? "border-white/5" : ""}`}
                data-aos="fade-up"
                data-aos-delay="1100"
              >
                <AccordionTrigger className="font-bold text-sm hover:no-underline">
                  Can I use automated trading strategies?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, we support automated trading strategies through the use
                  of API integration. Traders can connect their preferred
                  trading bots or algorithmic trading systems to our platform
                  for seamless automated trading.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="item-12"
                className={`${isDarkMode ? "border-white/5" : ""}`}
                data-aos="fade-up"
                data-aos-delay="1200"
              >
                <AccordionTrigger className="font-bold text-sm hover:no-underline">
                  Is there a demo account available?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, we offer a demo account for traders to practice and
                  familiarize themselves with our platform. The demo account
                  provides a risk-free environment to test strategies and
                  explore the features before trading with real funds.
                </AccordionContent>
              </AccordionItem>
            </>
          )}
        </Accordion>
        <div
          className="flex w-full justify-center"
          data-aos="fade-up"
          data-aos-delay="1300"
        >
          <button
            className={` my-5 flex items-center text-sm md:text-base  rounded-lg x-6 py-4 font-bold mt-4 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
            onClick={handleShowMore}
          >
            <p>{showMore ? "Show less" : "Show more"}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`w-5 h-5 ml-1 transition-transform ${
                showMore ? "rotate-180" : "rotate-0"
              }`}
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
