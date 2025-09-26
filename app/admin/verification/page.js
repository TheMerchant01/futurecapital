"use client";
import React, { useState } from "react";
import KYCTable from "../../../components/admin/KYCTable/KYCTable";
import WithdrawalFeeTable from "../../../components/admin/WithdrawalFeeTable/WithdrawalFeeTable";
import AdminSettings from "../../../components/admin/AdminSettings/AdminSettings";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { Settings, UserCheck, DollarSign, Shield } from "lucide-react";

export default function VerificationPage() {
  const [activeTab, setActiveTab] = useState("settings");

  return (
    <div className="space-y-6">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Verification & Fees Management
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Manage KYC verifications, withdrawal fees, and system settings
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-6">
          <TabsTrigger
            value="settings"
            className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
          >
            <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Settings</span>
            <span className="sm:hidden">Settings</span>
          </TabsTrigger>
          <TabsTrigger
            value="kyc"
            className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
          >
            <UserCheck className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">KYC Verification</span>
            <span className="sm:hidden">KYC</span>
          </TabsTrigger>
          <TabsTrigger
            value="fees"
            className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
          >
            <DollarSign className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Withdrawal Fees</span>
            <span className="sm:hidden">Fees</span>
          </TabsTrigger>
          <TabsTrigger
            value="overview"
            className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
          >
            <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Overview</span>
            <span className="sm:hidden">Overview</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="space-y-6">
          <AdminSettings />
        </TabsContent>

        <TabsContent value="kyc" className="space-y-6">
          <KYCTable />
        </TabsContent>

        <TabsContent value="fees" className="space-y-6">
          <WithdrawalFeeTable />
        </TabsContent>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Quick Stats Cards */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total KYC Requests
                  </p>
                  <p className="text-2xl font-bold text-gray-900">-</p>
                </div>
                <UserCheck className="w-8 h-8 text-blue-600" />
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Pending Fee Payments
                  </p>
                  <p className="text-2xl font-bold text-gray-900">-</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Approved Today
                  </p>
                  <p className="text-2xl font-bold text-gray-900">-</p>
                </div>
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => setActiveTab("kyc")}
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <UserCheck className="w-5 h-5 text-blue-600" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">
                    Review KYC Requests
                  </p>
                  <p className="text-sm text-gray-600">
                    Approve or decline verification requests
                  </p>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("fees")}
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <DollarSign className="w-5 h-5 text-green-600" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">
                    Process Fee Payments
                  </p>
                  <p className="text-sm text-gray-600">
                    Approve or decline withdrawal fees
                  </p>
                </div>
              </button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
