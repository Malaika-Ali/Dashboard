import React from 'react';
import ReactApexChart from 'react-apexcharts';

const PieChart = ({ title }) => {
  return (
    <>
<ReactApexChart
type="pie"
width={300}
height={300}


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
  
}}
/>



    </>
  );
};

export default PieChart;
