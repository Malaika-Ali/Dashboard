import React,{useState,useEffect} from 'react'
import ReactApexChart from 'react-apexcharts';


function CircularProgressChart({ progress, barColor, motorCategory }) {
// states and functions to handle the responsiveness of the height
  const [screenSize, setScreenSize] = useState('');
  useEffect(() => {
    const handleResize = () => {
      if (screenSize < 1024) {
        setScreenSize('med');
      } else {
        setScreenSize('sml');
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


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



  return (
    <>
      <div className='bg-white md:w-40 md:h-40 lg:h-52 rounded-xl lg:w-52 flex flex-col justify-center items-center dark-box-shadow large:w-60 large:h-60'>
        <ReactApexChart
          options={chartOptions}
          series={chartSeries}
          type="radialBar"
          // height={250}
          height={screenSize === 'med' ? 220 : 250}
        />
      </div>
    </>
  )
}

export default CircularProgressChart
