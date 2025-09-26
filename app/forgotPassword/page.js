"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { InfinitySpin } from "react-loader-spinner";
import { useTheme } from "../../contexts/themeContext";
import toast from "react-hot-toast";
import axios from "axios";
import { Toaster } from "react-hot-toast";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email")
    .nonempty("Email is required"),
});

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isDarkMode, baseColor } = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/forgot-password/api", data);

      setIsLoading(false);

      if (response.status === 200) {
        toast.success("Password reset link sent to your email");
      } else {
        toast.error(result.message || "An error occurred");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("An error occurred. Please try again.");
      console.error("Forgot Password Submit Error:", error);
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
          <h2 className={`font-bold text-2xl`}>Reset Your Password</h2>
          <p className={`text-sm mt-3`}>
            Enter your email address, and we&apos;ll send you a link to reset
            your password.
          </p>
        </div>

        <div>
          <Label htmlFor="email" className={`block font-bold text-sm mb-2`}>
            Email Address
          </Label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <>
                <Input
                  type="email"
                  id="email"
                  placeholder="johndoe@example.com"
                  className={`w-full px-4 py-1 h-11 rounded-lg text-sm ${
                    isDarkMode
                      ? "bg-[#111111] text-gray-200 border-none"
                      : "border text-black"
                  } focus:border-none transition-all`}
                  {...field}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1 font-semibold">
                    {errors.email.message}
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
            "Send Reset Link"
          )}
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
