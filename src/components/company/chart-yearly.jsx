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

const ChartYearly = ({chartData}) => {

  // Function to calculate "uv" based on "turnover"
  const calculateUv = (turnover) => {
    const turnoverValue = parseInt(turnover, 10);
    return Math.round(turnoverValue * 1.5);
  };

  let transformedData = [];
  if (Array.isArray(chartData) && chartData.length > 0) {
    transformedData = chartData.map((item) => ({
      year: item.year,
      turnover: parseInt(item.turnover, 10),
      uv: calculateUv(item.turnover),
    }));
  } else {
    console.warn("chartData is invalid or empty.");
  }

  return (
      <>
      {transformedData && transformedData.length > 0 && (
          <div style={{width: "100%", height: 240}}>
            <ResponsiveContainer>
              <BarChart
                  data={transformedData}
                  margin={{
                    top: 0,
                    right: 0,
                    left: -18,
                    bottom: 0,
                  }}
                  barCategoryGap={10}
              >
                <CartesianGrid
                    stroke="#F2F4F7"
                    strokeDasharray="0"
                    horizontal={true}
                    vertical={false}
                />
                <XAxis dataKey="year"/>
                <YAxis/>
                <Tooltip/>
                <Legend verticalAlign="top"/>
                <Bar
                    dataKey="turnover"
                    name="Turnover (Million USD)"
                    stackId="a"
                    fill="#F9A94B"
                    // radius={[10, 10, 0, 0]}
                />
                <Bar dataKey="uv" stackId="a" fill="#EAECF0"/>
              </BarChart>
            </ResponsiveContainer>
          </div>
      )}
      </>
  );
};

export default ChartYearly;