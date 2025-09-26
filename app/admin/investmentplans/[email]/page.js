import React from "react";
import InvestmentPlansTable from "../../../../components/admin/InvestmentPlans/InvestmentPlansTable";

export default function page({ params }) {
  const { email } = params;
  return <InvestmentPlansTable data={email} />;
}