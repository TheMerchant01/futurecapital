"use client";
import React from "react";
import { useUserData } from "../../../contexts/userrContext";
import { useTheme } from "../../../contexts/themeContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BonusPlan() {
  const { details } = useUserData();
  const { isDarkMode } = useTheme();
  const pathname = usePathname();
  return (
    <div className="">
      {details !== 0 && (
        <div className="grid md:grid-cols-2 grid-cols-1 w-full gap-3">
          <div
            className={`flex relative overflow-hidden justify-between items-center p-4 rounded-md wfull ${
              isDarkMode
                ? "bg-[#111] border border-white/5 text-white"
                : "bg-black/5 border"
            }`}
          >
            <div
              className={`absolute z-20 -bottom-2 ${
                pathname.includes("investment") ? "right-5" : "right-40"
              } `}
            >
              {details.investmentPackage === "bronze plan" ? (
                <Image
                  alt=""
                  className="w-24 h-24 opacity-10"
                  src="/assets/bronze.png"
                  width={1000}
                  height={1000}
                />
              ) : details.investmentPackage === "silver plan" ? (
                <Image
                  alt=""
                  className="w-24 h-24 opacity-10"
                  src="/assets/silverr.png"
                  width={1000}
                  height={1000}
                />
              ) : details.investmentPackage === "gold plan" ? (
                <Image
                  alt=""
                  className="w-24 h-24 opacity-10"
                  src="/assets/gold.png"
                  width={1000}
                  height={1000}
                />
              ) : details.investmentPackage === "premium plan" ? (
                <Image
                  alt=""
                  className="w-24 h-24 opacity-10"
                  src="/assets/premium.png"
                  width={1000}
                  height={1000}
                />
              ) : (
                <Image
                  alt=""
                  className="w-24 h-24 opacity-10"
                  src="/assets/empty-box.png"
                  width={1000}
                  height={1000}
                />
              )}
            </div>
            <div className="flex items-center gap-x-3">
              {" "}
              <div
                className={`image_cont rounded-full h-full p-3 ${
                  isDarkMode ? "bg-[#222]" : "bg-black/10"
                }`}
              >
                {details.investmentPackage === "bronze plan" ? (
                  <Image
                    alt=""
                    className="w-7 h-7"
                    src="/assets/bronze.png"
                    width={1000}
                    height={1000}
                  />
                ) : details.investmentPackage === "silver plan" ? (
                  <Image
                    alt=""
                    className="w-7 h-7"
                    src="/assets/silverr.png"
                    width={1000}
                    height={1000}
                  />
                ) : details.investmentPackage === "gold plan" ? (
                  <Image
                    alt=""
                    className="w-7 h-7"
                    src="/assets/gold.png"
                    width={1000}
                    height={1000}
                  />
                ) : details.investmentPackage === "premium plan" ? (
                  <Image
                    alt=""
                    className="w-7 h-7"
                    src="/assets/premium.png"
                    width={1000}
                    height={1000}
                  />
                ) : (
                  <Image
                    alt=""
                    className="w-7 h-7"
                    src="/assets/empty-box.png"
                    width={1000}
                    height={1000}
                  />
                )}
              </div>
              <div className="text">
                <div className="currentplan_name text-sm">Latest Plan</div>
                <div className="currentplan_name font-bold text-lg capitalize">
                  {details !== 0 && details.investmentPackage}
                </div>
              </div>
            </div>

            <div className="action">
              <Link href="/dashboard/main-investment" passHref>
                <button
                  className={`py-2 z-50 text-[#0066b1] px-4 bg-[#00a05510] rounded-md text-sm font-bold ${
                    pathname.includes("main-investment") ? "hidden" : ""
                  }`}
                >
                  {details.investmentPackage === "no plan"
                    ? "Purchase Plan"
                    : "Purchase Plan"}
                </button>
              </Link>
            </div>
          </div>
          <div
            className={`${
              isDarkMode
                ? "bg-[#111] border border-white/5 text-white"
                : "bg-black/5 border"
            } p-4 rounded-md relative overflow-hidden`}
          >
            <div className={`absolute z-20 -bottom-5 right-5 `}>
              <Image
                alt=""
                className="w-24 h-24 opacity-10"
                src="/assets/coin.png"
                width={1000}
                height={1000}
              />
            </div>
            <div className="flex gap-x-3">
              <div
                className={`image_cont rounded-full h-full p-3 ${
                  isDarkMode ? "bg-[#222]" : "bg-black/10"
                }`}
              >
                <Image
                  alt=""
                  className="w-7 h-7"
                  src="/assets/coin.png"
                  width={1000}
                  height={1000}
                />
              </div>
              <div className="text">
                <div className="currentplan_name text-sm">Total Profit</div>
                <div className="currentplan_name font-bold text-lg capitalize">
                  ${details !== 0 && details.planBonus.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
