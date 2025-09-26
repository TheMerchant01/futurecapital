import Link from "next/link";
import React from "react";

export default function Nav() {
  return (
    <nav className="w-full px-4 py-4 fixed z-50 shadow-muted shadow-lg bg-white">
      <div className="flex items-center justify-between">
        <div className="name-section font-bold text-lg ">
          Future Capital Market | Admin
        </div>
        <div className="name-section flex items-center gap-x-3">
          <Link passHref href="/dashboard">
            <div className="bg-red-50/80 p-3 rounded-full">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 text-red-700"
              >
                <path d="M4 5h12v7H4V5z" />
                <path
                  fillRule="evenodd"
                  d="M1 3.5A1.5 1.5 0 012.5 2h15A1.5 1.5 0 0119 3.5v10a1.5 1.5 0 01-1.5 1.5H12v1.5h3.25a.75.75 0 010 1.5H4.75a.75.75 0 010-1.5H8V15H2.5A1.5 1.5 0 011 13.5v-10zm16.5 0h-15v10h15v-10z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </Link>
          <Link passHref href="/admin/verification">
            <div className="bg-blue-50/80 p-3 rounded-full md:rounded-md flex items-center gap-x-2">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 text-blue-700"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="font-bold text-sm hidden md:block">Verification</p>
            </div>
          </Link>
          <Link passHref href="/admin/edit-address">
            <div className="bg-black/5 p-3 rounded-full md:rounded-md flex items-center gap-x-2">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
              </svg>
              <p className="font-bold text-sm hidden md:block">Edit Address</p>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
