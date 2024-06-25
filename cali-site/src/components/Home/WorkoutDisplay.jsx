import { useState } from "react";
import WeekdayNavigation from "./WeekdayNavigation";
import WorkoutTable from "./WorkoutTable";

const WorkoutDisplay = () => {
  const [selectedDay, setSelectedDay] = useState('M');

  return (
    <div className="container mx-auto p-4">
      <WeekdayNavigation selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      <WorkoutTable selectedDay={selectedDay} />
    </div>
  );
};

export default WorkoutDisplay;
