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

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const radarChartData = {
  labels: ['Balance', 'Push', 'Pull', 'Core', 'Flexibility', 'Endurance'],
  datasets: [
    {
      label: '',
      data: [1, 2, 3, 4, 5, 6],
      backgroundColor: 'rgba(255, 255, 255, 0.5)', // Slightly increased opacity for better visibility
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
        color: 'rgba(255, 255, 255, 0.2)', // Light gray color for angle lines
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.2)', // Light gray color for grid lines
      },
      pointLabels: {
        color: 'white', // White color for labels
      },
      ticks: {
        display: false, // Hide the radial axis labels (0 through 10)
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
  return <Radar data={radarChartData} options={radarChartOptions} />;
};

export default RadarChart;
