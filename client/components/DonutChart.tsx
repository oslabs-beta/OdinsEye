import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

type DoughnutType = {
  path: string;
  label: string;
  tag: string;
};

const DoughnutChart = ({ label, tag }: DoughnutType) => {
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
  // useEffect(() => {
  //   if (data) {
  //     setChartData(data);
  //   }
  // }, [data]);
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
        text: label,
      },
      //turn off display of data inside the chart
      //not sure why it is throwing an error, so i commented it out
      // datalabels: {
      //     display: false,
      // }
    },
  };

  return (
    <div id={tag}>
      <h2
        style={{
          margin: 'auto auto',
          color: '#4be7b9',
          marginBottom: '10px',
        }}
      ></h2>
      <Doughnut data={initialData} options={options} />
    </div>
  );
};

export default DoughnutChart;
