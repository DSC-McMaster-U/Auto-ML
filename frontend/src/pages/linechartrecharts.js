// LineChartRecharts.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const LineChartRecharts = () => {
  const data = [
    { name: 'Point #1', value: 10 },
    { name: 'Point #2', value: 25 },
    { name: 'Point #3', value: 18 },
    { name: 'Point #4', value: 30 },
    { name: 'Point #5', value: 15 },
  ];

  return (
    <LineChart width={400} height={300} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
      <Tooltip />
      <Legend />
    </LineChart>
  );
};

export default LineChartRecharts;
