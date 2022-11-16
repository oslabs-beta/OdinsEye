import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { getData } from '../getData';
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

type DataType = [number,string];


type LineChartDataType = {
    label: string
    yAxis: string
    url: string
}

const LineChart = (props:LineChartDataType) => {
    // console.log('totalCPU', data);
    // console.log(label,'label')
    // console.log(yAxis)
    // console.log('props', props) 
    const initialData: ChartData<'line'> = {
        datasets: []
    }    
    const [lineChartData, setLineChartData] = useState<any>(initialData);

    const options: ChartOptions<'line'> = {
        responsive: true,
        interaction: {
            intersect: false,
        }, 
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'rgba(137, 170, 230, 0.6)',
                }
            },
            title: {
                display: true,
                text: 'Line-Chart',
                color:'rgba(137, 170, 230, 0.6)',
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
                    text: props.yAxis
                },
            },
            x: {
                display: true,
                axis: 'x',
                title: {
                    display: true,
                    text: 'Time',
                },
            },
        },
    };

    useEffect(() => {
        fetch(props.url)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                const metrics = data.result[0].values;
                console.log('metrics', metrics);
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
                    case 'kilobytes':
                      yAxis = metrics.map(
                        (value: [number, string]) => Number(value[1]) / 1000000
                      );
                      break;
                    default:
                      yAxis = metrics.map((value: [number, string]) =>
                        Number(value[1])
                      );
                }
                const newData: ChartData<'line'> = {
                    labels: xAxis,
                    datasets: [
                      {
                        label: props.label,
                        data: yAxis,
                        backgroundColor: 'rgba(172, 128, 160, 0.3)',
                        borderColor: 'rgba(172, 128, 160, 0.3)',
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
        <div className= 'line-chart-container'>
            <h2>This is the line chart</h2>
            <Line className="line-chart" options={options} data={lineChartData} />
        </div>
    )
}

export default LineChart;