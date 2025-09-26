"use client";
import React from "react";
import { deets } from "./purchasedeets";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "../../../contexts/themeContext";

export default function Purchase() {
  const { isDarkMode } = useTheme();
  return (
    <div>
      <div className="md:grid-cols-3 grid grid-cols-1 p-4">
        {deets.map((info, idx) => (
          <div
            key={idx}
            className={` border rounded-xl p-4 m-2 ${
              isDarkMode ? "border-white/10 bg-[#111]" : ""
            }`}
          >
            <div className="image lg:h-40 w-full">
              <Image
                src={info.image}
                alt=""
                className="rounded-lg w-full"
                width={300}
                height={300}
              />
            </div>
            <div className="button flex justify-center">
              <Link href={info.link} passHref>
                {" "}
                <button
                  className={`${info.bg} font-bold text-white rounded-full px-8 py-3 mt-6 text-sm`}
                >
                  Purchase from {info.name}
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
