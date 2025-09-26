"use client";
import React, { useState } from "react";
import { investmentPlans } from "./plans";
import { useTheme } from "../../../contexts/themeContext";
import Image from "next/image";
import { useUserData } from "../../../contexts/userrContext";
import Link from "next/link";
import { InfinitySpin } from "react-loader-spinner";
import axios from "axios";
import toast from "react-hot-toast";
import BonusPlan from "../bonus_plan/BonusPlan";
import { Skeleton } from "../../ui/skeleton";

export default function InvestmentPlans() {
  const { details, setNotification, email, setDetails } = useUserData();
  const [loadingStates, setLoadingStates] = useState(
    Array(investmentPlans.length).fill(false)
  );
  const [planErrors, setPlanErrors] = useState(
    Array(investmentPlans.length).fill(false)
  );

  const getColor = (packageName) => {
    switch (packageName) {
      case "gold plan":
        return "#CF9B03";
      case "premium plan":
        return "#6B4BC9";
      case "silver plan":
        return "#C0C0C0";
      case "bronze plan":
        return "#CD7F32";
      default:
        return "#CD7F32";
    }
  };
  const getColorRed = (packageName) => {
    switch (packageName) {
      case "gold plan":
        return "#CF9B0330";
      case "premium plan":
        return "#6B4BC930";
      case "silver plan":
        return "#C0C0C030";
      case "bronze plan":
        return "#CD7F3230";
      default:
        return "#000000";
    }
  };
  const handlePlanChange = async (min, index, plan) => {
    // Set the loading state for the clicked plan
    const updatedLoadingStates = [...loadingStates];
    updatedLoadingStates[index] = true;
    setLoadingStates(updatedLoadingStates);

    try {
      if (details.tradingBalance > min) {
        // Make an API request to purchase the plan
        const response = await axios.post("/plan/api", { plan, email, min });

        // Check if the purchase was successful (you may need to adjust this based on your API response)
        if (response.data.success) {
          setDetails((prevDetails) => ({
            ...prevDetails,
            tradingBalance: prevDetails.tradingBalance - min,
            investmentPackage: plan,
          }));
          // Reset the loading state after a successful purchase
          const updatedLoadingStates = [...loadingStates];
          updatedLoadingStates[index] = false;
          setLoadingStates(updatedLoadingStates);
          toast.success(`${plan} purchase was successfull`, { duration: 4000 });
          // Notify the user
          setNotification(
            `Your ${plan} purchase was successful, start enjoying trading benefits`,
            "transaction",
            "success"
          );
          const updatedErrors = [...planErrors];
          updatedErrors[index] = false;
          setPlanErrors(updatedErrors);
        } else {
          // Set the error state for the clicked plan
          const updatedErrors = [...planErrors];
          updatedErrors[index] = true;
          setPlanErrors(updatedErrors);

          // Reset the loading state
          const updatedLoadingStates = [...loadingStates];
          updatedLoadingStates[index] = false;
          setLoadingStates(updatedLoadingStates);

          // Notify the user of the error
          setNotification(
            ` Your ${plan} purchase was declined due to an error. Please try again later.`,
            "transaction",
            "failure"
          );
        }
      } else {
        // Set the error state for the clicked plan
        const updatedErrors = [...planErrors];
        updatedErrors[index] = true;
        setPlanErrors(updatedErrors);

        // Reset the loading state
        const updatedLoadingStates = [...loadingStates];
        updatedLoadingStates[index] = false;
        setLoadingStates(updatedLoadingStates);

        // Notify the user of insufficient balance
        setNotification(
          `Your ${plan} purchase was declined due to insufficient balance. Please deposit.`,
          "transaction",
          "failure"
        );
      }
    } catch (error) {
      console.error("Error:", error);

      // Set the error state for the clicked plan
      const updatedErrors = [...planErrors];
      updatedErrors[index] = true;
      setPlanErrors(updatedErrors);

      // Reset the loading state
      const updatedLoadingStates = [...loadingStates];
      updatedLoadingStates[index] = false;
      setLoadingStates(updatedLoadingStates);

      // Notify the user of the error
      setNotification(
        "An error occurred while processing your plan purchase. Please try again later.",
        "transaction",
        "failure"
      );
    }
  };

  const { isDarkMode } = useTheme();
  return (
    <>
      {details === 0 ? (
        <div className="p-4 mt-4">
          <Skeleton
            className={`  h-10 mb-4 ${
              isDarkMode ? "bg-[#333]" : "bg-gray-200/80"
            }`}
          />
          <Skeleton
            className={`  h-60 mb-4 ${
              isDarkMode ? "bg-[#333]" : "bg-gray-200/80"
            }`}
          />
          <Skeleton
            className={`  h-60 ${isDarkMode ? "bg-[#333]" : "bg-gray-200/80"}`}
          />
        </div>
      ) : (
        <>
          <div className="mt-5 p-4">
            {" "}
            <BonusPlan />
          </div>

          <div className="p-4 grid-cols-1 grid md:grid-cols-2 gap-4 ">
            {investmentPlans.map((plan, index) => (
              <div
                key={index}
                className={` p-4 rounded-xl border relative ${
                  isDarkMode ? "bg-[#111] text-white/80" : "bg-white"
                }`}
                style={{ border: "2px solid " + getColorRed(plan.package) }}
              >
                {details.investmentPackage === plan.package && (
                  <div className="absolute -top-3 -left-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                      style={{ color: getColor(plan.package) }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
                <div className="absolute bottom-20 right-0 mb-3">
                  <Image
                    alt=""
                    src={plan.image}
                    width={1000}
                    height={1000}
                    className="opacity-40 w-32 h-32"
                  />
                </div>
                <div
                  className={`text-xl font-bold mb-5 text-center flex items-center justify-center ${getColor(
                    plan.package
                  )}`}
                  style={{ color: getColor(plan.package) }}
                >
                  {" "}
                  <Image
                    alt=""
                    src={plan.image}
                    width={1000}
                    height={1000}
                    className="w-8 h-8"
                  />
                  <div className="capitalize">{plan.package}</div>
                </div>
                <div className="flex items-center justify-center cursor-pointer z-50">
                  {" "}
                  <div
                    className={`text-2xl my-1 p-2 font-bold rounded-sm ${
                      isDarkMode ? `  ` : ""
                    }`}
                    style={{ backgroundColor: getColorRed(plan.package) }}
                  >
                    <sup>$</sup> {plan.price.toLocaleString()}
                    <span className="text-xs"> </span>
                  </div>
                </div>

                <div className="list-disc pl-5">
                  {plan.packageBenefit.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="text-sm flex p-2 font-bold items-center text-right"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className={`w-5 h-5 mr-2 ${
                          isDarkMode ? "text-white/80" : "text-gray-900"
                        }`}
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <div>{benefit}</div>
                    </div>
                  ))}
                </div>

                <div className="button-container flex justify-center">
                  <button
                    onClick={() =>
                      handlePlanChange(plan.price, index, plan.package)
                    }
                    disabled={details.investmentPackage === plan.package}
                    className={`rounded-full px-7 ${
                      isDarkMode ? "text-white" : ""
                    } ${
                      details.investmentPackage === plan.package
                        ? "cursor-not-allowed"
                        : ""
                    } my-4 py-3 text-sm font-bold`}
                    style={{
                      backgroundColor:
                        details.investmentPackage === plan.package
                          ? isDarkMode
                            ? "#222"
                            : "#F6F7F8" // Provide a valid color code for light mode
                          : getColor(plan.package), // Replace this with your getColor function
                    }}
                  >
                    {loadingStates[index]
                      ? "Purchasing Signal..."
                      : details.investmentPackage == plan.package
                      ? "Current Running Signal"
                      : "Buy Signal"}
                  </button>
                </div>
                {planErrors[index] && (
                  <div className="text-sm text-red-500 w-full text-center">
                    Insufficient Balance to activate this plan.{" "}
                    <span className="font-bold">
                      <Link href="/dashboard/deposits">Deposit now</Link>
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
