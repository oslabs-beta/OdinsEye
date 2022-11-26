import React, { useRef, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { State } from '../../types';
import { useSelector } from 'react-redux';
import 'chartjs-adapter-luxon';
import ChartStreaming from 'chartjs-plugin-streaming';
import { Filler } from 'chart.js';

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartStreaming
);

type LineChartDataType = {
  label: string;
  eventSource: string;
  title: string;
  color: string;
};

const LiveChart = ({ label, eventSource, title, color }: LineChartDataType) => {
  const liveChart = useRef<ChartJS<'line', [{ x: string; y: number }]>>();
  const dark = useSelector((state: State) => state.dark);
  let sse: EventSource;
  //   let event = 0;
  //   if (event === 0) {
  //     sse = new EventSource(eventSource);
  //     event++;
  //   }
  useEffect(() => {
    sse = new EventSource(eventSource);
  }, []);

  let fontColor;
  dark ? (fontColor = '#363946') : (fontColor = 'rgba(136, 217, 230, 0.8)');

  //   const currentTime = new Date();
  //   let now: string = currentTime.toLocaleString('en-GB');
  //   now = now.slice(now.indexOf(',') + 1).trim();

  const initialData: ChartData<'line'> = {
    datasets: [
      {
        data: [{ x: 0, y: 0 }],
        backgroundColor: '#97b1a6',
        label: label,
        fill: true,
      },
    ],
  };

  const [lineChartData, setLineChartData] = useState<any>(initialData);
  const options: ChartOptions<'line'> = {
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
        text: title,
        color: fontColor,
      },
    },
    scales: {
      y: {
        min: 0,
        display: true,
        axis: 'y',
        title: {
          display: true,
          text: 'Kilobytes',
        },
        ticks: {
          color: fontColor,
        },
      },
      x: {
        type: 'realtime',
        realtime: {
          duration: 20000,
          refresh: 1000,
          delay: 2000,
        },
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
    if (sse) {
      sse.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const currentTime = new Date(data[0] * 1000);
        let time: string = currentTime.toLocaleString('en-GB');
        time = time.slice(time.indexOf(',') + 1).trim();
        let value = data[1] / 1_000_000;
        liveChart.current?.data.datasets[0].data.push({
          x: time,
          y: value,
        });
        liveChart.current?.update('quiet');
      };
      sse.onerror = (event) => {
        sse.close();
      };
    }
  });

  return <Line ref={liveChart} data={lineChartData} options={options} />;
};

export default LiveChart;
