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
    <div className="mt-8 px-4">
      <div className="mb-4 p-4 rounded-md">
        {Object.entries(data)
          .filter(([key]) => key !== "_id" && key !== "__v")
          .map(([key, value]) => (
            <div key={key} className="mb-2">
              <label className="block font-bold">{key}</label>
              <input
                key={key} // Add the key prop here
                type="text"
                value={
                  updatedData[key] !== undefined ? updatedData[key] : value
                }
                onChange={(e) => handleChange(key, e.target.value)}
                className="w-full border border-gray-300 rounded-sm p-2"
              />
            </div>
          ))}
      </div>
      <button
        onClick={handleUpdate}
        className="bg-red-500 w-full font-bold text-sm text-white px-4 py-3 rounded-sm hover:bg-red-600"
      >
        {loading ? "Updating..." : "Update"}
      </button>
    </div>
  );
}
