import React from "react";
import Livetrade from "../../../components/dashboard/Livetrades/Livetrade";
import Deposit from "../../../components/dashboard/Deposits/Deposits";
import BonusPlan from "../../../components/dashboard/bonus_plan/BonusPlan";

export default function Deposits() {
  return (
    <div>
      <Livetrade />
      <div className="p-4">
        {" "}
        <BonusPlan />
      </div>
      <Deposit />
    </div>
  );
}
