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
  path: string;
  title: string;
  type: string;
};

const LiveChart = ({ label, path, title, type }: LineChartDataType) => {
  const liveChart = useRef<ChartJS<'line', [{ x: string; y: number }]>>();
  const dark = useSelector((state: State) => state.dark);
  const [loadErr, setLoadErr] = useState<boolean>(false);
  let sse: EventSource;

  //effect to set up connection to server sent event
  useEffect(() => {
    sse = new EventSource(path);
    const links = Array.from(document.getElementsByClassName('link')).slice(1);
    links.map((link) => {
      link.addEventListener('click', () => {
        sse.close();
      });
    });
  }, []);

  let fontColor = '#6c887c';

  const initialData: ChartData<'line'> = {
    datasets: [
      {
        data: [{ x: 0, y: 0 }],
        backgroundColor: '#97b1a6',
        borderColor: '#97b1a6',
        label: label,
        fill: true,
      },
    ],
  };

  const [lineChartData, setLineChartData] = useState<any>(initialData);
  const [maxY, setMax] = useState<number>(0);

  const options: ChartOptions<'line'> = {
    layout: {
      padding: {
        // top: 10,
      },
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
          text: type,
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

  //function to add data to the datasets
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
        setLoadErr(true);
        return sse.close();
      };
    }
  });
  //Conditionally render if there is a load error
  if (loadErr) {
    return (
      <div id='error'>
        <h5>Not Connected to Prometheus API</h5>
      </div>
    );
  } else {
    return <Line ref={liveChart} data={lineChartData} options={options} />;
  }
};

export default LiveChart;
