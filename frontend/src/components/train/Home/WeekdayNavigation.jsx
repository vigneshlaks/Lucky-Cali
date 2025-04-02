import React from "react";
import { Button } from "../../ui/button"; 

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const WeekdayNavigation = ({ selectedDay, setSelectedDay }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex justify-center flex-grow">
        <div className="flex justify-center space-x-2">
          {daysOfWeek.map((day, index) => (
            <Button
              key={index}
              variant="ringHover"
              size="default"
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex">
        <Button
          variant="ringHover"
          size="default"
          onClick={() => alert('This button can be used for any purpose!')}
        >
          Generate Workout
        </Button>
      </div>
    </div>
  );
};

export default WeekdayNavigation;
