"use client";
import Holder from "../../../components/dashboard/Livetrades/Holder";
import Livetrade from "../../../components/dashboard/Livetrades/Livetrade";
import AdvancedCh from "../../../components/dashboard/Livetrades/AdvancedCh";
import TradingView from "../../../components/dashboard/Livetrades/TradingView";
import ActiveTraders from "../../../components/dashboard/Livetrades/ActiveTraders";
import AccountSect from "../../../components/dashboard/Livetrades/AccountSect";
import { motion as m } from "framer-motion";
import BonusPlan from "../../../components/dashboard/bonus_plan/BonusPlan";
function Livetrades() {
  return (
    <div className="max-w-[100vw]">
      <Livetrade />
      <div className="p-4">
        {" "}
        <BonusPlan />
      </div>
      <AdvancedCh />
      <AccountSect />
      <Holder />
      <TradingView />
      <ActiveTraders />
    </div>
  );
}

export default Livetrades;
