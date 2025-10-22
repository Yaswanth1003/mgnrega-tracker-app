import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const PerformanceIndicator = ({ current, previous }) => {
  if (current == null || previous == null) return null;

  const change = ((current - previous) / previous) * 100;
  const isPositive = change > 0;
  const isNeutral = Math.abs(change) < 0.5; // small threshold for neutral

  const color = isNeutral ? "#6b7280" : isPositive ? "#10b981" : "#ef4444";
  const Icon = isNeutral ? Minus : isPositive ? TrendingUp : TrendingDown;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginTop: "10px",
        padding: "8px 12px",
        borderRadius: "12px",
        backgroundColor: `${color}20`, // light transparent background
        width: "fit-content",
      }}
    >
      <Icon size={20} color={color} />
      <span style={{ fontWeight: "600", color }}>
        {isPositive ? "+" : ""}
        {change.toFixed(1)}%
      </span>
      <span style={{ fontSize: "14px", color: "#6b7280" }}>vs last month</span>
    </div>
  );
};

export default PerformanceIndicator;
