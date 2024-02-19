import React, {useEffect} from 'react';
import ReactApexChart from 'react-apexcharts';

const PieChart = ({ title , onClick }) => {

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
  return (
    <>
<ReactApexChart
type="pie"
width={250}
height={250}


// This shows the quantity in piechart. We give it a number and it converts that number into % itself
series={[23,40,78]}

options={{
  // title:{text: title},
  title: {
    text: title,
    align: 'left',
    marginLeft: 3,
    style: {
      fontSize: '16px',
      color: '#000000', 
    }},
  noData: {text: "No Records found yet"},
  labels: ['Flawless', 'Faulty', 'Critical'],
  colors: ['#31C431', '#F9F502', '#DB1915'],
  legend: {
    position: 'top',
    horizontalAlign: 'center',
    offsetY: 0,
    offsetX: 0,
  },
  chart: {
    events: {
      dataPointSelection: function (event, chartContext, config) {
        if (onClick) {
          onClick(config.seriesIndex);
          
        }
      },
  
}}



  }}
  






style={{ cursor: 'pointer' }} // Set cursor as pointer
/>
    </>
  );
};

export default PieChart;
