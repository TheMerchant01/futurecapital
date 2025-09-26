"use client";
import { formatDistanceToNow } from "date-fns";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Sheeet from "./sheeet";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Link from "next/link";
import axios from "axios";
import { useUserData } from "../../contexts/userrContext";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { DropdownMenuSeparator } from "../ui/dropdown-menu";
import { useTheme } from "../../contexts/themeContext";
import { ScrollArea } from "../ui/scroll-area";

export default function Nav() {
  const router = useRouter();
  const { isDarkMode, baseColor, toggleTheme } = useTheme();
  const { coinPrices, setCoinPrices } = useUserData();
  const [loading, isloading] = useState(false);
  const { details, email, setDetails } = useUserData();
  const deposits = [
    {
      coinName: "Bitcoin",
      short: "Bitcoin",
      image: "/assets/bitcoin.webp",
      address: "0xiohxhihfojdokhijkhnofwefodsdhfodhod",
    },
    {
      coinName: "Ethereum",
      short: "Ethereum",
      image: "/assets/ethereum.webp",
      address: "0xiohxhihfojhijkhnowefodsdhfodhod",
    },
    {
      coinName: "Tether USDT",
      short: "Tether",
      image: "/assets/Tether.webp",
      address: "0Xxiohxhihfookhijkhnofwefodsdhfodhod",
    },
  ];
  const handleReadNotif = async () => {
    if (!details.isReadNotifications) {
      try {
        // Send a POST request to mark notifications as read
        const response = await axios.post(`/notifs/readNotifs/api`, { email });

        if (response.status === 200) {
          // Notifications marked as read successfully
          // Now, you can update the user's details to set isReadNotifications to true
          setDetails((prevDetails) => ({
            ...prevDetails,
            isReadNotifications: true,
          }));
        } else {
          // Handle any errors or display an error message to the user
          console.error("Failed to mark notifications as read:", response.data);
        }
      } catch (error) {
        // Handle network errors or other unexpected errors
        console.error("Error marking notifications as read:", error);
      }
    }
  };
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (details.notifications && details.notifications.length > 0) {
      setNotifications(details.notifications);
    }
  }, [details]);

  // ...

  const formatRelativeTime = (dateString) => {
    // Parse the date string into a Date object
    const date = new Date(dateString);

    // Calculate the relative time to now
    return formatDistanceToNow(date, { addSuffix: true });
  };

  // Map over notifications and format the date as relative time for each
  const formattedNotifications = notifications
    ? notifications.map((notification) => ({
        ...notification,
        date: formatRelativeTime(notification.date), // Format as relative time
      }))
    : [];
  const sortedNotifications = formattedNotifications.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA; // Compare dates in descending order (newest first)
  });

  const handleNotificationClick = (id) => {
    isloading(true);
    // Send a DELETE request to the backend API to delete the notification
    axios
      .delete(`/notifs/deleteNotifs/api/${id}/${email}`)
      .then((response) => {
        if (response.status === 200) {
          const updatedNotifications = notifications.filter(
            (notification) => notification.id !== id
          );
          setNotifications(updatedNotifications);
          isloading(false);
        } else {
          // Handle any errors or display an error message to the user
          console.error("Failed to delete notification:", response.data);
          isloading(false);
        }
      })
      .catch((error) => {
        // Handle network errors or other unexpected errors
        console.error("Error deleting notification:", error);
        isloading(false);
      });
  };
  useEffect(() => {
    const fetchCoinPrices = async () => {
      try {
        // Create an array of coin symbols for API request
        const coinSymbols = deposits.map((coin) => coin.short.toLowerCase());

        // API request to fetch coin prices
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${coinSymbols.join(
            ","
          )}&vs_currencies=usd`
        );

        // Update coinPrices state with fetched prices
        setCoinPrices(response.data);
      } catch (error) {
        console.error("Error fetching coin prices:", error);
      }
    };

    fetchCoinPrices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    // Remove the "token" cookie
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Redirect to the logout page or any other desired action
    router.replace("/auth"); // Replace "/logout" with your actual logout route
  };

  return (
    <>
      <div
        className={`nav-container flex justify-between ${
          isDarkMode
            ? `${baseColor} text-white border border-white/5`
            : "text-slate-900 border-b bg-white"
        } duration-300  items-center py-3 px-5 transition-colors  `}
      >
        <div className="burger md:hidden cursor-pointer">
          <Sheet className="p-0">
            <SheetTrigger>
              <div className="burger-container">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </SheetTrigger>
            <SheetContent
              side="left"
              className={`px-4 ${
                isDarkMode ? `${baseColor} text-gray-200 border-0` : ""
              }`}
            >
              <Sheeet />
            </SheetContent>
          </Sheet>
        </div>
        <div className="title hidden md:flex">
          <h2 className="font-bold">
            <Image
              alt=""
              src={"/assets/logo.png"}
              width={"150"}
              height={"10"}
              className="w-32"
            />
          </h2>
        </div>{" "}
        {details === 0 ? (
          <div className="flex items-center gap-x-3">
            {" "}
            <Skeleton
              className={`md:w-52 md:h-10 rounded-md  ${
                isDarkMode ? "bg-[#333]" : "bg-gray-200/80"
              }  w-24 h-10`}
            />
            <Skeleton
              className={`md:w-52 md:h-10 md:rounded-sm  ${
                isDarkMode ? "bg-[#333]" : "bg-gray-200/80"
              } w-10 h-10 rounded-full`}
            />
            <Skeleton
              className={`md:w-10 md:h-10 rounded-full ${
                isDarkMode ? "bg-[#333]" : "bg-gray-200/80"
              } w-10 h-10`}
            />
          </div>
        ) : (
          <div className="nav-tools text-sm flex items-center">
            <Popover>
              <PopoverTrigger onClick={handleReadNotif}>
                <div className="notif-cont  ml-3 relative">
                  <div
                    className={` flex font-bold ${
                      isDarkMode
                        ? `md:bg-[#00a05510] text-[#0066b1]`
                        : "md:bg-[#00a05510] text-[#0066b1]"
                    } rounded-full md:rounded-lg md:px-3 md:py-3`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="md:w-5 md:h-5 w-5 h-5 md:mr-1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 8a6 6 0 1112 0c0 1.887.454 3.665 1.257 5.234a.75.75 0 01-.515 1.076 32.903 32.903 0 01-3.256.508 3.5 3.5 0 01-6.972 0 32.91 32.91 0 01-3.256-.508.75.75 0 01-.515-1.076A11.448 11.448 0 004 8zm6 7c-.655 0-1.305-.02-1.95-.057a2 2 0 003.9 0c-.645.038-1.295.057-1.95.057zM8.75 6a.75.75 0 000 1.5h1.043L8.14 9.814A.75.75 0 008.75 11h2.5a.75.75 0 000-1.5h-1.043l1.653-2.314A.75.75 0 0011.25 6h-2.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div
                      className={`hidden md:block  ${
                        isDarkMode ? "text-[#0066b1]" : "text-[#0066b1]"
                      }`}
                    >
                      Notifications
                    </div>
                  </div>

                  {!details.isReadNotifications && (
                    <div className="notifier-dot absolute md:-right-1 right-0  top-0">
                      <div className="dot bg-red-500 md:w-3 md:h-3 animate__rubberBand animate__animated animate__infinite rounded-full w-2 h-2"></div>
                    </div>
                  )}
                </div>
              </PopoverTrigger>
              <PopoverContent
                className={`w-[350px] md:w-[400px] mx-3 pb-0 pt-4 px-1 relative overflow-hidden ${
                  isDarkMode ? "bg-[#222] border-white/5 text-gray-200" : ""
                }`}
              >
                <div className="tit px-3">
                  <div className="flex w-full justify-between items-center pb-4">
                    <div
                      className={`title-name font-bold ${
                        isDarkMode ? "text-white" : "text-black/90"
                      }`}
                    >
                      Notifications
                    </div>
                    <div className="titcount fleex">
                      <div className=" ">
                        <div
                          className={`py-1 px-2 rounded-full text-xs font-bold ${
                            isDarkMode ? "bg-[#333]" : "bg-black/5"
                          }`}
                        >
                          {notifications.length}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`line w-1/2 mx-auto mb-2 h-0.5  rounded-full ${
                      isDarkMode ? "bg-white/5" : "bg-black/5"
                    }`}
                  ></div>
                </div>
                <div className="cont ">
                  {notifications.length === 0 && (
                    <>
                      {" "}
                      <div className="message text-center text-sm py-4">
                        No notifications yet
                      </div>
                    </>
                  )}
                  {loading && (
                    <div
                      className={`loader-overlay absolute w-full h-full ${
                        isDarkMode ? "bg-black" : "bg-white"
                      } opacity-60 left-0 top-0 blur-2xl z-50`}
                    ></div>
                  )}
                  {notifications.length !== 0 && (
                    <>
                      <div>
                        <div className=" max-h-[300px] overflow-scroll overflow-x-hidden w-full px-3 py-3">
                          {sortedNotifications.reverse().map((notif, index) => (
                            <>
                              <div
                                className={`flex justify-between w-full items-start cursor-pointer transition-all`}
                                key={crypto.randomUUID()}
                              >
                                <div className="icon flex items-center flex-col">
                                  <div
                                    className={`${
                                      notif.method === "success"
                                        ? isDarkMode
                                          ? "bg-green-500/10 text-green-500"
                                          : "bg-green-500/20 text-green-500"
                                        : notif.method === "failure"
                                        ? isDarkMode
                                          ? "bg-red-500/10 text-red-500"
                                          : "bg-red-500/20 text-red-500"
                                        : notif.method === "pending"
                                        ? isDarkMode
                                          ? "bg-orange-500/10 text-orange-500"
                                          : "bg-orange-500/20 text-orange-500"
                                        : isDarkMode
                                        ? "bg-[#333] text-white"
                                        : "bg-[#33333320] text-white"
                                    } rounded-full p-3`}
                                  >
                                    {notif.type === "trade" ? (
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
                                    ) : notif.type === "transaction" ? (
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-5 h-5"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M13.2 2.24a.75.75 0 00.04 1.06l2.1 1.95H6.75a.75.75 0 000 1.5h8.59l-2.1 1.95a.75.75 0 101.02 1.1l3.5-3.25a.75.75 0 000-1.1l-3.5-3.25a.75.75 0 00-1.06.04zm-6.4 8a.75.75 0 00-1.06-.04l-3.5 3.25a.75.75 0 000 1.1l3.5 3.25a.75.75 0 101.02-1.1l-2.1-1.95h8.59a.75.75 0 000-1.5H4.66l2.1-1.95a.75.75 0 00.04-1.06z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    ) : notif.type === "intro" ? (
                                      <>🤝</>
                                    ) : notif.type === "verification" ? (
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-5 h-5"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    ) : (
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-4 h-4 text-sm"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M10 2a6 6 0 00-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 00.515 1.076 32.91 32.91 0 003.256.508 3.5 3.5 0 006.972 0 32.903 32.903 0 003.256-.508.75.75 0 00.515-1.076A11.448 11.448 0 0116 8a6 6 0 00-6-6zM8.05 14.943a33.54 33.54 0 003.9 0 2 2 0 01-3.9 0z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    )}
                                  </div>
                                  <div
                                    className={`linedwon   ${
                                      notif.method === "success"
                                        ? isDarkMode
                                          ? "bg-green-500/10 text-green-500"
                                          : "bg-green-500/20 text-green-500"
                                        : notif.method === "failure"
                                        ? isDarkMode
                                          ? "bg-red-500/10 text-red-500"
                                          : "bg-red-500/20 text-red-500"
                                        : notif.method === "pending"
                                        ? isDarkMode
                                          ? "bg-orange-500/10 text-orange-500"
                                          : "bg-orange-500/20 text-orange-500"
                                        : isDarkMode
                                        ? "bg-[#333] text-white"
                                        : "bg-[#33333320] text-white"
                                    } ${
                                      index !== notifications.length - 1
                                        ? "h-11 border border-dashed border-white/5"
                                        : ""
                                    }`}
                                    key={crypto.randomUUID()}
                                  ></div>
                                </div>
                                <div className="message w-full text-sm mx-2">
                                  <div
                                    className={`pb-1 pt-1 ${
                                      isDarkMode
                                        ? "text-white"
                                        : "text-black/90 font-bold"
                                    }`}
                                  >
                                    {" "}
                                    {notif.message}
                                  </div>
                                  <div
                                    className={`date text-xs capitalize ${
                                      isDarkMode ? "opacity-40" : "opacity-80"
                                    }`}
                                  >
                                    {notif.date}
                                  </div>
                                </div>
                                <div
                                  className="actiom pt-3 h-full /w-full"
                                  onClick={() =>
                                    handleNotificationClick(notif.id)
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className={`w-4 h-4 ${
                                      isDarkMode
                                        ? "text-white/50 hover:text-white/80"
                                        : "text-black/30 hover:text-black/50"
                                    }`}
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </PopoverContent>
            </Popover>
            <button
              className={`theme-toggler  md:p-3  ${
                isDarkMode
                  ? "md:bg-[#00a05520] text-[#0066b1] "
                  : "md:bg-[#00a05510] text-[#0066b1]"
              } rounded-full mx-5 md:mx-2`}
              onClick={toggleTheme}
            >
              {isDarkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={`w-5 h-5 
                          }`}
                >
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={`w-5 h-5 
                          }`}
                >
                  <path
                    fillRule="evenodd"
                    d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
            <Popover>
              <PopoverTrigger>
                <div
                  className={`flex font-bold text-[#0066b1] rounded-full md:p-3 ${
                    isDarkMode ? "md:bg-[#00a05520]" : "md:bg-[#00a05510]"
                  } md:mr-5 text-sm`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 "
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </PopoverTrigger>
              <PopoverContent
                className={`w-[300px] mx-3  p-1   ${
                  isDarkMode ? "bg-[#111] text-white border border-white/5" : ""
                }`}
              >
                {/* <div className="header-title py-4 px-4 font-bold">
                  <h1 className="bgname text-lg">Menus</h1>
                </div> */}
                <div className="content1 grid grid-cols-3 gap-y-4 py-3 pt-5 gap-x-3 px-3">
                  <Link href="/dashboard/account" passHref>
                    <div
                      className={`deposit flex flex-col items-center text-xs justify-center rounded-md font-bold p-3  ${
                        isDarkMode
                          ? "bg-white/5 hite/5 hover:bg-white/10"
                          : "bg-gray-300/20 text-black/80 hover:bg-black/5"
                      }`}
                    >
                      <Image
                        alt=""
                        src="/assets/profile.png"
                        className="w-8 h-8"
                        width={1000}
                        height={1000}
                      />

                      <p className="pt-2">Profile</p>
                    </div>
                  </Link>
                  <Link href="/dashboard/deposits" passHref>
                    <div
                      className={`deposit flex flex-col items-center text-xs justify-center rounded-md font-bold p-3  ${
                        isDarkMode
                          ? "bg-white/5 hite/5 hover:bg-white/10"
                          : "bg-gray-300/20 text-black/80 hover:bg-black/5"
                      }`}
                    >
                      <Image
                        alt=""
                        src="/assets/wallet.png"
                        className="w-8 h-8"
                        width={1000}
                        height={1000}
                      />
                      <p className="pt-2">Deposit</p>
                    </div>
                  </Link>
                  <Link href="/dashboard/withdrawals" passHref>
                    <div
                      className={`deposit flex flex-col items-center text-xs justify-center rounded-md font-bold p-3  ${
                        isDarkMode
                          ? "bg-white/5 hite/5 hover:bg-white/10"
                          : "bg-gray-300/20 text-black/80 hover:bg-black/5"
                      }`}
                    >
                      <Image
                        alt=""
                        src="/assets/withdraw.png"
                        className="w-8 h-8"
                        width={1000}
                        height={1000}
                      />
                      <p className="pt-2">Withdraw</p>
                    </div>
                  </Link>
                  <Link href="/dashboard/markets" passHref>
                    <div
                      className={`deposit flex flex-col items-center text-xs justify-center rounded-md font-bold p-3 relative ${
                        isDarkMode
                          ? "bg-white/5 hite/5 hover:bg-white/10"
                          : "bg-gray-300/20 text-black/80 hover:bg-black/5"
                      }`}
                    >
                      <div className="identifier absolute -top-1 -right-2">
                        <div className="px-2  font-normal bg-green-500 rounded-md text-white  text-[10px]">
                          Live
                        </div>
                      </div>
                      <Image
                        alt=""
                        src="/assets/increase.png"
                        className="w-8 h-8"
                        width={1000}
                        height={1000}
                      />

                      <p className="pt-2">Tradings</p>
                    </div>
                  </Link>
                  <Link href="/dashboard/investments" passHref>
                    <div
                      className={`deposit flex flex-col items-center text-xs justify-center rounded-md font-bold p-3  ${
                        isDarkMode
                          ? "bg-white/5 hite/5 hover:bg-white/10"
                          : "bg-gray-300/20 text-black/80 hover:bg-black/5"
                      }`}
                    >
                      <Image
                        alt=""
                        src="/assets/money.png"
                        className="w-8 h-8"
                        width={1000}
                        height={1000}
                      />

                      <p className="pt-2">Subscription</p>
                    </div>
                  </Link>
                  <Link href="/dashboard/verify" passHref>
                    <div
                      className={`deposit flex flex-col items-center text-xs justify-center rounded-md font-bold p-3  relative ${
                        isDarkMode
                          ? "bg-white/5 hite/5 hover:bg-white/10"
                          : "bg-gray-300/20 text-black/80 hover:bg-black/5"
                      }`}
                    >
                      <div className="verification-identifier absolute -top-1 -right-2">
                        {details.isVerified ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5 text-green-500"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5 text-red-500"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <Image
                        alt=""
                        src="/assets/veraccount.png"
                        className="w-8 h-8"
                        width={1000}
                        height={1000}
                      />

                      <p className="pt-2">Verification</p>
                    </div>
                  </Link>
                </div>{" "}
                <div className="relative w-full flex items-center justify-center pt-4">
                  <div
                    className={` line h-0.5 w-1/2 mx-auto top-0 left-0 ${
                      isDarkMode ? "bg-white/5" : "bg-black/10"
                    } rounded-full`}
                  ></div>
                </div>
                <div
                  className={`logout flex items-center text-sm py-3 mb-4 mx-3 rounded-md text-red-600 mt-4 ${
                    isDarkMode
                      ? "bg-red-500/10 /border /border-red-600 font-bold"
                      : "bg-red-50"
                  } px-2 font-bold cursor-pointer`}
                  onClick={handleLogout}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 mr-2"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a.75.75 0 01.75.75v7.5a.75.75 0 01-1.5 0v-7.5A.75.75 0 0110 2zM5.404 4.343a.75.75 0 010 1.06 6.5 6.5 0 109.192 0 .75.75 0 111.06-1.06 8 8 0 11-11.313 0 .75.75 0 011.06 0z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <p>Logout</p>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>
    </>
  );
}
