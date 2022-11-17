import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Filler } from 'chart.js';
import { TestState } from '../../types';
import { useSelector } from 'react-redux';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';
import { parentPort } from 'worker_threads';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

type DataType = [number, string];

type LineChartDataType = {
  label: string;
  yAxis: string;
  url: string;
  title: string;
  color: string;
};

const LineChart = (props: LineChartDataType) => {
  const initialData: ChartData<'line'> = {
    datasets: [],
  };
  const dark = useSelector((state: TestState) => state.dark);
  let fontColor;
  console.log(fontColor);
  dark ? (fontColor = '#363946') : (fontColor = 'rgba(136, 217, 230, 0.8)');

  const [lineChartData, setLineChartData] = useState<any>(initialData);
  const options: ChartOptions<'line'> = {
    animation: {
      easing: 'easeInQuad',
      duration: 1000,
    },
    responsive: true,
    interaction: {
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: fontColor,
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: props.title,
        color: fontColor,
      },
    },
    scales: {
      y: {
        display: true,
        axis: 'y',
        title: {
          display: true,
          text: props.yAxis,
        },
        ticks: {
          color: fontColor,
        },
      },
      x: {
        display: true,
        axis: 'x',
        title: {
          display: true,
          text: 'Time',
        },
        ticks: {
          color: fontColor,
        },
      },
    },
  };

  useEffect(() => {
    fetch(props.url)
      .then((res) => res.json())
      .then((data) => {
        const metrics = data.result[0].values;
        //converting that long number into an actual time :D
        const xAxis = metrics.map((value: [number, string]) => {
          const currentTime = new Date(value[0] * 1000);
          let time = currentTime.toLocaleString('en-GB');
          // console.log('time', time);
          //we only want the time, not data
          time = time.slice(time.indexOf(',') + 1).trim();
          return time;
        });
        let yAxis: number[] = [];
        switch (props.yAxis) {
          case 'Kilobytes':
            yAxis = metrics.map(
              (value: [number, string]) => Number(value[1]) / 1000000
            );
            break;
          default:
            yAxis = metrics.map((value: [number, string]) => Number(value[1]));
        }
        const newData: ChartData<'line'> = {
          labels: xAxis,
          datasets: [
            {
              label: props.label,
              data: yAxis,
              backgroundColor: props.color,
              borderColor: props.color,
              borderWidth: 1.5,
              pointRadius: 1,
              tension: 0.4,
              pointBorderWidth: 1.5,
              pointHoverRadius: 3,
              //suppose to fill the line graph but its not working??
              fill: true,
            },
          ],
        };
        setLineChartData(newData);
      });
  }, []);
  return (
    <div className='line-chart-container'>
      <Line className='line-chart' options={options} data={lineChartData} />
    </div>
  );
};
export default LineChart;
