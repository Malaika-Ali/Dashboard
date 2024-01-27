// import React from 'react'
// import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, AccumulationLegend, PieSeries, AccumulationDataLabel, Inject, AccumulationTooltip } from '@syncfusion/ej2-react-charts';

// // import { pie_data } from '../data/DummyData';

// export default function PieChart() {

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
//   return (
//     <div>
//       <AccumulationChartComponent title='Motors Condition Summary'>
//         <Inject services={[PieSeries, AccumulationDataLabel,AccumulationLegend]}></Inject>
//         <AccumulationSeriesCollectionDirective>
//           <AccumulationSeriesDirective type='Pie' dataSource={pie_data} xName='status' yName='number' dataLabel={{visible:true, status:"textnum",position:"Inside"}}></AccumulationSeriesDirective>
//         </AccumulationSeriesCollectionDirective>
//       </AccumulationChartComponent>
//     </div>
//   )
// }



// PieChart.js

import React from 'react';
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  AccumulationDataLabel,
  AccumulationLegend,
  AccumulationTooltip,
  PieSeries,
} from '@syncfusion/ej2-react-charts';

const PieChart = ({ data, title }) => {
  return (
    <ChartComponent title={title}>
      <Inject services={[AccumulationDataLabel, AccumulationLegend, AccumulationTooltip, PieSeries]} />
      <SeriesCollectionDirective>
        <SeriesDirective dataSource={data} xName="x" yName="y" type="PieSeriesModule">
        </SeriesDirective>
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default PieChart;
