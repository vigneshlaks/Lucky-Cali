import React from "react";
import RadarChart from "./RadarChart";
import WorkoutDisplay from "./WorkoutDisplay";
import CheckIn from "./CheckIn";
import LineChartExample from "./LineChart";

export default function ResizableGrid() {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-4 h-screen">
      <div className="h-full w-full p-4">
        <CheckIn />
      </div>
      <div className="h-full w-full p-4">
        <LineChartExample />
      </div>
      <div className="h-full w-full p-4">
        <WorkoutDisplay />
      </div>
      <div className="h-full w-full p-4">
        <RadarChart />
      </div>
    </div>
  );
}
