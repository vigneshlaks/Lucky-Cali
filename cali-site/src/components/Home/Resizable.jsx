import React from "react";
import RadarChart from "./RadarChart";
import CheckIn from "./CheckIn";
import LineChartExample from "./LineChart";
import Challenges from "./Challenges";
import DiaryEntry from "./WorkoutLog";

export default function ResizableGrid() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col space-y-4">
        <CheckIn />
        <Challenges />
        <DiaryEntry />
      </div>
      <div className="flex flex-col space-y-4">
        <RadarChart />
      </div>
    </div>
  );
}
