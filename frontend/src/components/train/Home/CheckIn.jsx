import React from 'react';
import ActivityCalendar from 'react-activity-calendar';

const generateActivityDataWithZeros = (existingData) => {
  const data = [];
  const currentDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(currentDate.getFullYear() - 1);

  const existingDataMap = new Map(existingData.map(item => [item.date, item]));

  while (startDate <= currentDate) {
    const dateStr = startDate.toISOString().split('T')[0]; 
    if (existingDataMap.has(dateStr)) {
      data.push(existingDataMap.get(dateStr));
    } else {
      data.push({
        date: dateStr,
        count: 0,
        level: 0
      });
    }
    startDate.setDate(startDate.getDate() + 1); 
  }

  return data;
};

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

const activityData = generateActivityDataWithZeros(existingActivityData);

const CheckIn = () => {
  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <ActivityCalendar
        data={activityData}
        blockSize={9.5}  
        blockMargin={3} 
        theme={{
          light: ['#333333', '#666666', '#999999', '#cccccc', '#ffffff'], 
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
