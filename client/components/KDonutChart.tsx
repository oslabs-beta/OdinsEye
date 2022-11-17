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
    labels: [`Pods Ready: ${chartData[0]}`, `Not Ready: ${chartData[1]}`],
    datasets: [
      {
        label: 'Total Pods',
        data: chartData,
        backgroundColor: [
          'rgba(54, 133, 181, 0.6)',
          ' rgb(172, 128, 160, 0.6)',
        ],
        borderColor: ['rgba(54, 133, 181, 1)', ' rgb(172, 128, 160, 1.2)'],
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
    animation: {
      easing: 'easeInQuad',
      duration: 1000,
    },
    events: [],
    responsive: true,
    rotation: 270,
    circumference: 180,
    interaction: {
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: 'rgba(54, 133, 181, 1)',
        },
      },
      title: {
        display: true,
        text: `Total Pods`,
        color: 'rgba(136, 217, 230, 0.8)',
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
      ></h2>
      <Doughnut data={initialData} options={options} />
    </div>
  );
};

export default KDoughnutChart;
