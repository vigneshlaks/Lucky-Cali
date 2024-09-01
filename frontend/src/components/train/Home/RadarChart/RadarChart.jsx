import React, { useState, useEffect } from 'react';
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
import api from '@/components/shared/api'; // Ensure this is your configured API client

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
  console.log(unlockedSkills)
  Object.values(skillsData).forEach((category) => {
    category.nodes.forEach((skill) => {
      // Check if the skill is unlocked by matching skill_id from unlockedSkills
      if (unlockedSkills.some(unlockedSkill => unlockedSkill.skill_id === skill.id)) {
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

const RadarChart = ({ completedSkills: propCompletedSkills }) => {
  const [completedSkills, setCompletedSkills] = useState(propCompletedSkills || []);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch completed skills directly from the backend
    const fetchCompletedSkills = async () => {
      try {
        setLoading(true);
        const response = await api.get('user/completed-skills');
        setCompletedSkills(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching completed skills:', err);
        setError('Failed to load completed skills.');
        setLoading(false);
      }
    };

    // If propCompletedSkills is not provided, fetch from backend
    if (!propCompletedSkills) {
      fetchCompletedSkills();
    } else {
      setLoading(false);
    }
  }, [propCompletedSkills]);

  useEffect(() => {
    // Calculate radar chart data when completed skills are available
    if (completedSkills.length > 0) {
      setChartData(calculateRadarChartData(completedSkills));
    }
  }, [completedSkills]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
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
