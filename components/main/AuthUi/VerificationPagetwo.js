/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { InfinitySpin } from "react-loader-spinner";
import { Label } from "../../ui/label";
import { setCookie } from "nookies";
import { useTheme } from "../../../contexts/themeContext";
import { useFormContext } from "../../../contexts/formContext";
import { toast } from "react-hot-toast";

export default function VerificationPage({ formDatas }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const { isDarkMode, baseColor } = useTheme();

  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    lalreadysent,
    lsetSent,
    countdown,
    setCountdown,
    cookieVar,
    cookieVar1,
    cookieVar2,
  } = useFormContext();

  useEffect(() => {
    const sendInitialCode = async () => {
      if (lalreadysent) return;
      try {
        const response = await fetch("/verifyemail/sendcode/api", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: formDatas.email }),
        });
        if (response.status === 200) toast.success("code sent");

        if (response.status !== 200) {
          // Handle error (optional)
          console.error("Failed to send initial code");
        }
      } catch (error) {
        console.error(error);
      }
    };

    sendInitialCode();
    lsetSent(true);
  }, []);
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

  const handleResendCode = async () => {
    setError("");
    setIsLoading(true);
    try {
      const response = await fetch("/verifyemail/sendcode/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formDatas.email }),
      });

      if (response.status === 200) {
        if (response.status === 200) toast.success("code sent");

        setCountdown(120);
        setIsResendDisabled(true);
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
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
        body: JSON.stringify({
          email: formDatas.email,
          code: verificationCode,
        }),
      });

      if (response.status === 200) {
        // Handle successful verification
        toast.success("Sign in successful, redirecting...");
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
      }
      if (response.status !== 200) {
        // Handle successful verification
        setError("Please check code and try again");
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
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
        <strong className="font-bold">{formDatas.email}</strong>. Please check
        your mailbox or check your provided email address for mistakes or
        errors.
      </div>
      <div>
        <Label
          htmlFor="verificationCode"
          className="block  font-bold text-sm mb-2"
        >
          Enter Verification Code
        </Label>
        <Input
          type="text"
          id="verificationCode"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          placeholder="Enter the code sent to your email"
          className={`w-full px-4 py-1 bg-gra-50 ${
            isDarkMode
              ? "bg-[#111111] text-gray-200 border-none"
              : "border text-black"
          }  h-11 focus:border-none transition-all rounded-lg text-sm`}
        />
        {error && <div className="text-sm mt-2 text-red-600">{error}</div>}

        <Button
          type="button"
          className="w-full bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-red-800 via-red-600 to-orange-700 text-white h-11 py-5 px-4 rounded-lg mt-4"
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
