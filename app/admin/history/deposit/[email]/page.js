import React from "react";
import DepositTable from "../../../../../components/admin/DepositTable/DepositTable";
export default function page({ params }) {
  const { email } = params;
  return (
    <div>
      <DepositTable em={email} />
    </div>
  );
}
