import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Filler } from 'chart.js';
import { State } from '../../types';
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
  data: any[];
  label: string;
  yAxis: string;
  title: string;
};

const KLineChart = ({ data, label, yAxis, title }: LineChartDataType) => {
  const dark = useSelector((state: State) => state.dark);
  let fontColor;
  dark ? (fontColor = '#363946') : (fontColor = 'rgba(136, 217, 230, 0.8)');

  const initialData: ChartData<'line'> = {
    datasets: [],
  };
  const [lineChartData, setLineChartData] = useState<any>(initialData);
  const [loadErr, setLoadErr] = useState(false);

  const options: ChartOptions<'line'> = {
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
            size: 18,
          },
        },
      },
      title: {
        display: true,
        text: title,
        color: fontColor,
      },
      //turn off display of data inside the chart
      //not sure why it is throwing an error, so i commented it out
      // datalabels: {
      //     display: false,
      // }
    },
    scales: {
      y: {
        display: true,
        axis: 'y',
        title: {
          display: true,
          text: yAxis,
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
    if (data.length !== 0) {
      const metrics = data[0];
      console.log('metrics K', metrics)
      //converting that long number into an actual time :D
      const xAxis = metrics.map((value: [number, string]) => {
        const currentTime = new Date(value[0] * 1000);
        let time = currentTime.toLocaleString('en-GB');
        //we only want the time, not data
        time = time.slice(time.indexOf(',') + 1).trim();
        return time;
      });
      let yAxisData: number[] = [];
      switch (yAxis) {
        case 'Kilobytes':
          yAxisData = metrics.map(
            (value: [number, string]) => Number(value[1]) / 1000000
          );
          break;
        default:
          yAxisData = metrics.map((value: [number, string]) =>
            Number(value[1])
          );
      }
      const newData: ChartData<'line'> = {
        labels: xAxis,
        datasets: [
          {
            label: label,
            data: yAxisData,
            backgroundColor: 'rgba(54, 133, 181, 0.8)',
            borderColor: 'rgba(54, 133, 181, 1)',
            borderWidth: 1.5,
            pointRadius: 1,
            tension: 0.4,
            pointBorderWidth: 1.5,
            pointHoverRadius: 3,
            fill: true,
          },
        ],
      };
      setLineChartData(newData);
    }
    //error handling for when no data exist
    if(data == undefined){
      setLoadErr(true);
    }  
  }, [data]);

  if(loadErr) {
    return (
      <div id='error'>
        <h5>Not Connected Prometheus API</h5>
      </div>
    )
  } else {
    return (
      <div className='line-chart-container'>
        <Line className='line-chart' options={options} data={lineChartData} />
      </div>
    );
  }
};

export default KLineChart;
