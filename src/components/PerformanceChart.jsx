
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  
  ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);
  
  const PerformanceChart = () => {
    const data = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      datasets: [
        {
          label: 'Performance',
          data: [12, 19, 8, 15, 22],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.3,
        },
      ],
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };
  
    return <Line data={data} options={options} />;
  };
  
  export default PerformanceChart;
  