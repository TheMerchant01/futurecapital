"use client";
import React, { useState } from "react";
import { useTheme } from "../../../contexts/themeContext";
import { Input } from "../../ui/input";
import { copyTraders } from "./traders";
import Image from "next/image";
import { FlagIcon } from "react-flag-kit";
import toast from "react-hot-toast";
import { useUserData } from "../../../contexts/userrContext";
import axios from "axios";

export default function Copy() {
  const { isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedTraders, setCopiedTraders] = useState([]);
  const [copying, setCopying] = useState(false);
  const { details, setDetails, email } = useUserData();
  const [amount, setAmount] = useState("");
  const [selectedTrader, setSelectedTrader] = useState(null);

  const handleCopyTrader = async () => {
    if (!selectedTrader) return;

    const { minPrice, maxPrice, id: traderId } = selectedTrader;
    const enteredAmount = parseFloat(amount);

    if (
      isNaN(enteredAmount) ||
      enteredAmount < minPrice ||
      enteredAmount > maxPrice
    ) {
      toast.error(`Amount must be between $${minPrice} and $${maxPrice}`);
      return;
    }

    if (isNaN(enteredAmount) || enteredAmount > details.tradingBalance) {
      toast.error(`Insufficient Balance`);
      return;
    }

    // // Check if you are currently copying a trader.
    // if (details.isCopyTrading && !details.tradersCopying.includes(traderId)) {
    //   // If copying is in progress, you cannot copy another trader.
    //   toast.error("Sorry! You can't copy more than 1 trader");
    //   return;
    // }

    try {
      setCopying(true);

      // Calculate new balance locally first
      const newBalance = details.tradingBalance - enteredAmount;
      const newInvBalance = details.investmentBalance + enteredAmount;

      // Update API call to explicitly include the new balance
      const response = await axios.post("/db/copytraders", {
        email,
        updatedData: {
          isCopyTrading: !details.isCopyTrading,
          tradersCopying: details.tradersCopying.includes(traderId)
            ? details.tradersCopying.filter((id) => id !== traderId)
            : [...details.tradersCopying, traderId],
          tradingBalance: newBalance, // Explicitly send new balance to backend
          investmentBalance: newInvBalance,
        },
        amount: enteredAmount,
      });

      // Log the response to verify what the server is returning
      console.log("Server response:", response.data);

      // Update state with server-confirmed values
      setDetails((prevDetails) => ({
        ...prevDetails,
        tradingBalance: newBalance, // Use server value
        investmentBalance: newInvBalance,
        isCopyTrading: response.data.user.isCopyTrading,
        tradersCopying: response.data.user.tradersCopying,
        totalDeposited: response.data.user.totalDeposited,
      }));

      toast.success(response.data.message);
      setSelectedTrader(null);
      setAmount("");
    } catch (error) {
      console.error("Internal Server Error:", error);
      toast.error("Internal Server Error");
    }
    setCopying(false);
  };

  // Filter traders based on the search query
  const filteredTraders = copyTraders
    .map((trader) => ({
      ...trader,
      isCopied: copiedTraders.includes(trader.id),
    }))
    .filter((trader) =>
      trader.nickname.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => (a.isCopied === b.isCopied ? 0 : a.isCopied ? -1 : 1));

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <>
      {details !== 0 && (
        <div className="pt-4 px-4 ">
          <div className="title-region">
            {" "}
            <div
              className={`${isDarkMode ? "text-white" : "text-black"} text-sm`}
            >
              <h1 className="text-xl mt-2 font-bold mb-2 capitalize">
                Copy expert traders
              </h1>
              <p className={`${isDarkMode ? "text-white/80" : ""}`}>
                Copy expert traders from all over the world and enhance your
                investment portfolio.
              </p>
            </div>
          </div>
          <div className="input-region">
            <div
              className={`rounded-md mt-5 flex items-center px-3 capitalize w-full ${
                isDarkMode
                  ? "bg-[#222] border border-white/10 text-white"
                  : "bg-black/5"
              }`}
            >
              <Input
                type="text"
                onChange={handleSearchInputChange}
                placeholder="Search expert traders"
                className="bg-transparent font-bold border-0 h-12 ring-0 hover:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-0"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 opacity-50"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="traders-region mt-6">
            <div className="grid grid-cols-1 w-full md:grid-cols-2 lg:grid-cols-3 gap-4">
              {" "}
              {filteredTraders.map((traders) => (
                <>
                  <div
                    className={`border w-full p-3 relative rounded-md ${
                      isDarkMode
                        ? "text-white border border-white/5 bg-[#111]"
                        : "text-black/90"
                    }`}
                  >
                    <div className="flag absolute top-2 right-2">
                      <div
                        className={`rounded-sm p-3 ${
                          isDarkMode ? "bg-[#222]" : "bg-black/5"
                        }`}
                      >
                        <FlagIcon size={21} code={traders.country} />
                      </div>
                    </div>
                    <div className="image-region overflow-hidden flex justify-center w-full">
                      <div className="img-container w-20 h-20 rounded-full overflow-hidden">
                        {" "}
                        <Image
                          alt=""
                          src={traders.image}
                          width={1000}
                          height={1000}
                          className=""
                        />
                      </div>
                    </div>
                    <div className="trader-name font-bold text-center capitalize text-xl mt-4 justify-center items-center flex">
                      <div>{traders.nickname}</div>
                      {traders.verified && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5 ml-1 text-[#0066b1]"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>

                    <div
                      className={`location flex items-center gap-x-1 mt-2 justify-center ${
                        isDarkMode ? "text-white/30" : "text-black/30"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <div className="text-sm font-bold">
                        {traders.location}
                      </div>
                    </div>
                    <div
                      className={`key-items mt-2 flex gap-x-3 justify-center items-center ${
                        isDarkMode ? "text-white/80" : "text-black/70"
                      }`}
                    >
                      <div
                        className={`totalTrades flex items-center p-2 rounded-sm ${
                          isDarkMode ? "bg-[#222]" : "bg-black/5"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-4 h-4"
                        >
                          <path d="M10 9a3 3 0 100-6 3 3 0 000 6zM6 8a2 2 0 11-4 0 2 2 0 014 0zM1.49 15.326a.78.78 0 01-.358-.442 3 3 0 014.308-3.516 6.484 6.484 0 00-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 01-2.07-.655zM16.44 15.98a4.97 4.97 0 002.07-.654.78.78 0 00.357-.442 3 3 0 00-4.308-3.517 6.484 6.484 0 011.907 3.96 2.32 2.32 0 01-.026.654zM18 8a2 2 0 11-4 0 2 2 0 014 0zM5.304 16.19a.844.844 0 01-.277-.71 5 5 0 019.947 0 .843.843 0 01-.277.71A6.975 6.975 0 0110 18a6.974 6.974 0 01-4.696-1.81z" />
                        </svg>
                        <div className="number font-bold text-xs ml-1 ">
                          {(traders.followers / 1e3).toFixed(1)}k
                        </div>
                      </div>
                      <div
                        className={`totalTrades flex items-center p-2 rounded-sm ${
                          isDarkMode ? "bg-[#222]" : "bg-black/5"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.5 3.528v4.644c0 .729-.29 1.428-.805 1.944l-1.217 1.216a8.75 8.75 0 013.55.621l.502.201a7.25 7.25 0 004.178.365l-2.403-2.403a2.75 2.75 0 01-.805-1.944V3.528a40.205 40.205 0 00-3 0zm4.5.084l.19.015a.75.75 0 10.12-1.495 41.364 41.364 0 00-6.62 0 .75.75 0 00.12 1.495L7 3.612v4.56c0 .331-.132.649-.366.883L2.6 13.09c-1.496 1.496-.817 4.15 1.403 4.475C5.961 17.852 7.963 18 10 18s4.039-.148 5.997-.436c2.22-.325 2.9-2.979 1.403-4.475l-4.034-4.034A1.25 1.25 0 0113 8.172v-4.56z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div className="number font-bold text-xs ml-1 ">
                          {traders.maxDrawdown}
                        </div>
                      </div>
                      {/* <div
                    className={`totalTrades flex items-center p-2 rounded-sm ${
                      isDarkMode ? "bg-[#222]" : ""
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1 2.75A.75.75 0 011.75 2h16.5a.75.75 0 010 1.5H18v8.75A2.75 2.75 0 0115.25 15h-1.072l.798 3.06a.75.75 0 01-1.452.38L13.41 18H6.59l-.114.44a.75.75 0 01-1.452-.38L5.823 15H4.75A2.75 2.75 0 012 12.25V3.5h-.25A.75.75 0 011 2.75zM7.373 15l-.391 1.5h6.037l-.392-1.5H7.373zm7.49-8.931a.75.75 0 01-.175 1.046 19.326 19.326 0 00-3.398 3.098.75.75 0 01-1.097.04L8.5 8.561l-2.22 2.22A.75.75 0 115.22 9.72l2.75-2.75a.75.75 0 011.06 0l1.664 1.663a20.786 20.786 0 013.122-2.74.75.75 0 011.046.176z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="number font-bold text-xs ml-1 ">
                      {traders.winRate}%
                    </div>
                  </div> */}
                      <div
                        className={`totalTrades flex items-center p-2 rounded-sm ${
                          isDarkMode ? "bg-[#222]" : "bg-black/5"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-5 h-5 text-red-600"
                        >
                          <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
                        </svg>

                        <div className="number font-bold text-xs ml-1 ">
                          {traders.favoriteStock}
                        </div>
                      </div>
                    </div>
                    <div className="other-deets grid grid-cols-2 gap-x-2 mt-2">
                      <div
                        className={`winrate flex items-center justify-between p-3 rounded-sm mt-2 ${
                          isDarkMode
                            ? "bg-[#2222225c] text-white/70"
                            : "bg-black/5 text-black/70"
                        }`}
                      >
                        <div className={`flex items-center gap-x-2`}>
                          {/* <div className="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div> */}
                          <div className="name font-bold text-sm">
                            Total trades
                          </div>
                        </div>
                        <div className={`font-bold text-sm`}>
                          {traders.totalTrades}
                        </div>
                      </div>
                      <div
                        className={`winrate flex items-center justify-between p-3 rounded-sm mt-2 ${
                          isDarkMode
                            ? "bg-[#2222225c] text-white/70"
                            : "bg-black/5 text-black/70"
                        }`}
                      >
                        <div className={`flex items-center gap-x-2`}>
                          {/* <div className="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M1.22 5.222a.75.75 0 011.06 0L7 9.942l3.768-3.769a.75.75 0 011.113.058 20.908 20.908 0 013.813 7.254l1.574-2.727a.75.75 0 011.3.75l-2.475 4.286a.75.75 0 01-1.025.275l-4.287-2.475a.75.75 0 01.75-1.3l2.71 1.565a19.422 19.422 0 00-3.013-6.024L7.53 11.533a.75.75 0 01-1.06 0l-5.25-5.25a.75.75 0 010-1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div> */}
                          <div className="name font-bold text-sm">
                            Total loss
                          </div>
                        </div>
                        <div className={`font-bold text-sm`}>
                          {traders.losses}
                        </div>
                      </div>
                      <div
                        className={`winrate flex items-center justify-between p-3 rounded-sm mt-3 ${
                          isDarkMode
                            ? "bg-[#2222225c] text-white/70"
                            : "bg-black/5 text-black/70"
                        }`}
                      >
                        <div className={`flex items-center gap-x-2`}>
                          {/* <div className="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div> */}
                          <div className="name font-bold text-sm">
                            Profit share
                          </div>
                        </div>
                        <div className={`font-bold text-sm`}>
                          {traders.profitShare}%
                        </div>
                      </div>
                      <div
                        className={`winrate flex items-center justify-between p-3 rounded-sm mt-3 ${
                          isDarkMode
                            ? "bg-[#2222225c] text-white/70"
                            : "bg-black/5 text-black/70"
                        }`}
                      >
                        <div className={`flex items-center gap-x-2`}>
                          {/* <div className="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div> */}
                          <div className="name font-bold text-sm">Win rate</div>
                        </div>
                        <div className={`font-bold text-sm`}>
                          {traders.winRate}%
                        </div>
                      </div>
                    </div>
                    <div
                      className="btn flex justify-center mt-8"
                      onClick={() => setSelectedTrader(traders)}
                    >
                      <button
                        className={`${
                          isDarkMode ? "text-white" : "text-black/90"
                        } rounded-md px-4 py-3 text-sm font-bold ${
                          details.tradersCopying.includes(traders.id)
                            ? "bg-orange-600 text-white"
                            : copying
                            ? isDarkMode
                              ? "bg-[#2826264f] cursor-not-allowed"
                              : "bg-black/5 cursor-not-allowed"
                            : "bg-[#0066b1] text-white"
                        }  `}
                      >
                        {details.tradersCopying.includes(traders.id)
                          ? "Copy Again "
                          : copying
                          ? "Please wait"
                          : "Copy Trader Strategy"}
                      </button>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedTrader && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              Copy {selectedTrader.nickname}
            </h2>
            <p>
              Min Amount: ${selectedTrader.minPrice} | Max Amount: $
              {selectedTrader.maxPrice}
            </p>
            <input
              type="number"
              className="w-full p-2 mt-2 border rounded"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded"
                onClick={() => setSelectedTrader(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleCopyTrader}
                disabled={copying}
              >
                {copying ? "Processing..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
