import React from "react";
import WithdrawalTable from "../../../../../components/admin/WithdrawTable/WithdrawTable";
export default function page({ params }) {
  const { email } = params;
  return (
    <div>
      <WithdrawalTable em={email} />
    </div>
  );
}
