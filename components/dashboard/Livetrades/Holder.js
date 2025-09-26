import React from "react";
import AssetWidgetFive from "./AdvancedC";
import ChartMovement from "./ChartMovement";

export default function Holder() {
  return (
    <div>
      <div className="grid grid-cols-1 w-full px-4 py-1 relative md:grid-cols-2 gap-2">
        <div className="ai-trading-cont w-full">
          <ChartMovement />
        </div>
        <div className="w-full my-3">
          <AssetWidgetFive />
        </div>
      </div>
    </div>
  );
}
