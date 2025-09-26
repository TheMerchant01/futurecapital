import React from "react";
import AddDepositHistory from "../../../../components/admin/AddDepositHistory/AddDepositHistory";

export default function page({ params }) {
  const { email } = params;
  return <AddDepositHistory data={email} />;
}
