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
          fontSize:'16px'
        },
      },
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
      width: 3
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
      colors: ['#FF0000', '#FFFF00', '#00FF00'  ], // Set legend text color to white
    },
  },
  
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

