/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState, useEffect } from "react";
//import { toast } from "react-toastify";

import axios from "axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../../ui/dialog";
import { useDropzone } from "react-dropzone";
import { DialogClose } from "@radix-ui/react-dialog";
import { useUserData } from "../../../contexts/userrContext";
import toast from "react-hot-toast";
import { toast as t, ToastContainer } from "react-toastify";
import { Skeleton } from "../../ui/skeleton";
import { useTheme } from "../../../contexts/themeContext";
import QRCode from "qrcode.react";
import { CloudCog } from "lucide-react";

export default function DepwCrypto() {
  const [uploadedImageUrls, setUploadedImageUrls] = useState();
  const { details, setDetails, setNotification, address } = useUserData();

  const { selectedMethod, setSelectedMethod } = useUserData();
  const [amountInUSD, setAmountInUSD] = useState("");
  const { currentPrice, email } = useUserData();
  const [selectedAddress, setSelectedAddress] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [files, setFiles] = useState([]);
  const [showDropzone, setShowDropzone] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const deposits = [
    {
      coinName: "Bitcoin",
      short: "Bitcoin",
      image: "/assets/bitcoin.webp",
      address: address && address.Bitcoin,
    },
    {
      coinName: "Ethereum",
      short: "Ethereum",
      image: "/assets/ethereum.webp",
      address: address && address.Ethereum,
    },
    {
      coinName: "Tether USDT",
      short: "Tether",
      image: "/assets/Tether.webp",
      address: address && address.Tether,
    },
  ];
  const othermeans = [
    {
      coinName: "Binance",
      short: "binance",
      image: "/assets/bnb.webp",
      address: address && address.Binance,
    },
    {
      coinName: "Dogecoin",
      short: "Dogecoin",
      image: "/assets/dogecoin.webp",
      address: address && address.Dogecoin,
    },
    {
      coinName: "Tron",
      short: "Tron",
      image: "/assets/tron-logo.webp",
      address: address && address.Tron,
    },
  ];
  const handleMethodChange = (value) => {
    setSelectedMethod(value);
    const selectedOption = [...deposits, ...othermeans].find(
      (option) => option.short === value
    );
    setSelectedAddress(selectedOption?.address || "");
  };
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png, image/jpg",
    onDrop: async (acceptedFiles) => {
      setIsUploading(true); // Set loading state

      try {
        const uploadedImageUrls = await Promise.all(
          acceptedFiles.map(async (file) => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "insightstakers");
            try {
              const response = await axios.post(
                `https://api.cloudinary.com/v1_1/dr1p2iupg/upload`, // Replace with your Cloudinary URL
                formData
              );
              setUploadedImageUrls(response.data.secure_url);
              return response.data.secure_url;
            } catch (error) {
              console.error("Error uploading image to Cloudinary:", error);
              throw error;
            }
          })
        );

        // Store uploaded image URLs

        setFiles(
          acceptedFiles.map((file, index) => ({
            ...file,
            preview: URL.createObjectURL(file),
            cloudinaryUrl: uploadedImageUrls[index], // Store the Cloudinary URL
          }))
        );

        setUploadSuccess(true); // Set success state
      } catch (error) {
        console.error("Error uploading images to Cloudinary:", error);
      } finally {
        setIsUploading(false); // Reset loading state
      }
    },
  });

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(selectedAddress);
    setIsCopied(true);
    toast.success("Address copied");
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  const sendDepositHistory = async () => {
    try {
      const response = await axios.post("/history/deposit/api", {
        email,
        depositMethod: selectedMethod + " Deposit",
        amount: amountInUSD,
        transactionStatus: "Pending",
        image: uploadedImageUrls,
        name: details.name,
      });
      if (response.data.success) {
        setDetails((prevDeets) => ({
          ...prevDeets,
          depositHistory: [
            ...prevDeets.depositHistory,
            {
              id: response.data.id,
              dateAdded: response.data.date,
              depositMethod: selectedMethod + " Deposit",
              amount: amountInUSD,
              transactionStatus: "Pending",
            },
          ],
        }));
        setNotification(
          `Deposit of $${amountInUSD} under review`,
          "transaction",
          "pending"
        );

        //dosmothing
      }
    } catch (error) {
      console.error("Error adding withdrawal history:", error);
      throw error;
    }
  };
  const handleToast = () => {
    t.warn(` Deposit of $${amountInUSD} Under Review`, {
      position: "top-center",
      autoClose: 50000,
      style: {
        borderRadius: "8px",
        width: "70%",
        padding: "10px",
        fontSize: "14px",
        margin: "10px auto",
        backgroundColor: "white",
        color: "#00050",
        textAlign: "center",
      },
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    sendDepositHistory();
    setAmountInUSD("");
  };

  const handleVerifyDeposits = () => {
    setShowDropzone(true);
  };
  const handleAmountChange = (e) => {
    setAmountInUSD(e.target.value);
  };
  const { isDarkMode, baseColor } = useTheme();

  const equivalentInCrypto = (amountInUSD / currentPrice).toFixed(8);

  return (
    <div className="p-4">
      <ToastContainer />
      {details === 0 ? (
        <div className="w-full px-3">
          <Skeleton
            className={`  h-52 ${isDarkMode ? "bg-[#333]" : "bg-gray-200/80"}`}
          />
        </div>
      ) : (
        <div
          className={`deposits-cont  p-3 rounded-lg transition-all ${
            isDarkMode
              ? "border border-white/10 bg-[#111] text-white/90"
              : "shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
          }`}
        >
          <div className="pb-2 transition-all w-full text-center">
            {" "}
            <div
              className={`heading pb-1 flex items-center mt-3 justify-center ${
                isDarkMode ? "text-white/60" : "text-black/80"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z"
                />
              </svg>
              <p className="text-sm uppercase">Crypto</p>
            </div>
            <div className="header-text font-bold capitalize text-lg pb-4">
              Deposit using Crypto
            </div>
          </div>
          <div className="px-2 py-5">
            <Select
              className="w-full outline-none /bg-gray-50 py-4"
              onValueChange={handleMethodChange}
            >
              <SelectTrigger
                className={`w-full /bg-gray-50 py-4 ${
                  isDarkMode ? "border-0 bg-[#222]" : ""
                }`}
              >
                <SelectValue
                  className="font-bold"
                  placeholder="Select a Deposit Asset"
                />
              </SelectTrigger>
              <SelectContent
                className={`border-0 ${
                  isDarkMode ? "bg-[#222] text-white" : ""
                }`}
              >
                <SelectGroup>
                  <SelectLabel>Recommended</SelectLabel>
                  {deposits.map((option) => (
                    <>
                      <SelectItem key={option.address} value={option.short}>
                        <div className="flex py-2">
                          {" "}
                          <div className="mr-2">
                            <Image
                              src={option.image}
                              alt=""
                              width={20}
                              height={20}
                            />
                          </div>
                          <div className="font-bold">{option.coinName}</div>
                        </div>
                      </SelectItem>
                    </>
                  ))}
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Others Assets</SelectLabel>
                  {othermeans.map((option) => (
                    <>
                      <SelectItem key={option.address} value={option.short}>
                        <div className="flex py-2">
                          {" "}
                          <div className="mr-2">
                            <Image
                              src={option.image}
                              alt=""
                              width={20}
                              height={20}
                            />
                          </div>
                          <div className="font-bold">{option.coinName}</div>
                        </div>
                      </SelectItem>
                    </>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <div className="">
              {" "}
              {selectedAddress && (
                <div
                  className={`flex items-center /bg-gray-50 px-2 py-1 my my-4 rounded-lg  ${
                    isDarkMode ? "bg-[#222]" : "border"
                  }`}
                >
                  <input
                    type="text"
                    value={selectedAddress}
                    readOnly
                    className={`w-full px-2 py-3 text-sm rounded-lg /bg-gray-50 font-bold  ${
                      isDarkMode ? "text-white/60 bg-[#222]" : "text-black/60"
                    }`}
                  />
                  <button onClick={handleCopyAddress} className="ml-3">
                    {isCopied ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              )}
            </div>

            <div className="input my-3 flex  items-center">
              <div className="w-full">
                <input
                  type="number"
                  value={amountInUSD}
                  onChange={handleAmountChange}
                  className={`w-full px-4 py-4 text-sm placeholder:text-muted-foreground rounded-lg /bg-gray-50 font-bold  ${
                    isDarkMode ? "bg-[#222]" : "border"
                  }`}
                  placeholder="Enter amount in USD"
                  disabled={!selectedMethod}
                />
              </div>
            </div>

            {amountInUSD && amountInUSD != 0 && (
              <div className="mt-3 mb-6 font-semibod text-xs text-muted-foreground font-bold">
                1 {selectedMethod} = ${currentPrice} ~ ${amountInUSD} ={" "}
                {equivalentInCrypto} {selectedMethod}
              </div>
            )}
            <Dialog>
              <DialogTrigger className="w-full">
                {amountInUSD && (
                  <div
                    className={`flex-cont ${
                      amountInUSD == 0
                        ? "/bg-gray-200 text-gray-500"
                        : "bg-[#0066b1] text-white"
                    }   py-4 cursor-pointer capitalize flex items-center font-bold  px-3 justify-center rounded-lg fon-bold text-sm w-full`}
                  >
                    <button className="capitalize">
                      Confirm {selectedMethod && selectedMethod} Deposit
                    </button>
                  </div>
                )}
              </DialogTrigger>
              <DialogContent
                className={`w-[90%] rounded-lg overflow-hidden ${
                  isDarkMode ? `${baseColor} text-white border-0` : ""
                }`}
              >
                <DialogHeader className="font-bold capitalize">
                  Confirm {equivalentInCrypto !== NaN && equivalentInCrypto}{" "}
                  Deposit
                  {amountInUSD && (
                    <span>
                      {" "}
                      of {selectedMethod} to get ${amountInUSD}
                    </span>
                  )}
                </DialogHeader>

                <div className="address mt-5">
                  <label
                    htmlFor="address"
                    className="capitalize text-sm font-semibold"
                  >
                    {selectedMethod} Deposit Address
                  </label>
                  <div
                    className={`flex items-center /bg-gray-50 px-2 py-1 my my-4 rounded-lg  ${
                      isDarkMode ? "bg-[#111]" : "border"
                    }`}
                  >
                    <input
                      type="text"
                      value={selectedAddress}
                      readOnly
                      className={`w-full px-2 py-3 text-sm rounded-lg /bg-gray-50 font-bold  ${
                        isDarkMode ? "text-white/60 bg-[#111]" : "text-black/60"
                      }`}
                    />
                    <button onClick={handleCopyAddress} className="ml-3">
                      {isCopied ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 mr-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 mr-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                {showDropzone && (
                  <label
                    htmlFor="address"
                    className="capitalize text-sm font-semibold mt-5"
                  >
                    Upload Deposit Proof (screenshot)
                  </label>
                )}
                {showDropzone && (
                  <div
                    {...getRootProps({ className: "dropzone" })}
                    className={` py-4 overflow-hidden  px-2 rounded-lg /bg-gray-50 cursor-pointer ${
                      isDarkMode ? "bg-[#111] text-white/60" : "border"
                    }`}
                  >
                    <input {...getInputProps()} />
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 mx-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                        />
                      </svg>
                      <div className="text-sm font-bold capitalize">
                        {isUploading
                          ? "Uploading screenshot, please wait"
                          : files.length !== 0
                          ? files.map((file, index) => (
                              <div key={index}>{file.path}</div>
                            ))
                          : "Click here to upload screenshot of transaction"}
                      </div>
                    </div>
                  </div>
                )}
                <div
                  className={`message text-xs ${
                    isDarkMode ? "text-white/60" : ""
                  }`}
                >
                  <p>
                    <strong
                      className={`font-bold ${
                        isDarkMode ? "text-white/80" : ""
                      }`}
                    >
                      Note:
                    </strong>{" "}
                    Make sure you deposit the exact amount specified to avoid
                    deposit verification failure.{" "}
                  </p>
                </div>

                {!showDropzone && (
                  <div
                    className={`flex-cont 
                  
                   bg-[#0066b1] text-white
                   py-4 cursor-pointer capitalize flex items-center font-bold  px-3 justify-center rounded-lg fon-bold text-sm w-full`}
                    onClick={handleVerifyDeposits}
                  >
                    <button className="capitalize">Confirm Deposit</button>
                  </div>
                )}
                <DialogClose>
                  {uploadSuccess && (
                    <div
                      className={`flex-cont 
                  
                   bg-[#0066b1] text-white
                   py-4 cursor-pointer capitalize flex items-center font-bold  px-3 justify-center rounded-lg fon-bold text-sm w-full`}
                      onClick={handleToast}
                    >
                      <button className="capitalize">
                        {`Verify deposit of $${amountInUSD}`}
                      </button>
                    </div>
                  )}
                </DialogClose>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
    </div>
  );
}
