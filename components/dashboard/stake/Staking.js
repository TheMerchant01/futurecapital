"use client";
import React, { useState } from "react";
import { useTheme } from "../../../contexts/themeContext";
import { Input } from "../../ui/input";
import { stakingOptions } from "./stake";
import Image from "next/image";
import { useUserData } from "../../../contexts/userrContext";
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";
import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog";
import AssetDialog from "../AssetDialog";

export default function Staking() {
  const { isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  const { details, cryptoPrices } = useUserData();
  const filterStaking = stakingOptions.filter((trader) =>
    trader.coinName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <div className="">
      <div className="searchbar">
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
              placeholder="Search Crypto Pool"
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

        <div className={`${isDarkMode ? "text-white" : ""}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-3">
            {filterStaking.map((stake) => (
              <>
                <div
                  className={` p-4 rounded-sm border ${
                    isDarkMode ? "bg-[#111] border-white/5" : "bg-black/5"
                  }`}
                >
                  <div className="header-section flex gap-x-2 items-center justify-between">
                    <div className="header-section flex gap-x-3 items-center">
                      <div className="image rounded-full overflow-hidden">
                        <Image
                          alt=""
                          src={stake.imagePath}
                          width={1000}
                          height={1000}
                          className="w-11 h-11"
                        />
                      </div>
                      <div className="description">
                        <div className="bigtext text-lg font-semibold">
                          {stake.coinName}
                        </div>
                        <div className="smalltext font-bold opacity-60 text-sm">
                          {stake.coinSymbol}
                        </div>
                      </div>
                    </div>

                    <div className="price">
                      {" "}
                      <div
                        className={`border ${
                          isDarkMode
                            ? "bg-[#222] text-white border-white/5"
                            : "bg-black/5"
                        } font-bold text-sm py-1 px-2 rounded-sm`}
                      >
                        $
                        {details !== 0 &&
                          cryptoPrices[
                            stake.coinName.replace(/ /g, "-").toLowerCase()
                          ].usd.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="detail-section mt-5">
                    {/* <div className="text-sm font-bold"> Details</div> */}

                    <div className="deet-cont grid grid-cols-3 gap-x-3 md:grid-cols-2 md:gap-3 lg:grid-cols-3  mt-2">
                      <div
                        className={`${
                          isDarkMode
                            ? "bg-[#222] border border-white/5"
                            : "bg-[#00000009] border"
                        } rounded-sm p-3 /text-center`}
                      >
                        <p className={`font-bold text-sm `}>Minimum</p>
                        <p className="text-sm font-bold opacity-80">
                          ${stake.minimum}
                        </p>
                      </div>
                      <div
                        className={`${
                          isDarkMode
                            ? "bg-[#222] border border-white/5"
                            : "bg-[#00000009] border"
                        } rounded-sm p-3 /text-center`}
                      >
                        <p className={`font-bold text-sm `}>ROI</p>
                        <p className="text-sm font-bold opacity-80">
                          {stake.percentageRage}
                        </p>
                      </div>
                      <div
                        className={`${
                          isDarkMode
                            ? "bg-[#222] border border-white/5"
                            : "bg-[#00000009] border"
                        } rounded-sm p-3 /text-center`}
                      >
                        <p className={`font-bold text-sm `}>Cycle</p>
                        <p className="text-sm font-bold opacity-80">
                          {stake.cycle}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="btn-section mt-5">
                    <Dialog className={`${isDarkMode ? "bg-[#111]" : ""}`}>
                      <DialogTrigger className="w-full">
                        <div className="btn rounded-sm cursor-pointer text-white bg-[#0066b1] w-full py-3 text-center font-bold text-sm">
                          Stake {stake.coinName}
                        </div>
                      </DialogTrigger>
                      <DialogContent
                        side="bottom"
                        className={`${
                          isDarkMode
                            ? "bg-[#111] border-white/5 text-white"
                            : ""
                        }`}
                      >
                        <AssetDialog
                          stake={stake}
                          minimum={stake.minimum}
                          name={stake.coinName}
                          symbol={stake.coinSymbol}
                          image={stake.imagePath}
                          price={
                            details !== 0 &&
                            cryptoPrices[
                              stake.coinName.replace(/ /g, "-").toLowerCase()
                            ].usd
                              .toLocaleString()
                              .replace(/,/g, "")
                          }
                          duration={stake.durations}
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
