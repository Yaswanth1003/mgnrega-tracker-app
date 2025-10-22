import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TrendChart = ({ data, dataKey, title, color }) => {
  const chartData = data.map((row) => ({
    month: row.month,
    value: Number(row[dataKey]) || 0,
  }));

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "20px",
        boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
        marginTop: "25px",
        border: `3px solid ${color}20`,
      }}
    >
      <h3
        style={{
          fontSize: "24px",
          marginBottom: "25px",
          color: "#333",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {title}
      </h3>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="month"
            style={{ fontSize: "16px", fontWeight: "bold" }}
            stroke="#666"
          />
          <YAxis
            style={{ fontSize: "16px", fontWeight: "bold" }}
            stroke="#666"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: `2px solid ${color}`,
              borderRadius: "8px",
              fontSize: "16px",
              padding: "12px",
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={4}
            dot={{ fill: color, r: 6 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;
