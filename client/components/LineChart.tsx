import React, { useState } from 'react';
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
        
    }
    return (
        <div className= 'line-chart'>
            <h2>This is the line chart</h2>
        </div>
    )
}

export default LineChart;