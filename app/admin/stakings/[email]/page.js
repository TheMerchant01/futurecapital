import React from "react";
import StakingTable from "../../../../components/admin/StakingTable/StakingTable";

export default function page({ params }) {
  const { email } = params;
  return (
    <div>
      <StakingTable em={email} />
    </div>
  );
}
