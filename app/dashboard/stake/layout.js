"use client";
import React from "react";
import StakingHeader from "../../../components/dashboard/stake/StakingHeader";
import { useUserData } from "../../../contexts/userrContext";
import { useTheme } from "../../../contexts/themeContext";
import { Skeleton } from "../../../components/ui/skeleton";

export default function Layout({ children }) {
  const { details } = useUserData();
  const { isDarkMode } = useTheme();
  return (
    <div>
      <StakingHeader />
      {details === 0 ? (
        <div className="p-4 mt-4">
          <Skeleton
            className={`  h-10 mb-4 ${
              isDarkMode ? "bg-[#333]" : "bg-gray-200/80"
            }`}
          />
          <Skeleton
            className={`  h-60 mb-4 ${
              isDarkMode ? "bg-[#333]" : "bg-gray-200/80"
            }`}
          />
          <Skeleton
            className={`  h-60 ${isDarkMode ? "bg-[#333]" : "bg-gray-200/80"}`}
          />
        </div>
      ) : (
        <div className="px-4">{children}</div>
      )}
    </div>
  );
}
