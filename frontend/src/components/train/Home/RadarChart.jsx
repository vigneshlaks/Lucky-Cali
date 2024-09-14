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
import { useAuth } from '@/components/shared/auth/AuthProvider';

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

  const skillIds = Array.isArray(unlockedSkills) && typeof unlockedSkills[0] === 'object'
    ? unlockedSkills.filter(skill => skill.status === 1).map(skill => skill.skill_id)
    : unlockedSkills;

  Object.values(skillsData).forEach((category) => {
    category.nodes.forEach((skill) => {
      if (skillIds.includes(skill.id)) {
        Object.entries(skill.scores).forEach(([key, value]) => {
          totalScores[key] += value;
        });
        skillCount++;
      }
    });
  });

  const normalizedScores = Object.values(totalScores).map((score) =>
    skillCount > 0 ? Math.round((score / skillCount) * 2) : 0 // Scale to 0-10
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

// Function to generate arbitrary radar chart data
const generateArbitraryRadarChartData = () => ({
  labels: ['Balance', 'Push', 'Pull', 'Legs', 'Conditioning'],
  datasets: [
    {
      data: [5, 6, 6, 3, 5], // Arbitrary data points
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      borderColor: 'rgba(255, 255, 255, 1)',
      borderWidth: 2,
    },
  ],
});

// Radar chart options
const radarChartOptions = {
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
  const { skills, loading, error } = useSkillContext();
  const { token } = useAuth(); // Extract token from auth context
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (token) {
      // Calculate radar chart data when user is logged in and skills are available
      if (skills.length > 0) {
        setChartData(calculateRadarChartData(skills));
      }
    } else {
      // Generate arbitrary radar chart data when no token is available
      setChartData(generateArbitraryRadarChartData());
    }
  }, [skills, token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!chartData) {
    return <div>No data available</div>;
  }

  return <Radar data={chartData} options={radarChartOptions} />;
};

export default RadarChart;
