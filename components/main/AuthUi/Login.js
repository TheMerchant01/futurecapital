"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { InfinitySpin } from "react-loader-spinner";
import { z } from "zod";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import VerificationPage from "./VerificationPagetwo";
import { useTheme } from "../../../contexts/themeContext";
import { useFormContext } from "../../../contexts/formContext";
import toast from "react-hot-toast";
import { setCookie } from "nookies";
import { useRouter } from "next/navigation";

const loginFormSchema = z.object({
  email: z
    .string()
    .email("Not a valid email")
    .nonempty("Please provide an email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .nonempty("No! you need a password"),
});
const Login = () => {
  const [showPass, setShowpass] = useState(false);
  const router = useRouter();

  const {
    showVerificationPage,
    setShowVerificationPage,
    setCookieVar,
    setCookieVar1,
    setCookieVar2,
  } = useFormContext();
  const { formDatas, setFormDatas } = useFormContext();
  const [isLoading, setIsLoading] = useState(false); // Add this line
  const { isDarkMode, baseColor } = useTheme();

  const {
    setValue,
    control: loginControl,
    handleSubmit: loginHandleSubmit,
    setError, // Don't forget to destructure setError
    formState: loginFormState,
  } = useForm({ mode: "onChange", resolver: zodResolver(loginFormSchema) });
  const handleShowPassword = () => {
    setShowpass(!showPass);
  };
  const handleLoginSubmit = async (data) => {
    setFormDatas(data);
    setIsLoading(true);

    try {
      const response = await fetch("/login/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setIsLoading(false);
      if (response.status === 200) {
        // Set the authentication token as a cookie

        localStorage.setItem("email", result.email);

        // Handle successful verification
        toast.success("Sign in successful, redirecting...");
        await setCookie(null, "token", result.token, {
          httpOnly: false,
          secure: process.env.NODE_ENV === "production", // Use 'secure' in production
          path: "/", // Adjust the path if needed
          maxAge: 60 * 60 * 24 * 5, // Token expires in 3 days
        });
        await setCookie(null, "email", result.email, {
          httpOnly: false,
          secure: process.env.NODE_ENV === "production", // Use 'secure' in production
          path: "/", // Adjust the path if needed
          maxAge: 60 * 60 * 24 * 5, // Token expires in 3 days
        });
        await setCookie(null, "role", result.role, {
          httpOnly: false,
          secure: process.env.NODE_ENV === "production", // Use 'secure' in production
          path: "/", // Adjust the path if needed
          maxAge: 60 * 60 * 24 * 5, // Token expires in 3 days
        });

        if (result.role == "admin") router.push("/admin");
        if (result.role == "user") router.push("/dashboard");
      } else {
        setError("password", {
          type: "manual",
          message: "Incorrect details",
        });
      }
    } catch (error) {
      setIsLoading(false);
      setError("password", {
        type: "manual",
        message: "An error occurred",
      });
      console.error(error);
    }
  };
  useEffect(() => {
    setValue("email", formDatas.email);
    setValue("password", formDatas.password);
  }, [formDatas, setValue]);
  return (
    <>
      <form onSubmit={loginHandleSubmit(handleLoginSubmit)} className="">
        <div className="message mb-5">
          <div className=" font-bold">
            <span className="text-[#0066b1] font-black">Sign-In</span> to your
            account
          </div>
          <p
            className={`text-sm font-normal  mt-3 ${
              isDarkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Continue where you left off by logging in, we keep{" "}
            <span className="text-[#0066b1] font-black">track</span> of your
            every progress.
          </p>
        </div>
        <div className=" mt-6 mb-2">
          <Label htmlFor="email" className="block  font-bold text-sm mb-2">
            Email
          </Label>
          <Controller
            name="email"
            control={loginControl}
            render={({ field, fieldState }) => (
              <>
                <Input
                  type="email"
                  id="email"
                  value={formDatas.email}
                  onChange={(event) => {
                    setFormDatas({
                      ...formDatas,
                      email: event.target.value,
                    });
                  }}
                  placeholder="johndoe@example.com"
                  error={fieldState.error?.message}
                  className={`w-full px-4 py-1 bg-gra-50 ${
                    isDarkMode
                      ? "bg-[#111111] text-gray-200 border-none"
                      : "border text-black"
                  }  h-11 focus:border-none transition-all rounded-lg text-sm`}
                  {...field}
                />
                {fieldState.error && (
                  <p className="text-sm text-red-500 my-1 font-semibold">
                    {fieldState.error?.message}
                  </p>
                )}
              </>
            )}
          />
        </div>
        <div className="my-2">
          <div className="label_controller mb-2 flex items-center justify-between">
            <Label htmlFor="password" className="block font-bold text-sm">
              Password
            </Label>
            <div
              className="show-pass cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPass ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.091 1.092a4 4 0 00-5.557-5.557z"
                    clipRule="evenodd"
                  />
                  <path d="M10.748 13.93l2.523 2.523a9.987 9.987 0 01-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 010-1.186A10.007 10.007 0 012.839 6.02L6.07 9.252a4 4 0 004.678 4.678z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                  <path
                    fillRule="evenodd"
                    d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          </div>
          <Controller
            name="password"
            control={loginControl}
            render={({ field, fieldState }) => (
              <>
                <Input
                  type={showPass ? "text" : "password"}
                  id="password"
                  value={formDatas.password} // Set the value from formData
                  onChange={(event) => {
                    // Update the formData when the input changes
                    setFormDatas({
                      ...formDatas,
                      password: event.target.value,
                    });
                  }}
                  placeholder="Enter your password"
                  error={fieldState.error?.message}
                  className={`w-full px-4 py-1 bg-gra-50 ${
                    isDarkMode
                      ? "bg-[#111111] text-gray-200 border-none"
                      : "border text-black"
                  }  h-11 focus:border-none transition-all rounded-lg text-sm`}
                  {...field}
                />
                {fieldState.error && (
                  <p className="text-sm text-red-500 my-1 font-semibold">
                    {fieldState.error?.message}
                  </p>
                )}
              </>
            )}
          />
        </div>
        <div className="flex justify-end w-full text-right items-center mb-5 text-xs">
          <a
            href="/forgotPassword"
            className="text-[#0066b1] font-bold text-sm underline"
          >
            Forgot Password?
          </a>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 font-bold mt-5 bg-[#0066b1] text-white py-3 px-4 rounded-lg"
        >
          {isLoading ? <InfinitySpin width="100" color="#ffffff" /> : "Log In"}
        </Button>
      </form>
    </>
  );
};

export default Login;
