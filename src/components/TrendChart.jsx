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
import Translations from "./Translations";

const TrendChart = ({ data, dataKey, titleKey, color, lang = "en" }) => {
  const chartData = data.map((row) => ({
    month: row.month,
    value: Number(row[dataKey]) || 0,
  }));

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "35px",
        borderRadius: "22px",
        boxShadow: "0 12px 28px rgba(0,0,0,0.15)",
        marginTop: "30px",
        border: `3px solid ${color}20`,
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <h3
        style={{
          fontSize: "26px",
          marginBottom: "28px",
          color: "#111827",
          fontWeight: "700",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        {Translations[lang]?.[titleKey] || titleKey}
      </h3>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="month"
            style={{ fontSize: "16px", fontWeight: "600" }}
            stroke="#666"
          />
          <YAxis
            style={{ fontSize: "16px", fontWeight: "600" }}
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
