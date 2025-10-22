import React, { useState, useEffect } from "react";
import { Users, Briefcase, TrendingUp, Calendar } from "lucide-react";
import PerformanceIndicator from "./components/PerformanceIndicator";
import StateSelector from "./components/StateSelector";
import DistrictSelector from "./components/DistrictSelector";
import PerformanceCard from "./components/PerformanceCard";
import TrendChart from "./components/TrendChart";
import Footer from "./components/Footer";
import LocationDetector from "./components/LocationDetector";
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
import { BarChart3, LogIn, UserPlus } from "lucide-react";

function App() {
  const [districtLoading, setDistrictLoading] = useState(false);
  const [allData, setAllData] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [districtData, setDistrictData] = useState(null);
  const [loading, setLoading] = useState(true);

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
          MGNREGA Dashboard
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
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#00e6b820")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <LogIn size={18} />
            Login
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
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#00cba3")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#00e6b8")
            }
          >
            <UserPlus size={18} />
            Sign Up
          </button>
        </div>
      </nav>
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
          Welcome to MGNREGA Tracker
        </h1>
        <p style={{ marginTop: "12px", fontSize: "18px", opacity: 0.9 }}>
          Explore real-time employment and development data across India
        </p>
      </header>
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
            title: "Real-time Data",
            icon: "📊",
            color: "#00e6b8",
            desc: "Access the latest district-wise data and insights.",
          },
          {
            title: "Trend Analysis",
            icon: "📈",
            color: "#3b82f6",
            desc: "Visualize worker, project, and wage trends clearly.",
          },
          {
            title: "Project Insights",
            icon: "🏗️",
            color: "#f59e0b",
            desc: "Track projects completed and ongoing efficiently.",
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
              {card.icon} {card.title}
            </h3>
            <p style={{ color: "#ccc", marginTop: "10px" }}>{card.desc}</p>
          </div>
        ))}
      </div>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        <LocationDetector
          onLocationDetected={(location) => {
            const stateMatch = states.find(
              (s) =>
                s.toUpperCase().includes(location.state.toUpperCase()) ||
                location.state.toUpperCase().includes(s.toUpperCase())
            );

            if (stateMatch) {
              setSelectedState(stateMatch);

              setTimeout(() => {
                const districtList = getDistricts(allData, stateMatch);
                const districtMatch = districtList.find(
                  (d) =>
                    d.toUpperCase().includes(location.district.toUpperCase()) ||
                    location.district.toUpperCase().includes(d.toUpperCase())
                );

                if (districtMatch) {
                  setSelectedDistrict(districtMatch);
                }
              }, 500);
            }
          }}
        />

        <StateSelector
          states={states}
          selectedState={selectedState}
          onSelectState={setSelectedState}
        />

        {selectedState && (
          <div style={{ marginTop: "20px" }}>
            <DistrictSelector
              districts={districts}
              selectedDistrict={selectedDistrict}
              onSelectDistrict={setSelectedDistrict}
            />
          </div>
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
            Fetching your district data...
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
                Data for {latestData.month} {latestData.fin_year}
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
                  title="Total Workers"
                  value={formatNumber(latestData.Total_Individuals_Worked)}
                  color="#10b981"
                  subtitle="People employed"
                />
                {previousData && (
                  <PerformanceIndicator
                    current={latestData.Total_Individuals_Worked}
                    previous={previousData.Total_Individuals_Worked}
                  />
                )}
              </div>

              <div>
                <PerformanceCard
                  icon={Briefcase}
                  title="Total Works"
                  value={latestData.Total_No_of_Works_Takenup}
                  color="#3b82f6"
                  subtitle="Projects taken up"
                />
                {previousData && (
                  <PerformanceIndicator
                    current={latestData.Total_No_of_Works_Takenup}
                    previous={previousData.Total_No_of_Works_Takenup}
                  />
                )}
              </div>

              <div>
                <PerformanceCard
                  icon={TrendingUp}
                  title="Average Wage"
                  value={`₹${Math.round(
                    latestData.Average_Wage_rate_per_day_per_person
                  )}`}
                  color="#f59e0b"
                  subtitle="Per day per person"
                />
                {previousData && (
                  <PerformanceIndicator
                    current={latestData.Average_Wage_rate_per_day_per_person}
                    previous={previousData.Average_Wage_rate_per_day_per_person}
                  />
                )}
              </div>

              <div>
                <PerformanceCard
                  icon={Calendar}
                  title="Avg Days/Household"
                  value={Math.round(
                    latestData.Average_days_of_employment_provided_per_Household
                  )}
                  color="#8b5cf6"
                  subtitle="Employment provided"
                />
                {previousData && (
                  <PerformanceIndicator
                    current={
                      latestData.Average_days_of_employment_provided_per_Household
                    }
                    previous={
                      previousData.Average_days_of_employment_provided_per_Household
                    }
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
      <Footer />;
    </div>
  );
}

export default App;
