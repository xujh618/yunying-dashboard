import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// 注册 Chart.js 组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const PlatformChart = ({ data, isDark }) => {
  // 条形图数据配置
  const barChartData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        label: '访问量',
        data: data.map(item => item.visits),
        backgroundColor: isDark ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 0.8)',
        borderColor: isDark ? 'rgba(59, 130, 246, 1)' : 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
      {
        label: '访客数',
        data: data.map(item => item.users),
        backgroundColor: isDark ? 'rgba(16, 185, 129, 0.8)' : 'rgba(16, 185, 129, 0.8)',
        borderColor: isDark ? 'rgba(16, 185, 129, 1)' : 'rgba(16, 185, 129, 1)',
        borderWidth: 1,
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: isDark ? '#93c5fd' : '#1e3a8a',
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: '产品访问数据对比',
        color: isDark ? '#bfdbfe' : '#1e3a8a',
        font: {
          size: 16
        }
      },
      tooltip: {
        backgroundColor: isDark ? 'rgba(30, 58, 138, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        titleColor: isDark ? '#bfdbfe' : '#1e3a8a',
        bodyColor: isDark ? '#93c5fd' : '#374151',
        borderColor: isDark ? '#3b82f6' : '#e5e7eb',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        ticks: {
          color: isDark ? '#93c5fd' : '#1e3a8a'
        },
        grid: {
          color: isDark ? 'rgba(147, 197, 253, 0.2)' : 'rgba(229, 231, 235, 0.8)'
        }
      },
      y: {
        ticks: {
          color: isDark ? '#93c5fd' : '#1e3a8a'
        },
        grid: {
          color: isDark ? 'rgba(147, 197, 253, 0.2)' : 'rgba(229, 231, 235, 0.8)'
        }
      }
    }
  };

  return (
    <div className="w-full">
      <Bar options={chartOptions} data={barChartData} />
    </div>
  );
};

export default PlatformChart;