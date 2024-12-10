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
          colors: 'white', 
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: 'white', 
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
        fontWeight: '600',
        color: 'white',
        fontFamily: 'poppins',
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
      position: 'top', 
      horizontalAlign: 'center', 
      offsetY: 15,
      itemMargin: {
        vertical: 10, 
        horizontal: 25,
      },
      labels: {
        colors: ['#FF0000', '#FFFF00', '#00FF00'], 
        fontSize: "25px"
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
      if (width < 650) {
        setScreenSize('v small');}
      else if (width < 768) {
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
  if (screenSize === 'v small') {
    chartHeight = 290;
  }
  else if (screenSize === 'small') {
    chartHeight = 300;
  } else if (screenSize === 'medium') {
    chartHeight = 300;
  }
  else if (screenSize === 'very large') {
    chartHeight = 380;
  } else {
    chartHeight = 420;
  }

  // chart widths for different screen sizes
  let chartWidth;
  if (screenSize === 'v small') {
    chartWidth = 480;
  }
  else if (screenSize === 'small') {
    chartWidth = 510;
  } else if (screenSize === 'medium') {
    chartWidth = 650;
  }
  else if (screenSize === 'very large') {
    chartWidth = 900;
  } else {
    chartWidth = 820;
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

