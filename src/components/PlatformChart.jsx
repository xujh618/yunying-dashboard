import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const PlatformChart = ({ chartType, data, title, labels }) => {
  const chartData = {
    labels,
    datasets: data
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  switch (chartType) {
    case 'line':
      return (
        <div className="chart-container">
          <Line data={chartData} options={options} />
        </div>
      );
    case 'bar':
      return (
        <div className="chart-container">
          <Bar data={chartData} options={options} />
        </div>
      );
    case 'pie':
      return (
        <div className="chart-container">
          <Pie data={chartData} options={options} />
        </div>
      );
    default:
      return <div>不支持的图表类型</div>;
  }
};

export default PlatformChart;
