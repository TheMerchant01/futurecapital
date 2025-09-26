"use client";
import React from "react";
import { InfinitySpin } from "react-loader-spinner";
import { useTheme } from "../../../contexts/themeContext";
import { useUserData } from "../../../contexts/userrContext";

export default function Btcpayment({
  handleInputChange,
  formErrors,
  handleSubmit,
  formData,
  loading,
}) {
  const { isDarkMode } = useTheme();
  const { details } = useUserData();

  return (
    <div
      className={`bitcoin-payment-form p-4 ${
        isDarkMode ? "text-white/80" : ""
      }`}
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-1 mt-3">
          <label htmlFor="withdrawalAccount" className="font-bold text-sm py-2">
            Account to Withdraw From
          </label>
        </div>
        <select
          id="withdrawalAccount"
          name="withdrawalAccount"
          value={formData.withdrawalAccount}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 h-11 mb-5 text-xs rounded-md ${
            isDarkMode ? "bg-[#111]" : "border"
          } bg-gry-50 font-bold focus:outline-none ${
            formErrors.withdrawalAccount ? "border-red-500 border" : ""
          }`}
        >
          <option value="mainAccount">
            Main Account-(${details.tradingBalance.toLocaleString()})
          </option>
          <option value="profit">
            Profit-(${details.planBonus.toLocaleString()})
          </option>
          <option value="totalWon">
            Total Won-(${details.totalWon.toLocaleString()})
          </option>
        </select>

        <div className="mb-1 mt-3">
          <label htmlFor="cryptoType" className="font-bold text-sm py-2">
            Select Crypto
          </label>
        </div>
        <select
          id="cryptoType"
          name="cryptoType"
          required
          value={formData.cryptoType}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 h-11 mb-5 text-xs rounded-md ${
            isDarkMode ? "bg-[#111]" : "border"
          } bg-gry-50 font-bold focus:outline-none ${
            formErrors.cryptoType ? "border-red-500 border" : ""
          }`}
        >
          <option value="BTC">Bitcoin (BTC)</option>
          <option value="ETH">Ethereum (ETH)</option>
          <option value="LTC">Litecoin (LTC)</option>
          <option value="XRP">Ripple (XRP)</option>
          <option value="USDT">Tether (USDT)</option>
        </select>

        <input
          type="text"
          id="walletAddress"
          name="walletAddress"
          value={formData.walletAddress}
          onChange={handleInputChange}
          placeholder="Enter Wallet Address"
          className={`w-full px-4 py-3 h-11 text-xs rounded-md mb-4 ${
            isDarkMode ? "bg-[#111]" : "border"
          } bg-gry-50 font-bold focus:outline-none ${
            formErrors.walletAddress ? "border-red-500 border" : ""
          }`}
        />
        {formErrors.walletAddress && (
          <p className="text-red-500 text-xs mt-[-10px] mb-2">
            {formErrors.walletAddress}
          </p>
        )}

        <div className="mb-1 mt-3">
          <label htmlFor="amount" className="font-bold text-sm py-2">
            Enter Amount (USD)
          </label>
        </div>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleInputChange}
          placeholder="Enter Amount"
          className={`w-full px-4 py-3 h-11 text-xs rounded-md ${
            isDarkMode ? "bg-[#111]" : "border"
          } bg-gry-50 font-bold focus:outline-none ${
            formErrors.amount ? "border-red-500 border" : ""
          }`}
        />
        {formErrors.amount && (
          <p className="text-red-500 font-semibold text-xs mt-1">
            {formErrors.amount}
          </p>
        )}

        <div className="mb-1 mt-3">
          <label htmlFor="password" className="font-bold text-sm py-2">
            Password Verification
          </label>
        </div>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Enter Password"
          className={`w-full px-4 py-3 h-11 text-xs rounded-md ${
            isDarkMode ? "bg-[#111]" : "border"
          } bg-gry-50 font-bold focus:outline-none ${
            formErrors.password ? "border-red-500 border" : ""
          }`}
        />
        {formErrors.password && (
          <p className="text-red-500 font-semibold text-xs mt-1">
            {formErrors.password}
          </p>
        )}

        <button
          disabled={loading}
          type="submit"
          className="w-full px-4 mt-4 text-sm rounded-lg flex items-center justify-center bg-[#00a055] text-white font-bold hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          {loading ? (
            <InfinitySpin width="100" color="#ffffff" />
          ) : (
            <div className="py-3">Withdraw</div>
          )}
        </button>
      </form>
    </div>
  );
}
