import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import './piechart.css'

const PieChart = ({ title, onClick, series }) => {

  // logic for handling responsiveness of chart
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
    chartHeight = 250;
  } else if (screenSize === 'medium') {
    chartHeight = 280;
  }
  else if (screenSize === 'very large') {
    chartHeight = 285;
  } else {
    // chartHeight = 380;
    chartHeight = 268;

  }

  // chart widths for different screen sizes
  let chartWidth;
  if (screenSize === 'small') {
    chartWidth = 250;
  } else if (screenSize === 'medium') {
    chartWidth = 280;
  }
  else if (screenSize === 'very large') {
    chartWidth = 300;
  } else {
    // chartWidth = 380;
    chartWidth = 268;
  }


  return (
    <>
      <ReactApexChart
        type="pie"
        height={chartHeight}
        width={chartWidth}

        // This shows the quantity in piechart. We give it a number and it converts that number into % itself
        series={series}

        options={{
          title: {
            text: title,
            align: 'center',
            marginLeft: 3,
            style: {
              fontSize: '18px',
              // color: '#000000', 
              fontFamily: 'poppins',
              color: 'white',
              fontWeight: '600'
            }
          },
          noData: { text: "No Records found yet" },
          labels: ['Flawless', 'Faulty', 'Critical'],
          colors: ['#22c55e', '#fde047', '#ef4444'],
          legend: {
            // position: 'right',
            position: 'top',

            horizontalAlign: 'center',
            marginLeft:'50px',
            offsetY: 0,
            offsetX: 0,
            labels: {
              colors: ['#31C431', '#F9F502', '#DB1915'],
              fontSize: '20px',
            },
          },
          chart: {
            events: {
              dataPointSelection: function (event, chartContext, config) {
                if (onClick) {

                  // This will catch the index of the series(which pie slice) is clicked
                  onClick(config.dataPointIndex);
                }
              },
            },
          },

          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            blur: 4,
            color: '#000000', // Shadow color
            opacity: 0.5, // Shadow opacity
          },
          
          stroke: {
            colors: ['#31C431', '#F9F502', '#DB1915'], // Border colors
          },
          dataLabels: {
            offset: -50,
            offsetY: -50,
            style: {
              fontWeight: 300,
              fontSize: '12px',
              fontFamily: 'poppins',
              color:'#FFFFFF',
              offsetX: -50,
            },
          
          }
        
        }}
        style={{ cursor: 'pointer' }} // Set cursor as pointer
      />
    </>
  );
};

export default PieChart;
