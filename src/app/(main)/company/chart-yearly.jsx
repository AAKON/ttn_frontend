"use client";
import "./chart.css";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { year: "2013", uv: 94, turnover: 134 },
  { year: "2014", uv: 117, turnover: 166 },
  { year: "2015", uv: 72, turnover: 102 },
  { year: "2016", uv: 100, turnover: 142 },
  { year: "2017", uv: 72, turnover: 102 },
  { year: "2018", uv: 111, turnover: 158 },
  { year: "2019", uv: 94, turnover: 134 },
  { year: "2020", uv: 100, turnover: 142 },
  { year: "2021", uv: 94, turnover: 134 },
  { year: "2022", uv: 106, turnover: 150 },
  { year: "2023", uv: 117, turnover: 166 },
  { year: "2024", uv: 89, turnover: 126 },
];

const ChartYearly = () => {
  return (
    <div style={{ width: "100%", height: 240 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 0,
            right: 0,
            left: -18,
            bottom: 0,
          }}
        >
          <CartesianGrid
            stroke="#F2F4F7"
            strokeDasharray="0"
            horizontal={true}
            vertical={false}
          />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" />
          <Bar
            dataKey="turnover"
            name="Turnover (Million USD)"
            stackId="a"
            fill="#F9A94B"
            // radius={[10, 10, 0, 0]}
          />
          <Bar dataKey="uv" stackId="a" fill="#EAECF0" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartYearly;

// "use client";

// import React from 'react';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from 'recharts';

// const data = [
//   { year: '2013', turnover: 150 },
//   { year: '2014', turnover: 200 },
//   { year: '2015', turnover: 170 },
//   { year: '2016', turnover: 190 },
//   { year: '2017', turnover: 250 },
//   { year: '2018', turnover: 240 },
//   { year: '2019', turnover: 220 },
//   { year: '2020', turnover: 210 },
//   { year: '2021', turnover: 230 },
//   { year: '2022', turnover: 260 },
//   { year: '2023', turnover: 240 },
//   { year: '2024', turnover: 200 },
// ];

// const ChartYearly = () => {
//   return (
//     <div style={{ width: '100%', height: 400 }}>
//       <ResponsiveContainer>
//         <BarChart
//           data={data}
//           margin={{
//             top: 20,
//             right: 30,
//             left: 20,
//             bottom: 5,
//           }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="year" />
//           <YAxis
//             ticks={[0, 50, 100, 150, 200, 250, 300]} // Custom Y-axis ticks
//           />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="turnover" name="Turnover (Million USD)" fill="#FFA726" barSize={40} />
//           <Bar dataKey="turnover" name="Turnover Highlighted" fill="red" barSize={40} opacity={0.3} />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default ChartYearly;
