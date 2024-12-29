'use client'
import React from 'react';
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

function MarketShareChart({data, locations}) {

    return (
        <>
            {data && locations && data.length > 0 && locations.length > 0 && (
                <div style={{width: "100%", height: 240}}>
                    <ResponsiveContainer height={240}>
                        <BarChart
                            data={data.map((row) => {
                                // Find the matching location by ID
                                const location = locations.find((loc) => loc.id === Number(row.country));
                                return {
                                    country: location?.name || "Unknown", // Use the country name or a fallback
                                    percentage: Number(row.percentage) || 0,
                                };
                            })}

                            margin={{ top: 0, right: 0, left: -18, bottom: 0 }}
                        >
                            <CartesianGrid stroke="#F2F4F7" horizontal vertical={false} />
                            <XAxis dataKey="country" />
                            <YAxis />
                            <Tooltip />
                            <Legend verticalAlign="top" />
                            <Bar
                                dataKey="percentage"
                                name="Market Share"
                                stackId="a"
                                fill="#F9A94B"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </>
    );
}

export default MarketShareChart;
