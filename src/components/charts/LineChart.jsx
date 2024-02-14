// import React from 'react'
// import ReactApexChart from 'react-apexcharts';


// function LineChart({data, chartTitle}) {

//     const chartOptions = {
       
//             chart: {
//               id: 'line-chart',
//               toolbar: {
//                 show: false, 
//               },
//             },
//         xaxis: {
//           categories: data.categories,
//         },
//         yaxis: {
//           title: {
//             text: 'Values',
//           },
//         },
//         title: {
//           text: chartTitle,
//           align: 'center',
//           style: {
//             fontSize: '20px',
//             fontWeight: 'bold',
//           },
//         },
//       };
    
//       const chartSeries = [
//         {
//           name: 'Line Series',
//           data: data.values,
//         },
//       ];


//   return (
//     <>
//       <ReactApexChart
//        options={chartOptions} 
//        series={chartSeries} 
//        type="line" 
//        height={300} />
//     </>
//   )
// }

// export default LineChart


import React from 'react';
import ReactApexChart from 'react-apexcharts';

function LineChart({ data, chartTitle, chartHeight, chartWidth }) {

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
        text: 'Numbers',
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
    stroke: {
      curve: 'straight',
      width: 3
    },
    markers: {
      size: 6,
      hover: {
        size: 8,
        sizeOffset: 3,
        cursor: 'pointer'
      }
  }
  
  };

  const chartSeries = [
    {
      name: 'Critical',
      data: data.criticalValues,
      color: '#FF0000', // Red color for critical
    },
    {
      name: 'Faulty',
      data: data.faultyValues,
      color: '#FFFF00', // Yellow color for faulty
    },
    {
      name: 'Flawless',
      data: data.flawlessValues,
      color: '#00FF00', // Green color for flawless
    },
  ];

  return (
    <>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="line"
        height={chartHeight}
        width={chartWidth}
      
      />
    </>
  );
}

export default LineChart;

