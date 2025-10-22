import React, { useState } from "react";

const LocationDetector = ({ onLocationDetected }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const detectLocation = () => {
    setLoading(true);
    setError("");

    if (!navigator.geolocation) {
      setError("Location not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();

          const state = data.address.state;
          const district = data.address.state_district || data.address.county;

          if (state && district) {
            onLocationDetected({
              state: state.toUpperCase(),
              district: district.toUpperCase(),
            });
          } else {
            setError("Could not detect your location");
          }
        } catch (err) {
          setError("Failed to detect location");
        }

        setLoading(false);
      },
      () => {
        setError("Please allow location access in your browser");
        setLoading(false);
      }
    );
  };

  return (
    <div
      style={{
        backgroundColor: "#1f2937",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "20px",
        textAlign: "center",
        border: "2px solid #10b981",
      }}
    >
      <button
        onClick={detectLocation}
        disabled={loading}
        style={{
          padding: "15px 30px",
          fontSize: "18px",
          backgroundColor: loading ? "#6b7280" : "#10b981",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: loading ? "not-allowed" : "pointer",
          fontWeight: "bold",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        {loading ? "🔄 Detecting Location..." : "📍 Auto-Detect My Location"}
      </button>

      {error && (
        <p style={{ color: "#ef4444", marginTop: "10px", fontSize: "14px" }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default LocationDetector;
