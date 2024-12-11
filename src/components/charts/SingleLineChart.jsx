import React from 'react'
import ReactApexChart from 'react-apexcharts';


function SingleLineChart({ data, chartTitle }) {

    const chartOptions = {

        chart: {
            id: 'line-chart',
            toolbar: {
                show: false,
            },
        },
        xaxis: {
            categories: data.categories,
            labels: {
                style: {
                    colors: 'white', // Set x-axis label text color to white
                },
            },
        },
        yaxis: {
            title: {
                text: 'Numbers',
                style: {
                    color: 'white',
                    fontSize: '16px'
                },
            },
            labels:{
                style:{
                    color: 'white'
                }
            }
        },
        title: {
            text: chartTitle,
            align: 'left',
            style: {
                fontSize: '20px',
                fontWeight: 'bold',
                color: 'white',
            },
        },
        stroke: {
            curve: 'straight',
            width: 3,
            color: 'white'
        },
        markers: {
            size: 6,
            hover: {
                size: 8,
                sizeOffset: 3,
                cursor: 'pointer'
            }
        },
        legend: {
            position: 'top', // Set the legend position to top
            horizontalAlign: 'right', // Set the horizontal alignment to right
            offsetY: -10, // Adjust the vertical offset if needed
            itemMargin: {
                vertical: 3, // Adjust the vertical margin between legend items
            },
            labels: {
                colors: ['#FF0000', '#FFFF00', '#00FF00'], // Set legend text color to white
            },
        },
    };

    const chartSeries = [
        {
            name: 'Line Series',
            data: data.values,
        },
    ];


    return (
        <>
            <ReactApexChart
                options={chartOptions}
                series={chartSeries}
                type="line"
                height={300} />
        </>
    )
}

export default SingleLineChart