"use client";
import { useEffect, useState } from "react";
import { DataTableDemo } from "../../../app/admin/data-table";

export default function DT({ data, setData }) {
  return (
    <>
      <div className="px-3 mx-auto mt-8 rounded-md border">
        <DataTableDemo data={data} setData={setData} />
      </div>
    </>
  );
}
