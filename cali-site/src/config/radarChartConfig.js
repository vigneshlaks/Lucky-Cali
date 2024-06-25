// src/config/radarChartConfig.js
const radarChartData = {
    labels: ['Balance', 'Push', 'Pull', 'Core', 'Flexibility', 'Endurance'],
    datasets: [
        {
            label: '', // Remove dataset label
            data: [1, 2, 3, 4, 5, 6],
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderColor: 'rgba(255, 255, 255, 1)',
            borderWidth: 1,
        }
    ],
};

const radarChartOptions = {
    scales: {
        r: {
            angleLines: {
                display: true,
                color: 'rgba(255, 255, 255, 0.2)'
            },
            grid: {
                color: 'rgba(255, 255, 255, 0.2)'
            },
            pointLabels: {
                display: false, // Hide point labels
            },
            suggestedMin: 0,
            suggestedMax: 10
        }
    },
    plugins: {
        legend: {
            display: false, // Hide legend
        }
    }
};

export { radarChartData, radarChartOptions };
