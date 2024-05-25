import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const PieChart = ({ title, onClick, series }) => {

  // useEffect(() => {
  //   const handleDataPointSelection = (event, chartContext, config) => {
  //     if (onClick) {
  //       onClick(config.seriesIndex);
  //     }
  //   };

  //   document.addEventListener('dataPointSelection', handleDataPointSelection);

  //   return () => {
  //     document.removeEventListener('dataPointSelection', handleDataPointSelection);
  //   };
  // }, [onClick]);


   // logic for handling responsiveness of chart
   const [screenSize, setScreenSize] = useState('');

   useEffect(() => {
     const handleResize = () => {
       const width = window.innerWidth;
       if (width < 768) {
         setScreenSize('small');
       } else if (width >= 768 && width < 1024) {
         setScreenSize('medium');}
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
     chartHeight = 300;
   } else {
     chartHeight = 270;
   }
 
   // chart widths for different screen sizes
   let chartWidth;
   if (screenSize === 'small') {
     chartWidth = 200;
   } else if (screenSize === 'medium') {
     chartWidth = 220;
   }
   else if (screenSize === 'very large'){
     chartWidth = 300;
   } else {
     chartWidth = 290;
   }


  return (
    <>
      <ReactApexChart
        type="pie"
        // width={250}
        // height={250}
        height={chartHeight}
        width={chartWidth}


        // This shows the quantity in piechart. We give it a number and it converts that number into % itself
        series={series}

        options={{
          // title:{text: title},
          title: {
            text: title,
            align: 'center',
            marginLeft: 3,
            style: {
              fontSize: '16px',
              // color: '#000000', 
              fontFamily: 'poppins',
              color: 'white'
            }
          },
          noData: { text: "No Records found yet" },
          labels: ['Flawless', 'Faulty', 'Critical'],
          colors: ['#31C431', '#F9F502', '#DB1915'],
          legend: {
            position: 'top',
            horizontalAlign: 'center',
            offsetY: 0,
            offsetX: 0,
            labels: {
              colors: ['#31C431', '#F9F502', '#DB1915'], // Set legend text color to white
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
        }}
        style={{ cursor: 'pointer' }} // Set cursor as pointer
      />
    </>
  );
};

export default PieChart;
