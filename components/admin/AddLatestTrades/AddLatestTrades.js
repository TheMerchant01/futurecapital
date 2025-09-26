"use client";
import axios from "axios";
import React, { useState } from "react";
import { Button } from "../../ui/button";
import { useRouter } from "next/navigation";
import { InfinitySpin } from "react-loader-spinner";
import toast from "react-hot-toast";

export default function AddLatestTrades({ data }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    asset: "",
    duration: "",
    type: "",
    entryPrice: "",
    lotSize: "",
    stopLoss: "",
    takeProfit: "",
    status: "",
    selectedDate: "",
  });

  const [errors, setErrors] = useState({});
  const email_refined = data.replace("%40", "@");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) newErrors[key] = `${key} is required.`;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/db/addLatestTrades/api", {
        ...formData,
        email: email_refined,
      });
      if (response.status === 200) {
        toast.success("Information updated successfully");
        router.replace("/admin");
      }
    } catch (error) {
      console.error("Error updating trades:", error);
      toast.error("Failed to update trades");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 mt-20">
      <div className="settings px-3 py-4 rounded-md shadow-md shadow-gray-100">
        <div className="profile font-bold">Latest Trades Settings</div>
        <div className="email flex items-center gap-x-1 bg-gray-50 p-2 rounded-md mt-2">
          <div className="icon">📧</div>
          <div className="email_title text-sm font-bold">{email_refined}</div>
        </div>
      </div>
      <div className="user_form_section mt-8 px-4 py-3 shadow-md rounded-md shadow-gray-200">
        <form onSubmit={handleSubmit} className="user-form">
          {loading ? (
            <div className="w-full flex my-5 justify-center items-center font-bold">
              <InfinitySpin width="100" color="red" />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(formData).map((field) => (
                <div key={field} className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor={field}
                    className="block text-sm font-bold text-gray-700"
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}:
                  </label>
                  <input
                    type={field === "selectedDate" ? "date" : "text"}
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    placeholder={`Enter ${field}`}
                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-sm text-black"
                  />
                  {errors[field] && (
                    <p className="text-xs text-red-500 mt-1">{errors[field]}</p>
                  )}
                </div>
              ))}
            </div>
          )}
          <Button
            type="submit"
            className="mt-4 text-white w-full font-bold rounded-md p-3"
          >
            {loading ? "Please Wait..." : "Add Latest Trade"}
          </Button>
        </form>
      </div>
    </div>
  );
}
