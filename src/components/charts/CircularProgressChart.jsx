import React,{useState,useEffect} from 'react'
import ReactApexChart from 'react-apexcharts';


function CircularProgressChart({ progress, barColor, motorCategory }) {
  const chartOptions = {
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 15,
          size: '50%',
        },
        dataLabels: {
          showOn: 'always',
          name: {
            offsetY: -10,
            show: true,
            color: '#888',
            fontSize: '13px',
          },
          value: {
            color: '#111',
            fontSize: '30px',
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
     chartHeight = 180;
   }
   else if (screenSize === 'very large') {
     chartHeight = 320;
   } else {
     chartHeight = 280;
   }
 
  return (
    <>
      <div className='bg-white md:w-40 md:h-40 lg:h-52 rounded-xl lg:w-52 flex flex-col justify-center items-center dark-box-shadow shadow-xl large:w-80 large:h-64'>
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
