import React from "react";

const PerformanceCard = ({ icon: Icon, title, value, color, subtitle }) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "25px",
        borderRadius: "20px",
        boxShadow:
          "6px 6px 20px rgba(0,0,0,0.05), -6px -6px 20px rgba(255,255,255,0.8)",
        border: `2px solid ${color}33`,
        cursor: "pointer",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow =
          "10px 10px 25px rgba(0,0,0,0.08), -10px -10px 25px rgba(255,255,255,0.8)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow =
          "6px 6px 20px rgba(0,0,0,0.05), -6px -6px 20px rgba(255,255,255,0.8)";
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            width: "55px",
            height: "55px",
            borderRadius: "50%",
            background: `linear-gradient(145deg, ${color}33, ${color}1A)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
          }}
        >
          <Icon size={28} color={color} strokeWidth={2.5} />
        </div>
        <h3
          style={{
            fontSize: "18px",
            color: "#333",
            margin: 0,
            fontWeight: "700",
          }}
        >
          {title}
        </h3>
      </div>

      <div
        style={{
          fontSize: "44px",
          fontWeight: "bold",
          color: color,
          marginBottom: "12px",
          textAlign: "center",
          transition: "color 0.3s ease, transform 0.3s ease",
        }}
      >
        {value}
      </div>

      {subtitle && (
        <div
          style={{
            fontSize: "15px",
            color: "#777",
            textAlign: "center",
            fontWeight: "500",
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
};

export default PerformanceCard;
