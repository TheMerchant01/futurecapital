import React from "react";
import Livetrade from "../../../components/dashboard/Livetrades/Livetrade";
import BonusPlan from "../../../components/dashboard/bonus_plan/BonusPlan";
import Account from "../../../components/dashboard/accounts/Account";

export default function page() {
  return (
    <div>
      <Livetrade />
      <div className="p-4">
        {" "}
        <BonusPlan />
      </div>
      <Account />
    </div>
  );
}
