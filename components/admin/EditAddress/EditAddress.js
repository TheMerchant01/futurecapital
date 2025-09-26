"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

// ... (previous imports)

export default function EditAddress() {
  const [data, setData] = useState([]);
  const [updatedData, setUpdatedData] = useState({});
  const _id = "68c721fc1fc2ea3718051d05";
  const [loading, isloading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.post("/db/getAddess/", {
          _id: "68c721fc1fc2ea3718051d05",
        });
        setData(response.data);
      } catch (error) {
        console.log("Error fetching Address: ", error);
      }
    };
    fetchAddress();
  }, []);

  const handleChange = (field, value) => {
    setUpdatedData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleUpdate = async () => {
    try {
      isloading(true);
      await axios.post("/db/editAddress", { _id, updatedData });
      console.log("Address updated successfully");
      router.push("/admin");
    } catch (error) {
      console.log("Error updating address:", error);
    }
    isloading(false);
  };
  return (
    <div className="space-y-6">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Edit Crypto Addresses
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Update the cryptocurrency wallet addresses for deposits.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm">
        <div className="space-y-4">
          {Object.entries(data)
            .filter(([key]) => key !== "_id" && key !== "__v")
            .map(([key, value]) => (
              <div key={key} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <input
                  type="text"
                  value={
                    updatedData[key] !== undefined ? updatedData[key] : value
                  }
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={`Enter ${key} address`}
                />
              </div>
            ))}
        </div>

        <div className="mt-6">
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="w-full bg-blue-600 font-medium text-sm text-white px-4 py-3 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Updating..." : "Update Addresses"}
          </button>
        </div>
      </div>
    </div>
  );
}
