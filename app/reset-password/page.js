"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { InfinitySpin } from "react-loader-spinner";
import { useTheme } from "../../contexts/themeContext";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { Toaster } from "react-hot-toast";

const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .nonempty("Password is required"),
    confirmPassword: z.string().nonempty("Confirm Password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isDarkMode, baseColor } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/forgot-password/api", {
        email: email,
        token: token,
        newPassword: data.newPassword,
      });

      setIsLoading(false);

      if (response.status === 200) {
        toast.success("Password reset successful! Redirecting to login...");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        toast.error(result.message || "An error occurred");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("An error occurred. Please try again.");
      console.error("Reset Password Submit Error:", error);
    }
  };

  return (
    <div
      className={`w-full min-h-[100vh] flex items-center justify-center p-6 ${
        isDarkMode ? `${baseColor} text-gray-100` : "bg-white text-black"
      }`}
    >
      <Toaster position="top-center" reverseOrder={false} />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="message mb-8">
          <h2 className={`font-bold text-2xl`}>Set New Password</h2>
          <p className={`text-sm mt-3`}>
            Enter your new password below to reset your account password.
          </p>
        </div>

        <div>
          <Label
            htmlFor="newPassword"
            className={`block font-bold text-sm mb-2`}
          >
            New Password
          </Label>
          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <>
                <Input
                  type="password"
                  id="newPassword"
                  placeholder="Enter new password"
                  className={`w-full px-4 py-1 h-11 rounded-lg text-sm ${
                    isDarkMode
                      ? "bg-[#111111] text-gray-200 border-none"
                      : "border text-black"
                  } focus:border-none transition-all`}
                  {...field}
                />
                {errors.newPassword && (
                  <p className="text-sm text-red-500 mt-1 font-semibold">
                    {errors.newPassword.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        <div>
          <Label
            htmlFor="confirmPassword"
            className={`block font-bold text-sm mb-2`}
          >
            Confirm Password
          </Label>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <>
                <Input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm new password"
                  className={`w-full px-4 py-1 h-11 rounded-lg text-sm ${
                    isDarkMode
                      ? "bg-[#111111] text-gray-200 border-none"
                      : "border text-black"
                  } focus:border-none transition-all`}
                  {...field}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500 mt-1 font-semibold">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className={`w-full h-11 font-bold bg-[#0066b1] text-white rounded-lg flex items-center justify-center ${
            isLoading ? "opacity-70" : ""
          }`}
        >
          {isLoading ? (
            <InfinitySpin width="100" color="#ffffff" />
          ) : (
            "Reset Password"
          )}
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
