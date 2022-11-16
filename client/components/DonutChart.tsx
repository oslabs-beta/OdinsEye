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

ChartJS.register(ArcElement, Tooltip, Legend);

type DoughnutType = {
  path: string;
  path2?: string;
  label: string;
  tag: string;
};

const DoughnutChart = ({ path, path2, label, tag }: DoughnutType) => {
  const [chartData, setChartData] = useState<number[]>([]);
  const getData = async (url: string, url2?: string): Promise<any> => {
    try {
      const response = await axios.get(url);
      const data = await response.data;
      const copy = chartData.slice();
      copy.push(data);
      if (url2) {
        const response2 = await axios.get(url2);
        const data2 = await response2.data;
        copy.push(data2);
      }
      copy[0] = copy[0] - copy[1];
      setChartData(copy);
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  //
  const initialData: ChartData<'doughnut'> = {
    datasets: [
      {
        label: 'Total Pods',
        data: chartData,
        backgroundColor: [
          'rgba(54, 133, 181, 0.6)',
          ' rgb(172, 128, 160, 0.6)'
        ],
        borderColor: [
          'rgba(54, 133, 181, 1)',
          ' rgb(172, 128, 160, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  useEffect(() => {
    if (!path2) {
      getData(path);
    } else {
      getData(path, path2);
    }
  }, []);
  const options: ChartOptions<'doughnut'> = {
    animation: {
      easing: 'easeInQuad',
      duration: 1000,
    },
    responsive: true,
    rotation: 270,
    circumference: 180,
    interaction: {
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Ready: ${chartData[0]} & Not Ready: ${chartData[1]}`,
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
      >
        {label}: {chartData[0] + chartData[1]}
      </h2>
      <Doughnut data={initialData} options={options} />
    </div>
  );
};

export default DoughnutChart;
