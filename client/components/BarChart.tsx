import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = (props: any) => {
    const initialData: ChartData<'bar'> = {
        datasets: [],
    };
    const [barChartData, setBarChartData] = useState<any>(initialData);
    const option: ChartOptions<'bar'> = {
        indexAxis: 'y',

        elements: {
          bar: {
            borderWidth: 2,
            borderSkipped: false,
          },
        },
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Bar Chart',
                color: 'rgb(53,162,235)',
            },
        },
        scales: {
            y: {
                stacked: true,

                grid: {
                    display: false,
                    drawBorder: false,
                    drawTicks: false,
                },
                ticks: {
                    display: false,
                }
              },
              x: {
                stacked: true,
                grid: {
                    display: false,
                    drawBorder: false,
                    drawTicks: false,
                },
                ticks: {
                    display: false,
                }
              }
        }
    };
    useEffect(() => {
        fetch('/api/dashboard/cpuUsage')
            .then((res) => res.json())
            .then((data) => {
                const metrics = data
                const xAxis = [metrics.core.values[0][1]];
                let yAxis = [metrics.cpu.values[0][1]];
                console.log(metrics);
                const newData: ChartData<'bar'> = {
                    labels: xAxis,
                  datasets: [
                    {
                      label: 'metric',
                      data: yAxis,
                      backgroundColor: "rgb(52,162,235)",
                      borderColor: "rgb(52,162,235)"
                    },
                  ],
                }
                setBarChartData(newData);
            })
    }, [])
    return(
        <div className='bar-chart-container' style={{width: "700px", height: '100px', color:'#4be7b9', margin: '0 0 10px 50px'}}>
            <Bar className='bar-chart' data={barChartData} options={option}/>
        </div>
    )

}

export default BarChart;