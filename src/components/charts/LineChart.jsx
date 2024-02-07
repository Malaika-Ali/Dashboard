import React from 'react'
import ReactApexChart from 'react-apexcharts';


function LineChart({data, chartTitle}) {

    const chartOptions = {
       
            chart: {
              id: 'line-chart',
              toolbar: {
                show: false, 
              },
            },
        xaxis: {
          categories: data.categories,
        },
        yaxis: {
          title: {
            text: 'Values',
          },
        },
        title: {
          text: chartTitle,
          align: 'center',
          style: {
            fontSize: '20px',
            fontWeight: 'bold',
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

export default LineChart
