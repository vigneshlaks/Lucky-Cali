import { useState, useEffect } from 'react';
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
import { useCompletedSkills } from '@/components/shared/skills/SkillProvider';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const calculateRadarChartData = (unlockedSkills) => {
  const totalScores = { balance: 0, push: 0, pull: 0, legs: 0, conditioning: 0 };
  let skillCount = 0;

  Object.values(skillsData).forEach(category => {
    category.nodes.forEach(skill => {
      if (unlockedSkills.includes(skill.id)) {
        Object.entries(skill.scores).forEach(([key, value]) => {
          totalScores[key] += value;
        });
        skillCount++;
      }
    });
  });

  // Normalize scores
  const normalizedScores = Object.values(totalScores).map(score => 
    skillCount > 0 ? Math.round((score / skillCount) * 2) : 0 // Multiply by 2 to scale to 0-10 range
  );

  return {
    labels: ['Balance', 'Push', 'Pull', 'Legs', 'Conditioning'],
    datasets: [
      {
        data: normalizedScores,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 1,
      },
    ],
  };
};

let defaultData = {
  labels: ['Balance', 'Push', 'Pull', 'Legs', 'Conditioning'],
  datasets: [
    {
      data: [0,0,0,0],
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      borderColor: 'rgba(255, 255, 255, 1)',
      borderWidth: 1,
    },
  ],
};

const radarChartOptions = {
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
      display: false
    },
  },
};

const RadarChart = () => {
  const [chartData, setChartData] = useState(null);
  const { completedSkills, loading, error } = useCompletedSkills();

  useEffect(() => {
    if (completedSkills.length > 0) {
      setChartData(calculateRadarChartData(completedSkills));
    }
  }, [completedSkills]);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  console.log(chartData)

  return (
    <div className="w-full h-full">
      <Radar data={chartData} options={radarChartOptions} />
    </div>
  );
};

export default RadarChart;