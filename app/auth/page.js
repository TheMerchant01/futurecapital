"use client";
import React from "react";
import { useTheme } from "../../contexts/themeContext";
import Auth from "../../components/main/AuthUi/Auth";
import { FormProvider } from "../../contexts/formContext";
import { Toaster } from "react-hot-toast";
import SmartsuppChat from '../../components/utils/SmartsuppChat';
import GoogleTranslate from "../../components/Translator/GoogleTranslator";

export default function Page() {
  const { isDarkMode, baseColor } = useTheme();
  return (
    <>
       <SmartsuppChat />
      <GoogleTranslate isDarkMode={isDarkMode} />
      <FormProvider>
        <div
          className={`w-full h-screen flex justify-center items-center ${
            isDarkMode ? `${baseColor} text-white` : ""
          }`}
        >
          <Auth />
        </div>
        <Toaster />
      </FormProvider>
    </>
  );
}
