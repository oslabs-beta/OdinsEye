import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';
import { totalmem } from 'os';

ChartJS.register(ArcElement, Tooltip, Legend);

type DoughnutType = {
  data: number[];
  label: string;
};

const KDoughnutChart = ({ data, label }: DoughnutType) => {
  const [chartData, setChartData] = useState<number[]>([]);

  const initialData: ChartData<'doughnut'> = {
    datasets: [
      {
        label: 'Total Pods',
        data: chartData,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 206, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
          'rgb(255, 159, 64)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  useEffect(() => {
    if (data.length > 0) {
      setChartData(data);
    }
  }, [data]);
  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    interaction: {
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Ready:${data[0]} & Not Ready:${data[1]}`,
      },
      //turn off display of data inside the chart
      //not sure why it is throwing an error, so i commented it out
      // datalabels: {
      //     display: false,
      // }
    },
  };

  return (
    <div>
      <h2
        style={{
          margin: 'auto auto',
          color: '#4be7b9',
          marginBottom: '10px',
        }}
      >
        {label}: {data[0] + data[1]}
      </h2>
      <Doughnut data={initialData} options={options} />
    </div>
  );
};

export default KDoughnutChart;
