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
    <div className='bg-white h-52 rounded-xl w-52 flex flex-col justify-center items-center dark-box-shadow'>
 <ReactApexChart
      options={chartOptions}
      series={chartSeries}
      type="radialBar"
      height={250}
    />
    </div>
    </>
  )
}

export default CircularProgressChart
