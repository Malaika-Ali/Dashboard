import React,{useState,useEffect} from 'react'
import ReactApexChart from 'react-apexcharts';



function CircularProgressChart({ progress, barColor, motorCategory }) {
  const chartOptions = {
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 15,
          size: '70%',
        },
        dataLabels: {
          showOn: 'always',
          name: {
            offsetY: -10,
            show: true,
            color: '#5C61F2',
            fontSize: '15px',
            fontFamily: 'Poppins',
          },
          value: {
            color: 'rgb(52, 71, 103)',
            fontSize: '20px',
            fontFamily: 'Poppins',
            fontWeight: '600',
            show: true,
            formatter: function (val) {
              return parseInt(val) + '%';
            },
          },
        },
      },
    },
    fill: {
      colors: [barColor],
    },
    stroke: {
      lineCap: 'round',
    },
    labels: [motorCategory],
  };


  const chartSeries = [progress];

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
     chartHeight = 190;
   }
   else if (screenSize === 'very large') {
     chartHeight = 260;
   } else {
     chartHeight = 260;
   }
 
  return (
    <>
      <div className='bg-white shadow-xl md:w-44 md:h-44 lg:h-56 rounded-xl border border-slate-200 lg:w-[15rem] flex flex-col justify-center items-center large:w-64 large:h-56'>
        <ReactApexChart
          options={chartOptions}
          series={chartSeries}
          type="radialBar"
          // height={250}
          height={chartHeight}
        />
      </div>
    </>
  )
}

export default CircularProgressChart
