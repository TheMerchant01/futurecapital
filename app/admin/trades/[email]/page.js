import React from "react";
import TradesTable from "../../../../components/admin/TradesTable/TradesTable";

export default function page({ params }) {
  const { email } = params;
  return (
    <div>
      <TradesTable em={email} />
    </div>
  );
}
