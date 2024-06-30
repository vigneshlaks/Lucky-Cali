import React from 'react';
import ActivityCalendar from 'react-activity-calendar';

// Function to generate comprehensive activity data including zero values
const generateActivityDataWithZeros = (existingData) => {
  const data = [];
  const currentDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(currentDate.getFullYear() - 1);

  // Create a map for existing data for quick lookup
  const existingDataMap = new Map(existingData.map(item => [item.date, item]));

  // Generate data for each day from startDate to currentDate
  while (startDate <= currentDate) {
    const dateStr = startDate.toISOString().split('T')[0]; // Convert date to string format YYYY-MM-DD
    if (existingDataMap.has(dateStr)) {
      // If there is existing data for the date, use it
      data.push(existingDataMap.get(dateStr));
    } else {
      // Otherwise, add an entry with count 0 and level 0
      data.push({
        date: dateStr,
        count: 0,
        level: 0
      });
    }
    startDate.setDate(startDate.getDate() + 1); // Move to the next day
  }

  return data;
};

// Example existing data
const existingActivityData = [
  {
    "date": "2023-06-14",
    "count": 1,
    "level": 1
  },
  {
    "date": "2023-06-22",
    "count": 1,
    "level": 3
  },
  {
    "date": "2023-07-22",
    "count": 1,
    "level": 4
  } 
];

// Generate activity data including zero values
const activityData = generateActivityDataWithZeros(existingActivityData);

const CheckIn = () => {
  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <ActivityCalendar
        data={activityData}
        blockSize={9.5}  // Smaller block size
        blockMargin={3} // Smaller block margin
        theme={{
          light: ['#333333', '#666666', '#999999', '#cccccc', '#ffffff'], // Gradient from dark gray to white
          dark: ['#333333', '#666666', '#999999', '#cccccc', '#ffffff']
        }}
        labels={{
          legend: {
            less: 'Less Intense',
            more: 'More Intense'
          },
          months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          totalCount: '{{count}} workouts in {{year}}',
          tooltip: '<strong>{{count}} activities</strong> on {{date}}'
        }}
      />
    </div>
  );
};

export default CheckIn;
