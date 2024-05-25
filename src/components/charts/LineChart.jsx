import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

function LineChart({ data, chartTitle }) {

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
      // title: {
      //   text: 'Numbers',
      //   style: {
      //     color: 'white',
      //     fontSize:'16px'
      //   },
      // },
      labels: {
        style: {
          colors: 'white', // Set x-axis label text color to white
          marginRight: '20px',
          marginLeft: '20px'
        },
      },
    },
    title: {
      text: chartTitle,
      align: 'center',
      style: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: 'white',
        // marginLeft: '20px'
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
      position: 'bottom', // Set the legend position to top
      horizontalAlign: 'center', // Set the horizontal alignment to right
      offsetY: 15, // Adjust the vertical offset if needed
      itemMargin: {
        vertical: 10, // Adjust the vertical margin between legend items
        horizontal: 25,
      },
      labels: {
        colors: ['#FF0000', '#FFFF00', '#00FF00'], // Set legend text color to white
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


  // logic for handling responsiveness of line chart
  const [screenSize, setScreenSize] = useState('');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize('small');
      } else if (width >= 768 && width < 1024) {
        setScreenSize('medium');
      }
      else if (width > 1400) {
        setScreenSize('very large');
      }
      else {
        setScreenSize('large');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  // chart heights for different screen sizes
  let chartHeight;
  if (screenSize === 'small') {
    chartHeight = 200;
  } else if (screenSize === 'medium') {
    chartHeight = 220;
  }
  else if (screenSize === 'very large') {
    chartHeight = 400;
  } else {
    chartHeight = 290;
  }

  // chart widths for different screen sizes
  let chartWidth;
  if (screenSize === 'small') {
    chartWidth = 200;
  } else if (screenSize === 'medium') {
    chartWidth = 220;
  }
  else if (screenSize === 'very large') {
    chartWidth = 1000;
  } else {
    chartWidth = 670;
  }


  return (
    <div className='table-font flex justify-between items-center'>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="line"
        height={chartHeight}
        width={chartWidth}

      />
    </div>
  );
}

export default LineChart;

