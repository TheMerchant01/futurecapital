"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { useRouter } from "next/navigation";
import { InfinitySpin } from "react-loader-spinner";
import toast from "react-hot-toast";

export default function AddDepositHistory({ data }) {
  const [loading, isloading] = useState(false);
  const [amount, setAmount] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [errors, setErrors] = useState({
    amount: "",
    selectedDate: "",
  });

  const email_refined = data.replace("%40", "@");

  const router = useRouter();

  // State for handling form submission
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    isloading(true);
    e.preventDefault();

    // Reset errors on each submission attempt
    setErrors({
      amount: "",
      selectedDate: "",
    });

    // Simple validation
    let formIsValid = true;
    let newErrors = {};

    if (!amount) {
      newErrors.amount = "Amount is required.";
      formIsValid = false;
    }

    if (!selectedDate) {
      newErrors.selectedDate = "Date is required.";
      formIsValid = false;
    }

    // If validation fails, set errors and return
    if (!formIsValid) {
      setErrors(newErrors);
      isloading(false);
      return;
    }

    try {
      const response = await axios.post("/db/addDepositHistory/api", {
        amount,
        email: email_refined,
        selectedDate,
      });
      if (response.status === 200) {
        setFormSubmitted(true);
        toast.success("Information updated successfully");
        router.replace("/admin");
        isloading(false);
      }
    } catch (error) {
      isloading(false);
      console.error("Error updating user details:", error);
    }
  };

  return (
    <div className="px-4 mt-20">
      <div className="settings px-3 py-4 rounded-md shadow-md shadow-gray-100">
        <div className="profile font-bold">Deposit History Settings</div>
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
          <div className="email_title text-sm font-bold">{email_refined}</div>
        </div>
      </div>

      <div className="user_form_section mt-8 px-4 py-3 shadow-md rounded-md shadow-gray-200">
        <form onSubmit={handleSubmit} className="user-form">
          {loading ? (
            <div className="w-full  flex my-5 justify-center items-center font-bold">
              <InfinitySpin width="100" color="red" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="amount"
                    className="block text-sm font-bold text-gray-700"
                  >
                    Amount:
                  </label>
                  <input
                    type="text"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-sm text-black"
                  />
                  {errors.amount && (
                    <p className="text-xs text-red-500 mt-1">{errors.amount}</p>
                  )}
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="selectedDate"
                    className="block text-sm font-bold text-gray-700"
                  >
                    Select Date:
                  </label>
                  <input
                    type="date"
                    id="selectedDate"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-sm text-black"
                  />
                  {errors.selectedDate && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.selectedDate}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}

          <Button
            type="submit"
            className="mt-4  text-white w-full font-bold  rounded-md p-3"
          >
            {loading ? "Please Wait..." : "Add deposit history"}
          </Button>
        </form>
      </div>
    </div>
  );
}
