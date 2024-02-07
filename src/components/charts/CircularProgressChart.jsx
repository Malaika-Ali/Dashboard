import React from 'react'
import ReactApexChart from 'react-apexcharts';


function CircularProgressChart( { progress, barColor, motorCategory }) {



    const chartOptions = {
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 15,
              size: '50%',
            },
            dataLabels: {
              showOn: 'always',
              name: {
                offsetY: -10,
                show: true,
                color: '#888',
                fontSize: '13px',
              },
              value: {
                color: '#111',
                fontSize: '30px',
                show: true,
                formatter: function (val) {
                  return parseInt(val) + '%';
                },
              },
            },
          },
        },
        fill: {
          colors: [barColor], 
        },
        stroke: {
          lineCap: 'round',
        },
        labels: [motorCategory],
      };
    

      const chartSeries = [progress];

      

  return (
    <>
 <ReactApexChart
      options={chartOptions}
      series={chartSeries}
      type="radialBar"
      height={280}
    />
    </>
  )
}

export default CircularProgressChart
