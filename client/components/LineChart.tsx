import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
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
    Legend
);

const initialData: ChartData<'line'> = {
    datasets: [],
}

const LineChart = (props: any) => {
    const [data, setData] = useState(initialData);
    const options: ChartOptions<'line'> = {
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
                text: 'Line-Chart',
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
                    text: 'data'
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
        //testing for totalCPU usage 
        fetch('/api/dashboard/totalCpu')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                const metrics = data.result[0].values;
                console.log('metrics', metrics);
                //converting that long number into an actual time :D
                const xAxis = metrics.map((value: [number, string]) => {
                    const currentTime = new Date(value[0] * 1000);
                    let time = currentTime.toLocaleString('en-GB');
                    console.log('time', time);
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
                        backgroundColor: 'rgba(245, 40, 145, 0.8)',
                        borderColor: 'rgba(245, 40, 145, 0.8)',
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
                  setData(newData);
            });
            
    }, []);

    return (
        <div className= 'line-chart'>
            <h2>This is the line chart</h2>
            <Line options={options} data={data} />
        </div>
    )
}

export default LineChart;