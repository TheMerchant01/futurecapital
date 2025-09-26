"use client";
import React from "react";
import MarketsPageHeader from "../../../components/dashboard/MarketsPage/MarketsPageHeader";
import { useUserData } from "../../../contexts/userrContext";
import { Skeleton } from "../../../components/ui/skeleton";
import { useTheme } from "../../../contexts/themeContext";
export default function Layout({ children }) {
  const { details } = useUserData();
  const { isDarkMode } = useTheme();
  return (
    <main>
      <MarketsPageHeader />
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
        <div className="mt-4">{children}</div>
      )}
    </main>
  );
}
