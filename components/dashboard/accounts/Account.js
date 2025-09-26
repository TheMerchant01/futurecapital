/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import AccountSect from "../Livetrades/AccountSect";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { useTheme } from "../../../contexts/themeContext";

export default function Account() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    if (name === "currentPassword") {
      setCurrentPassword(value);
    } else if (name === "newPassword") {
      setNewPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement password change logic here
  };
  const { isDarkMode } = useTheme();
  return (
    <div className="">
      <AccountSect />
      <div className="p-4">
        <div
          className={`shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-xl p-5 ${
            isDarkMode
              ? "bg-[#111] border border-white/10 rounded-md text-white/80"
              : ""
          }`}
        >
          <h2 className="text-xl font-bold mb-6">Settings</h2>
          <form onSubmit={handleSubmit} className="text-sm">
            <Label htmlFor="currentPassword" className="block mb-2 font-bold">
              Current Password
            </Label>
            <Input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={currentPassword}
              placeholder="Current password"
              onChange={handlePasswordChange}
              className={`w-full px-4 py-3 text-sm rounded-md placeholder:text-muted-foreground font-bold  ${
                isDarkMode ? "bg-[#222] border-0" : "bg-gray-50 border"
              }`}
            />

            <Label htmlFor="newPassword" className="block mt-4 mb-2 font-bold">
              New Password
            </Label>
            <Input
              type="password"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              placeholder="New password"
              onChange={handlePasswordChange}
              className={`w-full px-4 py-3 text-sm rounded-md placeholder:text-muted-foreground font-bold  ${
                isDarkMode ? "bg-[#222] border-0" : "bg-gray-50 border"
              }`}
            />

            <Label
              htmlFor="confirmPassword"
              className="block mt-4 mb-2 font-bold"
            >
              Confirm Password
            </Label>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Current New password"
              onChange={handlePasswordChange}
              className={`w-full px-4 py-3 text-sm rounded-md placeholder:text-muted-foreground font-bold  ${
                isDarkMode ? "bg-[#222] border-0" : "bg-gray-50 border"
              }`}
            />

            <button
              disabled={!currentPassword && !newPassword && !confirmPassword}
              type="submit"
              className="w-full px-4 py-3 cursor-pointer mt-4 text-sm rounded-lg bg-[#0066b1] text-white font-bold  focus:outline-none "
            >
              Save Changes
            </button>
          </form>
          <div
            className={`message  border border-red-600 text-red-600 rounded-md p-3 mt-4 text-sm ${
              isDarkMode ? "bg-red-500/5" : "bg-red-50"
            }`}
          >
            <article>
              <b className="font-bold">Note:</b> You're not able to change your
              password until after 15 days of account creation. We already
              employ advanced security measures so your account is safe with us
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
