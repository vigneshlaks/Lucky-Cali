import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { skillsData } from '@/components/shared/skillsData';
import { useSkillContext } from '@/components/shared/SkillContext';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

// Function to calculate radar chart data based on unlocked skills
const calculateRadarChartData = (unlockedSkills) => {
  const totalScores = { balance: 0, push: 0, pull: 0, legs: 0, conditioning: 0 };
  let skillCount = 0;

  // Check if unlockedSkills is an array of objects or a list of IDs
  const skillIds = Array.isArray(unlockedSkills) && typeof unlockedSkills[0] === 'object' 
    ? unlockedSkills
        .filter(skill => skill.status === 1) // Filter skills with status 1
        .map(skill => skill.skill_id)        // Map to get skill IDs
    : unlockedSkills;

  Object.values(skillsData).forEach((category) => {
    category.nodes.forEach((skill) => {
      // Check if the skill is unlocked by matching skill IDs
      if (skillIds.includes(skill.id)) {
        Object.entries(skill.scores).forEach(([key, value]) => {
          totalScores[key] += value;
        });
        skillCount++;
      }
    });
  });

  const normalizedScores = Object.values(totalScores).map((score) =>
    skillCount > 0 ? Math.round((score / skillCount) * 2) : 0 // Multiply by 2 to scale to 0-10 range
  );

  return {
    labels: ['Balance', 'Push', 'Pull', 'Legs', 'Conditioning'],
    datasets: [
      {
        data: normalizedScores,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 2,
      },
    ],
  };
};

// Radar chart options
const radarChartOptions = {
  maintainAspectRatio: true,
  responsive: true,
  scales: {
    r: {
      angleLines: {
        display: true,
        color: 'rgba(255, 255, 255, 0.2)',
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.2)',
      },
      pointLabels: {
        color: 'white',
      },
      ticks: {
        display: false,
      },
      suggestedMin: 0,
      suggestedMax: 10,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

const RadarChart = () => {
  // Use the skills context to get the completed skills, loading, and error state
  const { skills, loading, error } = useSkillContext();
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Calculate radar chart data when completed skills are available
    if (skills.length > 0) {
      setChartData(calculateRadarChartData(skills));
    }
  }, [skills]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!chartData) {
    return <div>No data available</div>;
  }
  return (
    <div className="w-full h-full">
      <Radar data={chartData} options={radarChartOptions} />
    </div>
  );
};

export default RadarChart;
