"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export default function AdminNav() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Overview",
      href: "/admin/overview",
      icon: LayoutDashboard,
      description: "Dashboard metrics and recent activity",
    },
    {
      name: "Manage Users",
      href: "/admin/manage-users",
      icon: Users,
      description: "View and manage all users",
    },
    {
      name: "Verification",
      href: "/admin/verification",
      icon: UserCheck,
      description: "KYC and fee management",
    },
    {
      name: "Edit Address",
      href: "/admin/edit-address",
      icon: CreditCard,
      description: "Manage crypto addresses",
    },
  ];

  return (
    <nav className="w-full px-6 py-4 fixed z-50 shadow-lg bg-white border-b border-gray-200">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <LayoutDashboard className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">
              Future Capital Market
            </h1>
            <p className="text-xs sm:text-sm text-gray-600">Admin Dashboard</p>
          </div>
          <div className="sm:hidden">
            <h1 className="text-lg font-bold text-gray-900">FCM</h1>
            <p className="text-xs text-gray-600">Admin</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }
                `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.name}</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              <LogOut className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700 hidden sm:block">
                Exit Admin
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div
                    className={`
                    flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200
                    ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
