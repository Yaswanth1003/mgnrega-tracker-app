import React from "react";
import { MapPin } from "lucide-react";

const DistrictSelector = ({
  districts,
  selectedDistrict,
  onSelectDistrict,
}) => {
  return (
    <div
      style={{
        padding: "25px",
        borderRadius: "18px",
        background: "linear-gradient(135deg, #E0F2F1, #FFFFFF)",
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
        marginBottom: "25px",
        transition: "transform 0.3s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <h2
        style={{
          fontSize: "26px",
          marginBottom: "18px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          color: "#0D9488",
          fontWeight: "700",
        }}
      >
        <MapPin size={28} color="#0D9488" />
        Select Your District
      </h2>

      <select
        value={selectedDistrict}
        onChange={(e) => onSelectDistrict(e.target.value)}
        style={{
          width: "100%",
          padding: "16px 20px",
          fontSize: "17px",
          borderRadius: "12px",
          backgroundColor: "#FFFFFF",
          cursor: "pointer",
          fontWeight: "600",
          outline: "none",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          transition: "all 0.2s ease",
          color: "#111827",
        }}
        onFocus={(e) =>
          (e.target.style.boxShadow = "0 4px 16px rgba(0,0,0,0.12)")
        }
        onBlur={(e) =>
          (e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)")
        }
      >
        <option value="">-- Choose District --</option>
        {districts.map((district) => (
          <option key={district} value={district}>
            {district}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DistrictSelector;
