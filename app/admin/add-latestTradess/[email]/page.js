import React from "react";
import AddLatestTrades from "../../../../components/admin/AddLatestTrades/AddLatestTrades";

export default function page({ params }) {
  const { email } = params;
  return <AddLatestTrades data={email} />;
}
