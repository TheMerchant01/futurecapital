"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import STable from "../../../components/admin/StakingTable/STable";

export default function StakingTable({ em }) {
  const email = em.replace("%40", "@");
  const [data, setData] = useState();
  const [name, setName] = useState();
  const [lastPaid, setLastPaid] = useState();
  const [paidStake, setPaidStake] = useState();

  useEffect(() => {
    const fetchedDetails = async () => {
      try {
        const response = await axios.post("/fetching/fetchAllDetails", {
          email,
        });

        if (response.status === 200) {
          // Data fetched successfully, you can now handle the data
          const data = response.data;
          //  console.log(data.withdrawalHistory);
          setData(data.stakings);
          setPaidStake(data.paidStaking);
          setLastPaid(data.lastButtonClick);
          setName(data.name);
          // Do something with the data here, e.g., update state or perform other actions
        } else {
          // Handle other status codes or errors here
          console.error("Failed to fetch data");
        }
      } catch (error) {
        // Handle network errors or exceptions here
        console.error("Error while fetching data:", error);
      }
    };

    // Call the function to fetch data when the component mounts
    fetchedDetails();
  }, [email]);
  return (
    <div className="px-4 pt-12">
      <div className="settings px-3 py-4 rounded-md shadow-md shadow-gray-100">
        <div className="profile font-bold">User Stakes settings</div>
        <div className="email flex items-center gap-x-1 bg-gray-50 p-2 rounded-md mt-2">
          <div className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4 text-red-700/80"
            >
              <path
                fillRule="evenodd"
                d="M5.404 14.596A6.5 6.5 0 1116.5 10a1.25 1.25 0 01-2.5 0 4 4 0 10-.571 2.06A2.75 2.75 0 0018 10a8 8 0 10-2.343 5.657.75.75 0 00-1.06-1.06 6.5 6.5 0 01-9.193 0zM10 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="email_title text-sm font-bold">{email}</div>
        </div>
      </div>

      {!data && (
        <div className="w-full h-96 justify-center items-center flex">
          <InfinitySpin color="red" width="100" />
        </div>
      )}

      {data && (
        <STable
          data={data}
          setData={setData}
          email={email}
          name={name}
          lastPaid={lastPaid}
          paidStake={paidStake}
          setLastPaid={setLastPaid}
        />
      )}
    </div>
  );
}
