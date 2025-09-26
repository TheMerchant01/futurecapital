"use client";
import Image from "next/image";
import Scripter from "./ScriptOne";

export default function GoogleTranslate({ isDarkMode }) {
  return (
    <div className="fixed top-32 right-0 z-50 translate-x-[8.3rem] hover:translate-x-0 cursor-pointer transition-all">
      <div
        className={` rounded-tl-full rounded-bl-full py-2 pl-2 pr-4 shadow-md w-48 ${
          isDarkMode ? "bg-[#222] text-white" : "bg-white"
        }`}
      >
        <div className="grid grid-cols-3 gap-x-2">
          <div className="w-full">
            <Image
              width={1000}
              height={1000}
              alt=""
              src="/assets/google.png"
              className="w-8 h-8 ml-2"
            />
          </div>

          <div className="col-span-2 max-h-5 mt-1 overflow-hidden">
            <Scripter />
          </div>
        </div>
      </div>
    </div>
  );
}
