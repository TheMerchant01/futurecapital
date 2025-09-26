"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { useRouter } from "next/navigation";
import { InfinitySpin } from "react-loader-spinner";
import toast from "react-hot-toast";

export default function UserDeets({ data }) {
  const router = useRouter();
  // Ensure that the email is passed correctly
  const email_refined = data.replace("%40", "@");

  // State variables for user details
  const [name, setName] = useState("");
  const [email, setEmail] = useState(email_refined);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [withdrawalPin, setWithdrawalPin] = useState("");
  const [taxCodePin, setTaxCodePin] = useState("");
  const [autoTrades, setAutoTrades] = useState(false); // Default to false
  const [isVerified, setIsVerified] = useState(false); // Default to false
  const [investmentBalance, setInvestmentBalance] = useState("");
  const [tradingBalance, setTradingBalance] = useState("");
  const [totalDeposited, setTotalDeposited] = useState("");
  const [totalWithdrawn, setTotalWithdrawn] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [totalAssets, setTotalAssets] = useState("");
  const [totalWon, setTotalWon] = useState("");
  const [totalLoss, setTotalLoss] = useState("");
  const [lastProfit, setLastProfit] = useState("");
  const [planBonus, setPlanBonus] = useState("");
  const [tradingProgress, setTradingProgress] = useState("");
  const [upgraded, setUpgraded] = useState(false);
  const [trade, setTrade] = useState("");
  // const [investmentPackage, setInvestmentPackage] = useState("");
  const [loading, isloading] = useState(false);

  // State for handling form submission
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    isloading(true);

    e.preventDefault();
    // Create an object with updated user detail
    // Make an Axios request to update user details on the server
    try {
      const response = await axios.post("/db/updateUser/api", {
        name,
        email: email_refined,
        phone,
        password,
        withdrawalPin,
        taxCodePin,
        autoTrades,
        isVerified,
        tradingBalance,
        investmentBalance,
        totalDeposited,
        totalWithdrawn,
        totalAssets,
        totalWon,
        totalLoss,
        lastProfit,
        // investmentPackage,
        planBonus,
        tradingProgress,
        customMessage,
        upgraded,
        trade
      });
      if (response.status === 200) {
        setFormSubmitted(true);
        toast.success("Information updated successfully");
        router.replace("/admin");
        isloading(false);
      }
    } catch (error) {
      isloading(false);
      console.error("Error updating user details:", error);
    }
  };

  useEffect(() => {
    isloading(true);
    const fetchingDeets = async () => {
      try {
        const response = await axios.post("/fetching/fetchAllDetails", {
          email: email_refined,
        });
        const fetchedDetails = response.data;

        isloading(false);
        // Update state with fetched details
        setName(fetchedDetails.name);
        setEmail(fetchedDetails.email);
        setPhone(fetchedDetails.phone);
        setPassword(fetchedDetails.password);
        setWithdrawalPin(fetchedDetails.withdrawalPin);
        setTaxCodePin(fetchedDetails.taxCodePin);
        setAutoTrades(fetchedDetails.autoTrades);
        setIsVerified(fetchedDetails.isVerified);
        setTradingBalance(fetchedDetails.tradingBalance);
        setInvestmentBalance(fetchedDetails.investmentBalance);
        setTotalDeposited(fetchedDetails.totalDeposited);
        setTotalWithdrawn(fetchedDetails.totalWithdrawn);
        setTotalAssets(fetchedDetails.totalAssets);
        setTotalWon(fetchedDetails.totalWon);
        setTotalLoss(fetchedDetails.totalLoss);
        setLastProfit(fetchedDetails.lastProfit);
        setPlanBonus(fetchedDetails.planBonus);
        setUpgraded(fetchedDetails.upgraded);
        // setInvestmentPackage(fetchedDetails.investmentPackage);
        setTradingProgress(fetchedDetails.tradingProgress);
        setCustomMessage(fetchedDetails.customMessage);
        setTrade(fetchedDetails.trade);
      } catch (err) {
        // Handle any errors that occur during the request
        console.error("Error fetching user details:", err);
        isloading(false);
      }
    };
    fetchingDeets();
  }, [email_refined]);

  return (
    <div className="px-4 mt-20">
      <div className="settings px-3 py-4 rounded-md shadow-md shadow-gray-100">
        <div className="profile font-bold">User settings</div>
        <div className="email flex items-center gap-x-1 bg-gray-50 p-2 rounded-md mt-2">
          <div className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4 text-red-700/80"
            >
              <path
                fillRule="evenodd"
                d="M5.404 14.596A6.5 6.5 0 1116.5 10a1.25 1.25 0 01-2.5 0 4 4 0 10-.571 2.06A2.75 2.75 0 0018 10a8 8 0 10-2.343 5.657.75.75 0 00-1.06-1.06 6.5 6.5 0 01-9.193 0zM10 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="email_title text-sm font-bold">{email_refined}</div>
        </div>
      </div>

      <div className="user_form_section mt-8 px-4 py-3 shadow-md rounded-md shadow-gray-200">
        <form onSubmit={handleSubmit} className="user-form">
          {loading ? (
            <div className="w-full  flex my-5 justify-center items-center font-bold">
              <InfinitySpin width="100" color="red" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="name"
                    className="block text-sm font-bold text-gray-700"
                  >
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name"
                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-sm text-black"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold text-gray-700"
                  >
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-sm text-black"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-bold text-gray-700"
                  >
                    Phone:
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone"
                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-sm text-black"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-bold text-gray-700"
                  >
                    Password:
                  </label>
                  <input
                    type="text"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-sm text-black"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="withdrawalPin"
                    className="block text-sm font-bold text-gray-700"
                  >
                    Withdrawal Pin:
                  </label>
                  <input
                    type="text"
                    id="withdrawalPin"
                    value={withdrawalPin}
                    onChange={(e) => setWithdrawalPin(e.target.value)}
                    placeholder="Enter withdrawal pin"
                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-sm text-black"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="taxCodePin"
                    className="block text-sm font-bold text-gray-700"
                  >
                    Tax Code Pin:
                  </label>
                  <input
                    type="text"
                    id="taxCodePin"
                    value={taxCodePin}
                    onChange={(e) => setTaxCodePin(e.target.value)}
                    placeholder="Enter tax code pin"
                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-sm text-black"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="autoTrades"
                    className="block text-sm font-bold text-gray-700"
                  >
                    Auto Trades:
                  </label>
                  <select
                    id="autoTrades"
                    value={autoTrades ? "true" : "false"}
                    onChange={(e) => setAutoTrades(e.target.value === "true")}
                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-sm text-black"
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="isVerified"
                    className="block text-sm font-bold text-gray-700"
                  >
                    Is Verified:
                  </label>
                  <select
                    id="isVerified"
                    value={isVerified ? "true" : "false"}
                    onChange={(e) => setIsVerified(e.target.value === "true")}
                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-sm text-black"
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="tradingBalance"
                    className="block text-sm font-bold text-gray-700"
                  >
                    Trading Balance:
                  </label>
                  <input
                    type="text"
                    id="tradingBalance"
                    value={tradingBalance}
                    onChange={(e) => setTradingBalance(e.target.value)}
                    placeholder="Enter trading balance"
                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-sm text-black"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="investmentBalance"
                    className="block text-sm font-bold text-gray-700"
                  >
                    Investment Balance:
                  </label>
                  <input
                    type="text"
                    id="investmentBalance"
                    value={investmentBalance}
                    onChange={(e) => setInvestmentBalance(e.target.value)}
                    placeholder="Enter investment balance"
                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-sm text-black"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="totalDeposited"
                    className="block text-sm font-bold text-gray-700"
                  >
                    Total Deposited:
                  </label>
                  <input
                    type="text"
                    id="totalDeposited"
                    value={totalDeposited}
                    onChange={(e) => setTotalDeposited(e.target.value)}
                    placeholder="Enter total deposited"
                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-sm text-black"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="totalWithdrawn"
                    className="block text-sm font-bold text-gray-700"
                  >
                    Total Withdrawn:
                  </label>
                  <input
                    type="text"
                    id="totalWithdrawn"
                    value={totalWithdrawn}
                    onChange={(e) => setTotalWithdrawn(e.target.value)}
                    placeholder="Enter total withdrawn"
                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-sm text-black"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="totalAssets"
                    className="block text-sm font-bold text-gray-700"
                  >
                    Total Assets:
                  </label>
                  <input
                    type="text"
                    id="totalAssets"
                    value={totalAssets}
                    onChange={(e) => setTotalAssets(e.target.value)}
                    placeholder="Enter total assets"
                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-sm text-black"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="totalWon"
                    className="block text-sm font-bold text-gray-700"
                  >
                    Total Won:
                  </label>
                  <input
                    type="text"
                    id="totalWon"
                    value={totalWon}
                    onChange={(e) => setTotalWon(e.target.value)}
                    placeholder="Enter total won"
                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-sm text-black"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="totalLoss"
                    className="block text-sm font-bold text-gray-700"
                  >
                    Total Loss:
                  </label>
                  <input
                    type="text"
                    id="totalLoss"
                    value={totalLoss}
                    onChange={(e) => setTotalLoss(e.target.value)}
                    placeholder="Enter total loss"
                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-sm text-black"
                  />
                </div>
                {/* <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="investmentPackage"
                    className="block text-sm font-bold text-gray-700"
                  >
                    Investment Package:
                  </label>
                  <select
                    id="investmentPackage"
                    value={investmentPackage}
                    onChange={(e) => setInvestmentPackage(e.target.value)}
                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-sm text-black"
                  >
                    <option value="bronze plan">Bronze Plan</option>
                    <option value="silver plan">Silver Plan</option>
                    <option value="gold plan">Gold Plan</option>
                    <option value="premium plan">Premium Plan</option>
                  </select>
                </div> */}
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="planBonus"
                    className="block text-sm font-bold text-gray-700"
                  >
                    Plan Bonus
                  </label>
                  <input
                    type="text"
                    id="planBonus"
                    value={planBonus}
                    onChange={(e) => setPlanBonus(e.target.value)}
                    placeholder="Enter Plan Bonus"
                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-sm text-black"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="planBonus"
                    className="block text-sm font-bold text-gray-700"
                  >
                    Trading Progress (1 - 100)
                  </label>
                  <input
                    type="text"
                    id="planBonus"
                    value={tradingProgress}
                    onChange={(e) => setTradingProgress(e.target.value)}
                    placeholder="Enter Trading Progress"
                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-sm text-black"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="investmentPackage"
                    className="block text-sm font-bold text-gray-700"
                  >
                    Last Profit
                  </label>
                  <input
                    type="text"
                    id="investmentPackage"
                    value={lastProfit}
                    onChange={(e) => setLastProfit(e.target.value)}
                    placeholder="Enter investment package"
                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-sm text-black"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="trade"
                    className="block text-sm font-bold text-gray-700"
                  >
                    Trade
                  </label>
                  <input
                    type="text"
                    id="trade"
                    value={trade}
                    onChange={(e) => setTrade(e.target.value)}
                    placeholder="Enter Trade"
                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-sm text-black"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="customMessage"
                    className="block text-sm font-bold text-gray-700"
                  >
                    Custom Message:
                  </label>
                  <input
                    type="text"
                    id="customMessage"
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder="Enter message to show user"
                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-sm text-black"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1 mt-4">
                  <label
                    htmlFor="upgraded"
                    className="block text-sm font-bold text-gray-700"
                  >
                    Upgraded:
                  </label>
                  <select
                    id="upgraded"
                    value={upgraded}
                    onChange={(e) => setUpgraded(e.target.value === "true")}
                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-sm text-black"
                  >
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <Button
            type="submit"
            className="mt-4  text-white w-full font-bold  rounded-md p-3"
          >
            {loading ? "Please Wait..." : "Save Changes"}
          </Button>
        </form>
      </div>
    </div>
  );
}
