/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { InfinitySpin } from "react-loader-spinner"; // Make sure to import the loader
import { setCookie } from "nookies";
import { useTheme } from "../../../contexts/themeContext";
import { useFormContext } from "../../../contexts/formContext";
import { toast } from "react-hot-toast";

export default function VerificationPage({ Label, Input, Button, formData }) {
  const { isDarkMode, baseColor } = useTheme();
  const {
    isInitialSend,
    setIsInitialSend,
    alreadysent,
    setSent,
    countdown,
    setCountdown,
    cookieVar,
    cookieVar1,
    cookieVar2,
  } = useFormContext();

  const [error, setError] = useState("");
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [verificationCode, setVerificationCode] = useState("");

  const [isLoading, setIsLoading] = useState(false); // Loading state
  const router = useRouter();

  const sendCode = async () => {
    if (alreadysent) return;
    if (!isInitialSend) {
      setIsLoading(true);
    }
    try {
      await fetch("/verifyemail/sendcode/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      });

      if (response.status === 200) toast.success("code sent");
    } catch (error) {
      console.error(error);
    }
    if (!isInitialSend) {
      setIsLoading(false);
    }
    setIsInitialSend(false); // Set to false after the first send
    setSent(true);
  };

  const handleVerifyCode = async () => {
    setError("");
    setIsLoading(true);
    try {
      const response = await fetch("/verifyemail/verifycode/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email, code: verificationCode }),
      });
      const result = await response.json();

      if (result.success) {
        // Handle successful verification
        if (response.status === 200)
          toast.success("Sign up successful, redirecting...");

        await setCookie(null, "token", cookieVar, {
          httpOnly: false,
          secure: process.env.NODE_ENV === "production", // Use 'secure' in production
          path: "/", // Adjust the path if needed
          maxAge: 60 * 60 * 24 * 5, // Token expires in 3 days
        });
        await setCookie(null, "email", cookieVar1, {
          httpOnly: false,
          secure: process.env.NODE_ENV === "production", // Use 'secure' in production
          path: "/", // Adjust the path if needed
          maxAge: 60 * 60 * 24 * 5, // Token expires in 3 days
        });
        await setCookie(null, "role", cookieVar2, {
          httpOnly: false,
          secure: process.env.NODE_ENV === "production", // Use 'secure' in production
          path: "/", // Adjust the path if needed
          maxAge: 60 * 60 * 24 * 5, // Token expires in 3 days
        });

        if (cookieVar2 == "admin") router.push("/admin");
        if (cookieVar2 == "user") router.push("/dashboard");
      } else {
        // Handle failed verification
        setError("Please check code and try again");
      }
    } catch (error) {
      console.error("verification error");
    }
    setIsLoading(false);
  };

  const handleResendCode = async () => {
    setError("");
    setIsLoading(true);
    try {
      const response = await fetch("/verifyemail/sendcode/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      });

      if (response.status === 200) {
        toast.success("code sent");

        setCountdown(120);
        setIsResendDisabled(true);
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isResendDisabled && countdown > 0) {
      const timerId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(timerId);
    }

    if (countdown === 0) {
      setIsResendDisabled(false);
    }
  }, [isResendDisabled, countdown]);

  useEffect(() => {
    sendCode();
  }, []);

  const formatTime = (time) => {
    const seconds = time % 60;
    return `${String(seconds).padStart(2, "0")}s`;
  };

  return (
    <>
      <div
        className={`message  add text-sm mb-8 ${
          isDarkMode ? "text-gray-200" : "text-gray-800"
        }`}
      >
        We sent a 6 digit verification code to{" "}
        <strong className="font-bold">{formData.email}</strong>. Please check
        your mailbox or check your provided email address for mistakes or errors
      </div>
      <div>
        <Label
          htmlFor="verificationCode"
          className="block font-bold  text-sm mb-2"
        >
          Enter Verification Code
        </Label>
        <Input
          type="text"
          id="verificationCode"
          placeholder="Enter the code sent to your email"
          className={`w-full px-4 py-1 bg-gra-50 ${
            isDarkMode
              ? "bg-[#111111] text-gray-200 border-none"
              : "border text-black"
          }  h-11 focus:border-none transition-all rounded-lg text-sm`}
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
        />
        {error && <div className="text-sm mt-2 text-red-600">{error}</div>}

        <Button
          type="button"
          className="w-full bg-[#0066b1] text-white h-11 py-5 px-4 rounded-lg mt-4"
          onClick={handleVerifyCode}
          disabled={isLoading}
        >
          {isLoading ? <InfinitySpin width="100" color="#ffffff" /> : "Verify"}
        </Button>
        <Button
          type="button"
          className={`w-full bg-transparent hover:bg-transparent font-bold py-4 px-4 rounded-lg mt-2 ${
            isDarkMode ? "text-gray-200" : "text-black"
          }`}
          onClick={handleResendCode}
          disabled={isResendDisabled || isLoading}
        >
          {isResendDisabled
            ? `Resend Code (${formatTime(countdown)})`
            : "Resend Code"}
        </Button>
      </div>
    </>
  );
}
