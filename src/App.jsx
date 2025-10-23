import React, { useState, useEffect } from "react";
import {
  Users,
  Briefcase,
  TrendingUp,
  Calendar,
  BarChart3,
  LogIn,
  UserPlus,
} from "lucide-react";
import LocationDetector from "./components/LocationDetector";
import PerformanceIndicator from "./components/PerformanceIndicator";
import StateSelector from "./components/StateSelector";
import DistrictSelector from "./components/DistrictSelector";
import PerformanceCard from "./components/PerformanceCard";
import TrendChart from "./components/TrendChart";
import Footer from "./components/Footer";
import Translations from "./components/Translations";
import {
  loadCSVData,
  getStates,
  getDistricts,
  getDistrictData,
} from "./utils/csvParser";
import {
  getLatestData,
  getPreviousData,
  getTrendData,
  formatNumber,
} from "./utils/dataProcessor";

function App() {
  const [districtLoading, setDistrictLoading] = useState(false);
  const [allData, setAllData] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [districtData, setDistrictData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState("en"); // default language

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await loadCSVData();
      setAllData(data);
      setStates(getStates(data));
      setLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (selectedState && allData.length > 0) {
      const districtList = getDistricts(allData, selectedState);
      setDistricts(districtList);
      setSelectedDistrict("");
      setDistrictData(null);
    }
  }, [selectedState, allData]);

  useEffect(() => {
    if (selectedState && selectedDistrict && allData.length > 0) {
      setDistrictLoading(true);
      setTimeout(() => {
        setDistrictData(
          getDistrictData(allData, selectedState, selectedDistrict)
        );
        setDistrictLoading(false);
      }, 300);
    }
  }, [selectedState, selectedDistrict, allData]);

  const latestData = districtData ? getLatestData(districtData) : null;
  const previousData = districtData ? getPreviousData(districtData) : null;
  const trendData = districtData ? getTrendData(districtData) : [];

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: "#0a0a0a",
        color: "#f0f0f0",
        minHeight: "100vh",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "18px 40px",
          background: "rgba(255, 255, 255, 0.05)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(8px)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "22px",
            fontWeight: "bold",
            color: "#00e6b8",
          }}
        >
          <BarChart3 size={26} color="#00e6b8" />
          {Translations[lang]?.dashboard_title || "MGNREGA Dashboard"}
        </div>

        {/* Language Switcher */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label
            htmlFor="langSelect"
            style={{ color: "#00e6b8", fontWeight: 600 }}
          >
            {Translations[lang]?.language_label || "Language"}:
          </label>
          <select
            id="langSelect"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            style={{
              padding: "6px 10px",
              borderRadius: "6px",
              border: "1.5px solid #00e6b8",
              backgroundColor: "#0a0a0a",
              color: "#f0f0f0",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
            <option value="te">తెలుగు</option>
          </select>
        </div>

        <div style={{ display: "flex", gap: "15px" }}>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "transparent",
              border: "1.5px solid #00e6b8",
              color: "#00e6b8",
              padding: "10px 18px",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            <LogIn size={18} />
            {Translations[lang]?.login || "Login"}
          </button>

          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "#00e6b8",
              color: "#000",
              border: "none",
              padding: "10px 18px",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            <UserPlus size={18} />
            {Translations[lang]?.signup || "Sign Up"}
          </button>
        </div>
      </nav>

      {/* Header */}
      <header
        style={{
          background: "linear-gradient(90deg, #00e6b8, #0072ff)",
          color: "white",
          padding: "50px 20px",
          textAlign: "center",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "42px", fontWeight: "700" }}>
          {Translations[lang]?.welcome_msg || "Welcome to MGNREGA Tracker"}
        </h1>
        <p style={{ marginTop: "12px", fontSize: "18px", opacity: 0.9 }}>
          {Translations[lang]?.explore_data ||
            "Explore real-time employment and development data across India"}
        </p>
      </header>

      {/* Cards */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          padding: "50px 20px",
        }}
      >
        {[
          {
            title: "real_time_data",
            icon: "📊",
            color: "#00e6b8",
            desc: "access_latest_data",
          },
          {
            title: "trend_analysis",
            icon: "📈",
            color: "#3b82f6",
            desc: "visualize_trends",
          },
          {
            title: "project_insights",
            icon: "🏗️",
            color: "#f59e0b",
            desc: "track_projects",
          },
        ].map((card, i) => (
          <div
            key={i}
            style={{
              background: "#111",
              borderRadius: "20px",
              padding: "30px",
              width: "280px",
              boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
              transition: "transform 0.3s, box-shadow 0.3s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.4)";
            }}
          >
            <h3 style={{ color: card.color, fontSize: "22px" }}>
              {card.icon} {Translations[lang]?.[card.title] || card.title}
            </h3>
            <p style={{ color: "#ccc", marginTop: "10px" }}>
              {Translations[lang]?.[card.desc] || card.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Main Dashboard */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        {/* Location Detector */}
        <LocationDetector
          lang={lang}
          onLocationDetected={(location) => {
            const stateMatch = states.find((s) =>
              s.toUpperCase().includes(location.state.toUpperCase())
            );
            if (stateMatch) setSelectedState(stateMatch);
          }}
        />

        <StateSelector
          states={states}
          selectedState={selectedState}
          onSelectState={setSelectedState}
          lang={lang}
        />

        {selectedState && (
          <DistrictSelector
            districts={districts}
            selectedDistrict={selectedDistrict}
            onSelectDistrict={setSelectedDistrict}
            lang={lang}
          />
        )}

        {districtLoading && (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              fontSize: "22px",
              color: "#00e6b8",
              backgroundColor: "#111",
              borderRadius: "20px",
              marginTop: "30px",
              fontWeight: "bold",
              boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "10px" }}>⏳</div>
            {Translations[lang]?.fetching_data ||
              "Fetching your district data..."}
          </div>
        )}

        {!districtLoading && latestData && (
          <div style={{ marginTop: "30px" }}>
            <div
              style={{
                backgroundColor: "#111",
                padding: "25px",
                borderRadius: "20px",
                marginBottom: "25px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
              }}
            >
              <h2 style={{ fontSize: "28px", color: "#00e6b8" }}>
                📊 {selectedDistrict}, {selectedState}
              </h2>
              <p style={{ color: "#aaa" }}>
                {Translations[lang]?.data_for || "Data for"} {latestData.month}{" "}
                {latestData.fin_year}
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "20px",
              }}
            >
              <div>
                <PerformanceCard
                  icon={Users}
                  title="total_workers"
                  value={formatNumber(latestData.Total_Individuals_Worked)}
                  color="#10b981"
                  subtitle="people_employed"
                  lang={lang}
                />
                {previousData && (
                  <PerformanceIndicator
                    current={latestData.Total_Individuals_Worked}
                    previous={previousData.Total_Individuals_Worked}
                    lang={lang}
                  />
                )}
              </div>

              <div>
                <PerformanceCard
                  icon={Briefcase}
                  title="total_works"
                  value={latestData.Total_No_of_Works_Takenup}
                  color="#3b82f6"
                  subtitle="projects_taken_up"
                  lang={lang}
                />
                {previousData && (
                  <PerformanceIndicator
                    current={latestData.Total_No_of_Works_Takenup}
                    previous={previousData.Total_No_of_Works_Takenup}
                    lang={lang}
                  />
                )}
              </div>

              <div>
                <PerformanceCard
                  icon={TrendingUp}
                  title="average_wage"
                  value={`₹${Math.round(
                    latestData.Average_Wage_rate_per_day_per_person
                  )}`}
                  color="#f59e0b"
                  subtitle="per_day_per_person"
                  lang={lang}
                />
                {previousData && (
                  <PerformanceIndicator
                    current={latestData.Average_Wage_rate_per_day_per_person}
                    previous={previousData.Average_Wage_rate_per_day_per_person}
                    lang={lang}
                  />
                )}
              </div>

              <div>
                <PerformanceCard
                  icon={Calendar}
                  title="avg_days_household"
                  value={Math.round(
                    latestData.Average_days_of_employment_provided_per_Household
                  )}
                  color="#8b5cf6"
                  subtitle="employment_provided"
                  lang={lang}
                />
                {previousData && (
                  <PerformanceIndicator
                    current={
                      latestData.Average_days_of_employment_provided_per_Household
                    }
                    previous={
                      previousData.Average_days_of_employment_provided_per_Household
                    }
                    lang={lang}
                  />
                )}
              </div>
            </div>

            <TrendChart
              data={trendData}
              dataKey="Total_Individuals_Worked"
              title="👥 Workers Trend (Last 6 Months)"
              color="#10b981"
            />
            <TrendChart
              data={trendData}
              dataKey="Total_No_of_Works_Takenup"
              title="🏗️ Works Taken Up (Last 6 Months)"
              color="#3b82f6"
            />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default App;
