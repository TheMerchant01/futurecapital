"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { lists } from "./navList";
import { ScrollArea } from "../ui/scroll-area";
import { useTheme } from "../../contexts/themeContext";
import Image from "next/image";

export default function Sidebar() {
  const { isDarkMode, baseColor } = useTheme();
  const router = usePathname();

  return (
    <div className={`${isDarkMode ? `${baseColor} text-white` : ""}`}>
      <div
        className={`border-r ${
          isDarkMode ? "border-white/5" : ""
        } px-2 pt-4 pb-8`}
      >
        <ScrollArea>
          {lists.map((item, index) => (
            <Link key={index} href={item.linkPath} passHref>
              <div
                className={`flex flex-col md:flex-row text-sm items-center rounded-md py-3 my-1 px-2 transition-all ${
                  router === item.linkPath
                    ? "text-[#0066b1] font-bold bg-[#00a05510]"
                    : isDarkMode
                    ? "text-white/95 hover:bg-[#00a05515] text-xs "
                    : "text-black/70 hover:bg-[#00a05507] text-xs "
                }`}
              >
                <div className="mx-2 font-bold ">{item.icon}</div>
                <div className="text-xs lg:text-sm font-bol">{item.nav}</div>
                {item.new && (
                  <div className=" ml-2">
                    <Image
                      alt=""
                      src="/assets/new.png"
                      width={1000}
                      height={1000}
                      className="w-8 h-8 opacity-60"
                    />
                  </div>
                )}
              </div>
            </Link>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}
