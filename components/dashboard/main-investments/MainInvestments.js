"use client";
import React, { useEffect, useState } from "react";
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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../../ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";

export default function MainInvestments() {
  const { details, setNotification, email, setDetails } = useUserData();
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loadingStates, setLoadingStates] = useState(
    Array(investmentPlans.length).fill(false)
  );
  const [planErrors, setPlanErrors] = useState(
    Array(investmentPlans.length).fill(false)
  );
  const [data, setData] = useState([]);

  const getColor = (packageName) => {
    switch (packageName) {
      case "Platinum Plan":
        return "#CF9B03";
      case "Gold Plan":
        return "#6B4BC9";
      case "Silver Plan":
        return "#C0C0C0";
      case "Mini Plan":
        return "#CD7F32";
      default:
        return "#000000";
    }
  };
  const getStatusColor = (packageName) => {
    switch (packageName) {
      case "Active":
        return "green";
      case "Deactivated":
        return "red";
      default:
        return "#000000";
    }
  };
  const getColorRed = (packageName) => {
    switch (packageName) {
      case "Platinum Plan":
        return "#CF9B0330";
      case "Gold Plan":
        return "#6B4BC930";
      case "Silver Plan":
        return "#C0C0C030";
      case "Mini Plan":
        return "#CD7F3230";
      default:
        return "#000000";
    }
  };
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };
  const handlePlanChange = async (amount, index, plan) => {
    // Set the loading state for the clicked plan
    const updatedLoadingStates = [...loadingStates];
    updatedLoadingStates[index] = true;
    setLoadingStates(updatedLoadingStates);

    try {
      if (details.tradingBalance > amount) {
        // Make an API request to purchase the plan
        const response = await axios.post("/plan/api", { plan, email, amount });

        // Check if the purchase was successful (you may need to adjust this based on your API response)
        if (response.data.success) {
          setDetails((prevDetails) => ({
            ...prevDetails,
            tradingBalance: prevDetails.tradingBalance - amount,
            // investmentPackage: plan,
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

  const { isDarkMode, baseColor } = useTheme();

  useEffect(() => {
    const fetchedDetails = async () => {
      if (!details?.email) return;

      try {
        const response = await axios.get(`/getplans/api?email=${details.email}`);

        console.log("This is the response", response);

        if (response.status === 200) {
          // Data fetched successfully, you can now handle the data
          const data = response.data;
          //  console.log(data.withdrawalHistory);
          console.log(data.plans);
          setData(data.plans);
          // Do something with the data here, e.g., update state or perform other actions
        } else {
          // Handle other status codes or errors here
          console.error("Failed to fetch data");
        }
      } catch (error) {
        // Handle network errors or exceptions here
        console.error("Error while fetching data:", error);
        console.log("This is the error", error);
      }
    };

    fetchedDetails();
  }, [details.email]);

  return (
    <>
      {details === 0 ? (
        <div className="p-4 mt-4">
          <Skeleton
            className={`  h-10 mb-4 ${isDarkMode ? "bg-[#333]" : "bg-gray-200/80"
              }`}
          />
          <Skeleton
            className={`  h-60 mb-4 ${isDarkMode ? "bg-[#333]" : "bg-gray-200/80"
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
            {investmentPlans.map((plan, index) => {
              // const isPlanPurchased = data.some((item) => item.plan === plan.package);

              return (
                <div
                  key={index}
                  className={` py-4 px-2 rounded-xl border relative ${isDarkMode ? "bg-[#111] text-white/80" : "bg-white"
                    }`}
                  style={{ border: "2px solid " + getColorRed(plan.package) }}
                >
                  {/* {details.investmentPackage === plan.package && (
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
                )} */}
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
                      className={`text-xl my-1 p-2 font-bold rounded-sm ${isDarkMode ? `  ` : ""
                        }`}
                      style={{ backgroundColor: getColorRed(plan.package) }}
                    >
                      <sup>$</sup> {plan.minprice.toLocaleString()} -{" "}
                      {plan.maxprice.toLocaleString()}
                      <span className="text-xs"> / {plan.duration}</span>
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
                          className={`w-5 h-5 mr-2 ${isDarkMode ? "text-white/80" : "text-gray-900"
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

                  <div className={`button-container flex justify-center`}>
                    <Dialog modal={isDialogOpen}>
                      <DialogTrigger className="w-full">
                        <button
                          // disabled={details.investmentPackage === plan.package}
                          className={`rounded-full px-7 ${isDarkMode ? "text-white" : ""
                            } my-4 py-3 text-sm font-bold`}
                          style={{
                            backgroundColor: getColor(plan.package), // Replace this with your getColor function
                          }}
                        >
                          Purchase Plan
                        </button>
                      </DialogTrigger>

                      <DialogContent
                        className={`w-[90%] rounded-lg overflow-hidden ${isDarkMode ? `${baseColor} text-white border-0` : ""
                          }`}
                      >
                        <DialogHeader className="font-bold capitalize">
                          Purchase New Plan
                        </DialogHeader>

                        {/* Amount */}
                        <div className="mb-3">
                          <label
                            htmlFor="amount"
                            className={`font-bold text-sm py-3 ${isDarkMode ? "text-white/90" : ""
                              }`}
                          >
                            Amount to pay within range
                          </label>
                          <input
                            type="number"
                            id="amount"
                            name="amount"
                            placeholder="Enter Amount"
                            value={amount}
                            onChange={handleAmountChange}
                            className={`w-full px-4 py-3 text-xs placeholder:text-muted-foreground  rounded-md ${isDarkMode ? "bg-[#111] text-white" : ""
                              } bg-gry-50 font-bold focus:outline-none ${error ? "border-red-500 border" : ""
                              }`}
                          />
                          {error && (
                            <p className="text-red-500 text-xs mt-1">{error}</p>
                          )}
                        </div>

                        {!isDialogOpen && <button
                          onClick={() => {
                            const enteredAmount = parseFloat(amount);

                            if (isNaN(enteredAmount)) {
                              setError("Please enter a valid amount.");
                              return;
                            }

                            if (
                              enteredAmount < plan.minprice ||
                              enteredAmount > plan.maxprice
                            ) {
                              setError(
                                `Amount should be between $${plan.minprice} and $${plan.maxprice}.`
                              );
                              return;
                            }

                            setError(""); // Clear previous errors
                            setIsDialogOpen(true)
                            //   handlePlanChange(enteredAmount, plan.package);
                          }}
                          // disabled={details.investmentPackage === plan.package}
                          className={`rounded-full px-7 ${isDarkMode ? "text-white" : ""
                            } my-4 py-3 text-sm font-bold`}
                          style={{
                            backgroundColor: getColor(plan.package), // Replace this with your getColor function
                          }}
                        >
                          {loadingStates[index]
                            ? "Purchasing Plan..."
                            : details.investmentPackage == plan.package
                              ? "Current Running Plan(Purchase Again)"
                              : "Purchase Plan"}
                        </button>}
                        {isDialogOpen && <DialogClose>
                          <button
                            onClick={() => {
                              const enteredAmount = parseFloat(amount);

                              if (isNaN(enteredAmount)) {
                                setError("Please enter a valid amount.");
                                return;
                              }

                              if (
                                enteredAmount < plan.minprice ||
                                enteredAmount > plan.maxprice
                              ) {
                                setError(
                                  `Amount should be between $${plan.minprice} and $${plan.maxprice}.`
                                );
                                return;
                              }

                              setError(""); // Clear previous errors
                              handlePlanChange(enteredAmount, index, plan.package);
                            }}
                            // disabled={details.investmentPackage === plan.package}
                            className={`rounded-full px-7 ${isDarkMode ? "text-white" : ""
                              } my-4 py-3 text-sm font-bold`}
                            style={{
                              backgroundColor: getColor(plan.package), // Replace this with your getColor function
                            }}
                          >
                            {loadingStates[index]
                              ? "Purchasing Plan..."
                              : details.investmentPackage == plan.package
                                ? "Current Running Plan(Purchase Again)"
                                : "Purchase Plan"}
                          </button>
                        </DialogClose>}
                      </DialogContent>
                    </Dialog>
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
              )
            })}
          </div>

          <div className="p-4">
          <div className="overflow-x-auto rounded-lg border border-gray-100">
            <table className="w-full border-collapse">
              <caption className={`p-4 text-lg font-semibold ${isDarkMode ? "text-gray-300" : "text-black"}`}>
                Investment Plans
              </caption>
              <thead>
                <tr className={`border-b ${isDarkMode ? "border-gray-700" : "border-gray-300"} bg-gray-100 dark:bg-gray-800`}>
                  {['Date', 'Status', 'Investment Plan', 'Amount'].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-200"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan={4} className={`px-6 py-4 ${isDarkMode ? "text-gray-300" : "text-black"}`}>
                      No Investment History Available
                    </td>
                  </tr>
                ) : (
                  data.map((plan, index) => (
                    <tr
                      key={index}
                      className={`border-b ${isDarkMode ? "border-gray-300 hover:bg-gray-950" : "border-gray-300 hover:bg-gray-100"} transition-all`}
                    >
                      <td className={`px-6 py-4 ${isDarkMode ? "text-gray-300" : "text-black"}`}>{plan?.initializedAt}</td>
                      <td className="px-6 py-4">
                        <span
                          className="inline-block rounded-full px-4 py-1 text-sm font-semibold text-white"
                          style={{ backgroundColor: getStatusColor(plan?.status) }}
                        >
                          {plan?.status}
                        </span>
                      </td>
                      <td className={`px-6 py-4 ${isDarkMode ? "text-gray-300" : "text-black"}`}>{plan?.plan}</td>
                      <td className={`px-6 py-4 ${isDarkMode ? "text-gray-300" : "text-black"}`}>{plan?.amount}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          </div>
        </>
      )}
    </>
  );
}
