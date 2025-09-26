/* eslint-disable react/no-unescaped-entities */
"use client";
import { useTheme } from "../../../contexts/themeContext";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { FormProvider } from "../../../contexts/formContext";

import Login from "./Login";
import Signup from "./SignUp";
import { useState } from "react";

export default function AuthUi() {
  const [defval, setDefval] = useState("signup");
  const { isDarkMode, baseColor } = useTheme();

  return (
    <>
      <DialogContent
        className={`border-0 transition-all focus:outline-none text-gray-900 rounded-xl w-[90%] md:w-[60%] lg:w:-[20%] ${
          isDarkMode ? `${baseColor} text-gray-200 border-white/10 /border` : ""
        }`}
      >
        <DialogHeader className="text-white">
          <DialogTitle className=""></DialogTitle>
        </DialogHeader>
        <Tabs defaultValue={defval} className="transition-all">
          <TabsList
            className={`w-full grid grid-cols-2  font-bold ${
              isDarkMode ? "bg-[#111]" : "bg-gray-100"
            }`}
          >
            <TabsTrigger
              onClick={() => setDefval("signup")}
              value="signup"
              className={` ${
                isDarkMode
                  ? "data-[state=active]:bg-[#333] data-[state=active]:text-gray-200"
                  : "data-[state=active]:bg-gray-200 data-[state=active]:text-black"
              } data-[state=active]:font-bold `}
            >
              Sign Up
            </TabsTrigger>
            <TabsTrigger
              onClick={() => setDefval("login")}
              value="login"
              className={` ${
                isDarkMode
                  ? "data-[state=active]:bg-[#333] data-[state=active]:text-gray-200"
                  : "data-[state=active]:bg-gray-200 data-[state=active]:text-black"
              } data-[state=active]:font-bold `}
            >
              {" "}
              Log In
            </TabsTrigger>
          </TabsList>
          <TabsContent value="signup" className="mt-8">
            <Signup />
          </TabsContent>
          <TabsContent value="login" className="mt-8">
            <Login />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </>
  );
}
