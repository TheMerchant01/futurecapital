import React from "react";
import ManageUsersTable from "../../../components/admin/ManageUsersTable/ManageUsersTable";

export default function ManageUsersPage() {
  return (
    <div className="space-y-6">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Manage Users
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          View and manage all platform users, their accounts, and activities.
        </p>
      </div>
      <ManageUsersTable />
    </div>
  );
}
