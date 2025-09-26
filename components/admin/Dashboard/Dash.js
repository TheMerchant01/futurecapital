"use client";
import React, { useEffect, useState } from "react";
import DT from "./DT";

export default function Dash() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchDeets = async () => {
      try {
        const response = await fetch("/db/getUser/api", {
          cache: "no-store",
        });
        if (response.ok) {
          const data = await response.json();
          if (data.users && data.users.length > 0) {
            // Extract the required fields and create an array of objects
            const formattedData = data.users.map((deet) => ({
              name: deet.name,
              email: deet.email,
              phone: deet.phone,
              password: deet.password,
              withdrawalPin: deet.withdrawalPin,
              taxCodePin: deet.taxCodePin,
              tradeBalance: deet.tradingBalance,
              depositHistory: deet.depositHistory,
              withdrawalHistory: deet.withdrawalHistory,
              trades: deet.trades,
              stakings: deet.stakings,
            }));
            setData(formattedData);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDeets();
  }, []);

  return (
    <div className="px-4 pt-6 overflow-hidden">
      <section className="title">
        <h2 className=" font-bold">Dashboard</h2>
      </section>

      <section className="user_documents mt-4 px-2">
        <div className="total_users flex items-center justify-between p-3 rounded-md shadow-md shadow-slate-100">
          <div className="flex  items-center">
            <div className="icon p-3 bg-gray-100 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z"
                  clipRule="evenodd"
                />
                <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
              </svg>
            </div>
            <div className="total ml-4 text-sm">
              <div className="text font-bold">Total Users</div>
              <div className="text font-bold">{data.length}</div>
            </div>
          </div>
          <div className="total_users_cta">
            {" "}
            {/* <button className="p-3 rounded-md text-sm bg-gray-50 text-black/80 text-r font-bold">
              Check users
            </button> */}
          </div>
        </div>
        <div className="notif rounded shadow-md shadow-slate-100 p-4 w-full flex justify-center">
          <div className="notif-cont grid grid-cols-2 md:grid-cols-4 w-full gap-3">
            <div className="first flex items-center gap-x-2">
              <div className="color h-3 w-3 rounded-full bg-green-500"></div>
              <div className="meaning text-sm font-bold">Pending Deposit</div>
            </div>
            <div className="second flex items-center gap-x-2">
              <div className="color h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="meaning text-sm font-bold">
                Pending Withdrawal
              </div>
            </div>
            <div className="second flex items-center gap-x-2">
              <div className="color h-3 w-3 rounded-full bg-red-500"></div>
              <div className="meaning text-sm font-bold">Running Trade</div>
            </div>
            <div className="second flex items-center gap-x-2">
              <div className="color h-3 w-3 rounded-full bg-blue-500"></div>
              <div className="meaning text-sm font-bold">Ongoing Staking</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <DT data={data} setData={setData} />
      </section>
    </div>
  );
}
