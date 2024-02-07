//   const pie_data=[
//     {
//       "motorname": "Motor1",
//       "status": "Faulty",
//       "number": 25,
//       "textnum": "25"
//     },
//     {
//       "motorname": "Motor2",
//       "status": "critical",
//       "number": 25,
//       "textnum": "25"
//     },
//     {
//       "motorname": "Motor3",
//       "status": "Flawless",
//       "number": 50,
//       "textnum": "50"
//     },
//   ]


import React from 'react';
// import { pie_data } from '../data/DummyData';
import ReactApexChart from 'react-apexcharts';
const PieChart = ({ title }) => {
  return (
    <>
<ReactApexChart
type="pie"
width={400}
height={400}

// This shows the quantity in piechart. We give it a number and it converts that number into % itself
series={[23,40,78]}

options={{
  // title:{text: title},
  title: {
    text: title,
    align: 'left',
    marginLeft: 3,
    style: {
      fontSize: '18px',
      color: '#000000', 
    }},
  noData: {text: "No Records found yet"},
  labels: ['Flawless', 'Faulty', 'Critical'],
  colors: ['#31C431', '#F9F502', '#DB1915']
}}
/>



    </>
  );
};

export default PieChart;
