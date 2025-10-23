import React, { useState } from "react";
import Translations from "../components/Translations"; // adjust path if needed

const LocationDetector = ({ onLocationDetected, lang = "en" }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const detectLocation = () => {
    setLoading(true);
    setError("");

    if (!navigator.geolocation) {
      setError(
        Translations[lang]["location_not_supported"] ||
          "Location not supported by your browser"
      );
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
            {
              headers: {
                "User-Agent": "mgnrega-tracker-app/1.0 (yaswanth@example.com)",
              },
            }
          );

          const data = await response.json();
          const state =
            data.address.state ||
            data.address.region ||
            data.address.state_name;

          const district =
            data.address.state_district ||
            data.address.county ||
            data.address.suburb ||
            data.address.city_district ||
            data.address.city;

          if (state && district) {
            onLocationDetected({
              state: state.toUpperCase(),
              district: district.toUpperCase(),
            });
          } else {
            setError(
              Translations[lang]["location_not_accurate"] ||
                "Could not detect your location accurately"
            );
          }
        } catch (err) {
          setError(
            Translations[lang]["location_failed"] || "Failed to detect location"
          );
        }

        setLoading(false);
      },
      () => {
        setError(
          Translations[lang]["location_permission"] ||
            "Please allow location access in your browser"
        );
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
        {loading
          ? Translations[lang]["detecting_location"] ||
            "🔄 Detecting Location..."
          : Translations[lang]["auto_detect_state"] ||
            "📍 Auto-Detect My State"}
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
