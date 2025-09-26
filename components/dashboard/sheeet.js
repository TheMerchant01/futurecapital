"use client";
import { usePathname } from "next/navigation";
import { SheetClose, SheetHeader, SheetTitle } from "../ui/sheet";
import { navList, accountList } from "./navList";
import Link from "next/link";
import { ScrollArea } from "../ui/scroll-area";
import { useTheme } from "../../contexts/themeContext";
import Image from "next/image";

export default function Sheeet() {
  const { isDarkMode, baseColor } = useTheme();
  const router = usePathname();

  return (
    <>
      <SheetHeader className="text-white">
        <SheetTitle>
          <div className={`${isDarkMode ? "text-white" : ""} font-bold`}>
            <Image
              alt=""
              src={"/assets/logo.png"}
              width={"150"}
              height={"10"}
              className="w-32"
            />
          </div>
        </SheetTitle>
      </SheetHeader>
      <div className="mt-10 nav-menus">
        <ScrollArea className="h-[80vh] border-red-600">
          <div className="classes mb-3 text-m font-bold /mt-10 flex items-center">
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 4.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875V17.25a4.5 4.5 0 11-9 0V4.125zm4.5 14.25a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z"
                  clipRule="evenodd"
                />
                <path d="M10.719 21.75h9.156c1.036 0 1.875-.84 1.875-1.875v-5.25c0-1.036-.84-1.875-1.875-1.875h-.14l-8.742 8.743c-.09.089-.18.175-.274.257zM12.738 17.625l6.474-6.474a1.875 1.875 0 000-2.651L15.5 4.787a1.875 1.875 0 00-2.651 0l-.1.099V17.25c0 .126-.003.251-.01.375z" />
              </svg>
            </div>
            <div> Quick Access</div>
          </div>
          {navList.map((item) => (
            <Link
              key={item.nav}
              href={item.linkPath}
              passHref
              className={`flex items-center py-3 w-full transition-all cursor-pointer text-sm font-medium px-3 rounded-xl ${
                router === item.linkPath
                  ? "text-white bg-[#0066b1] font-bold"
                  : isDarkMode
                  ? "text-white/40"
                  : "text-black/80 "
              }`}
            >
              <SheetClose className="w-full">
                <div className="w-full flex items-center py-1">
                  <div className="icon mr-2">{item.icon}</div>
                  <div className="nav">{item.nav}</div>
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
              </SheetClose>
            </Link>
          ))}
          <div className="classes mb-2 mt-5 text-m font-bold flex items-center">
            {" "}
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path d="M16.5 7.5h-9v9h9v-9z" />
                <path
                  fillRule="evenodd"
                  d="M8.25 2.25A.75.75 0 019 3v.75h2.25V3a.75.75 0 011.5 0v.75H15V3a.75.75 0 011.5 0v.75h.75a3 3 0 013 3v.75H21A.75.75 0 0121 9h-.75v2.25H21a.75.75 0 010 1.5h-.75V15H21a.75.75 0 010 1.5h-.75v.75a3 3 0 01-3 3h-.75V21a.75.75 0 01-1.5 0v-.75h-2.25V21a.75.75 0 01-1.5 0v-.75H9V21a.75.75 0 01-1.5 0v-.75h-.75a3 3 0 01-3-3v-.75H3A.75.75 0 013 15h.75v-2.25H3a.75.75 0 010-1.5h.75V9H3a.75.75 0 010-1.5h.75v-.75a3 3 0 013-3h.75V3a.75.75 0 01.75-.75zM6 6.75A.75.75 0 016.75 6h10.5a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V6.75z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div> User Actions</div>
          </div>
          {accountList.map((item) => (
            <Link
              key={item.nav}
              href={item.linkPath}
              passHref
              className={`flex items-center py-3 w-full transition-all cursor-pointer text-sm font-medium px-3 rounded-xl ${
                router === item.linkPath
                  ? "text-white bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-red-800 via-red-600 to-orange-700 font-bold"
                  : isDarkMode
                  ? "text-white/40"
                  : "text-black/80 "
              }`}
            >
              <SheetClose className="w-full">
                <div className="w-full flex items-center py-1">
                  <div className="icon mr-2">{item.icon}</div>
                  <div className="nav">{item.nav}</div>
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
              </SheetClose>
            </Link>
          ))}
        </ScrollArea>
      </div>
    </>
  );
}
