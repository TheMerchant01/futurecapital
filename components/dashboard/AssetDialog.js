import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useTheme } from "../../contexts/themeContext";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useUserData } from "../../contexts/userrContext";
import Link from "next/link";
import axios from "axios";
import { InfinitySpin } from "react-loader-spinner";
import toast from "react-hot-toast";
import { DialogContent } from "../ui/dialog";
import { useRouter } from "next/navigation";

export default function AssetDialog({
  stake,
  minimum,
  image,
  symbol,
  name,
  price,
  duration,
}) {
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const { details, setDetails, setNotification } = useUserData();
  const [error, setError] = useState();
  const [showError, setShowError] = useState();
  const [amount, setAmount] = useState();
  const [percentage, setPercentage] = useState(0);
  const [month, setMonth] = useState(0);
  const [loading, isloading] = useState(false);
  const roi = amount + (percentage * month * amount) / 100;
  const amountperMonth = (roi / month).toFixed(2);
  const stakeEquivalent = (amount / parseFloat(price)).toFixed(3);
  const balance = (
    parseFloat(details.tradingBalance) / parseFloat(price)
  ).toFixed(3);
  const handleChange = (value) => {
    setShowError(false);
    const numericValue = Number(value);

    if (numericValue > details.tradingBalance) {
      setShowError(true);
      setAmount(numericValue);
      setError("Staking amount exceeds balance");
    } else if (numericValue < minimum) {
      setShowError(true);
      setError("Staking amount is below minimum stake");
      setAmount(numericValue);
    } else {
      setAmount(numericValue);
    }
  };
  useEffect(() => {
    if (amount > details.tradingBalance) {
      setShowError(true);
      setError("Staking amount exceeds balance");
    }
  }, [amount, details.tradingBalance]);

  const getPercentageByMonths = (data, months) => {
    const entry = data.find((item) => item.months === months);

    setPercentage(entry.percentage);
    setMonth(entry.months);
  };

  const handleStaking = async () => {
    const email = details.email;
    const stakings = {
      id: stake.id + crypto.randomUUID(),
      stakedAsset: stake.coinName,
      stakedAssetImagePath: stake.imagePath,
      stakedAssetSymbol: stake.coinSymbol,
      stakeEquivalent,
      dateStaked: Date.now(),
      stakedAmount: amount,
      monthlyReturns: amountperMonth,
      totalReturns: roi,
      stakedDuration: month,
      status: "ongoing",
      lastPaid: new Date(),
    };
    isloading(true);
    try {
      const response = await axios.post("/db/Staking/", {
        email,
        stakings,
        amount,
      });
      console.log(response);
      if (response.status === 200) {
        setDetails((prevDeets) => ({
          ...prevDeets,
          tradingBalance: prevDeets.tradingBalance - amount,
          stakings: [...prevDeets.stakings, stakings],
        }));
        setNotification(
          `Your staking of ${stakeEquivalent} ${symbol} has been processed`,

          "transaction",
          "success"
        );
        toast.success(`${stakeEquivalent} ${symbol} staked successfully`, {
          duration: 4000,
        });
        setAmount(0);
        router.push("/dashboard/stake/mystakings");
      }
      console.log(details.stakings);
      isloading(false);
    } catch (error) {
      console.log(error);
      isloading(false);
    }
  };

  return (
    <div className={`${isDarkMode ? "textwhite" : ""}`}>
      <div className="header-section flex gap-x-2 items-center justify-between">
        <div className="header-section flex gap-x-3 items-center">
          <div className="image rounded-full overflow-hidden">
            <Image
              alt=""
              src={image}
              width={1000}
              height={1000}
              className="w-11 h-11"
            />
          </div>
          <div className="description">
            <div className="bigtext text-lg font-semibold">{name}</div>
            <div className="smalltext font-bold opacity-60 text-sm">
              {symbol}
            </div>
          </div>
        </div>

        <div className="price">
          {" "}
          <div
            className={`${
              isDarkMode ? "/bg-[#222] text-white" : "/bg-black/10"
            } font-bold text-sm p-2 rounded-sm`}
          >
            1 {symbol} ~ {price}
          </div>
        </div>
      </div>
      <div
        className={`demacator mt-3 rounded-full w-1/2 mx-auto h-0.5 px-10 ${
          isDarkMode ? "bg-[#222]" : "bg-black/10"
        }`}
      ></div>
      <div className="form-section mt-6">
        <div className="amount-form">
          <label htmlFor="amount" className="text-sm font-bold pb-4">
            Staking Amount (USD)
          </label>
          <Input
            id="amount"
            type="number"
            value={amount === 0 ? "" : amount}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Enter amount to stake"
            className={`mt-2 text-sm rounded-sm h-12 ${
              isDarkMode ? " bg-[#222] text-white border-white/5" : ""
            }`}
          />
        </div>
        <div
          className={`font-bold mt-3 text-sm /md:flex /items-center gap-x-2`}
        >
          <div>
            {" "}
            Balance: {details !== 0 && balance} {symbol}{" "}
            <Link
              href="/dashboard/deposits"
              className={`rounded py-1 px-2 pr-2 ${
                isDarkMode ? "bg-[#222]" : "bg-black/5"
              }`}
            >
              Deposit
            </Link>
          </div>
          {showError && <div className="text-red-500 mt-2 ">{error}</div>}
        </div>
        <div className="flex items-center gap-x-3 w-full">
          {" "}
          <div className="duration mt-4 w-full">
            <label htmlFor="duration" className="text-sm font-bold pb-4">
              Staking Duration
            </label>
            <Select
              onValueChange={(value) => getPercentageByMonths(duration, value)}
            >
              <SelectTrigger
                className={`h-12 mt-2 rounded-sm  ${
                  isDarkMode ? "bg-[#222] border-white/5" : ""
                }`}
              >
                <SelectValue placeholder="Select a duration" />
              </SelectTrigger>
              <SelectContent
                className={`rounded-sm ${
                  isDarkMode ? "bg-[#222] text-white border-white/5" : ""
                }`}
              >
                {duration.map((d) => (
                  <SelectItem
                    key={d.months}
                    value={d.months}
                    className="font-bold py-2 capitalize"
                  >
                    {d.months} months
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="monthly-form mt-4 w-full">
            <label htmlFor="monthly" className="text-sm font-bold pb-4">
              Return per cycle
            </label>
            <Input
              id="monthly"
              readOnly
              value={`${percentage ? amountperMonth : "0"} per months`}
              className={`mt-2 w-full text-sm rounded-sm h-12 ${
                isDarkMode ? " bg-[#222] text-white border-white/5" : ""
              }`}
            />
          </div>
        </div>

        <div className="flex items-center gap-x-3 w-full justify-stretch">
          <div className="roi-form mt-4 w-full">
            <label htmlFor="roi" className="text-sm font-bold pb-4">
              ROI (USD)
            </label>
            <Input
              id="amount"
              readOnly
              value={roi}
              className={`mt-2 w-full text-sm rounded-sm h-12 ${
                isDarkMode ? " bg-[#222] text-white border-white/5" : ""
              }`}
            />
          </div>
          <div className="roi-form mt-4 w-full">
            <label htmlFor="roi" className="text-sm font-bold pb-4">
              Staking Equivalent
            </label>
            <Input
              id="amount"
              readOnly
              value={`${stakeEquivalent} ${symbol}`}
              className={`mt-2 w-full text-sm rounded-sm h-12 ${
                isDarkMode ? " bg-[#222] text-white border-white/5" : ""
              }`}
            />
          </div>
        </div>

        <div
          className={` text-sm rounded-sm border p-2 mt-3 ${
            isDarkMode ? "text-white/60 border-white/5" : "text-black/60"
          }`}
        >
          <p>
            Staking results in an estimated{" "}
            <span
              className={`font-bold ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              {percentage}% RPC (Return Per Cycle)
            </span>{" "}
            for{" "}
            <span
              className={`font-bold ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              {symbol}
            </span>
          </p>
        </div>
        <div
          className={` text-sm rounded-sm border p-2 mt-3 ${
            isDarkMode ? "text-white/60 border-white/5" : "text-black/60"
          }`}
        >
          <p>
            Your staking period will end in{" "}
            <span
              className={`font-bold ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              {month} month(s)
            </span>{" "}
            . Your earnings will be sent to your live {symbol} account.
          </p>
        </div>

        <button
          onClick={() => handleStaking()}
          disabled={percentage === 0 || amount === 0 || showError}
          className={`btn  font-bold disabled:cursor-not-allowed  text-sm text-white ${
            !loading ? "py-3" : ""
          } rounded-sm w-full text-center  mt-3 ${
            percentage === 0 || amount === 0 || showError
              ? "bg-muted-foreground"
              : " bg-[#0066b1]"
          }`}
        >
          {!loading && (
            <>
              Stake {stakeEquivalent} {symbol}{" "}
            </>
          )}
          {loading && (
            <div className="w-full flex items-center justify-center">
              <InfinitySpin color="white" width="100" />
            </div>
          )}
        </button>
      </div>
    </div>
  );
}

{
  /* <div
            className={`p-0.5 ${
              isDarkMode ? "bg-[#333]" : "bg-black/20"
            } w-1 h-1 rounded-full`}
          ></div> */
}
{
  /* <div className="text-red-500 mt-2 ">
            Amount exceeds available balance
          </div> */
}
