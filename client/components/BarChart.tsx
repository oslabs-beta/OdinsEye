import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type BarType = {
  title: string;
  url: string;
  labels: string[];
};

const BarChart = ({ title, url, labels }: BarType) => {
  const [loadErr, setLoadErr] = useState<boolean>(false);
  const initialData: ChartData<'bar'> = {
    datasets: [],
  };

  ChartJS.defaults.datasets.bar.barThickness = 35;
  const [barChartData, setBarChartData] =
    useState<ChartData<'bar'>>(initialData);
  const option: ChartOptions<'bar'> = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
        borderSkipped: false,
      },
    },
    interaction: {
      intersect: false,
    },
    responsive: false,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: title,
        color: 'rgb(53,162,235)',
      },
    },
    scales: {
      y: {
        stacked: true,
        grid: {
          display: false,
          drawBorder: false,
          drawTicks: false,
        },
        ticks: {
          display: false,
        },
      },
      x: {
        stacked: true,
        grid: {
          display: false,
          drawBorder: false,
          drawTicks: false,
        },
        ticks: {
          display: false,
        },
      },
    },
  };

  //main use case for bar chart is to display overall core cpu usage over total cpu usage
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const metrics = data;
        const percentage = metrics.percent.slice(0, 4) + '%';
        const xAxis = [percentage];
        let yAxis = [metrics.cpu, metrics.core];
        const newData: ChartData<'bar'> = {
          labels: xAxis,
          datasets: [
            {
              label: labels[0],
              data: yAxis,
              backgroundColor: 'rgb(52,162,235)',
              borderColor: 'rgb(52,162,235)',
            },
            {
              label: labels[1],
              data: yAxis[1],
              backgroundColor: 'rgba(54, 133, 181, 1)',
              borderColor: 'rgba(54, 133, 181, 1)',
            },
          ],
        };
        setBarChartData(newData);
      })
      .catch((err) => {
        console.log(err);
        setLoadErr(true);
      });
  }, []);

  if (loadErr) {
    return (
      <div id='error'>
        <h5>Not Connected to Prometheus API</h5>
      </div>
    );
  } else {
    return (
      <div className='bar-chart-container'>
        <Bar className='bar-chart-js' data={barChartData} options={option} />
      </div>
    );
  }
};

export default BarChart;
