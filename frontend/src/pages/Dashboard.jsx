import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);
function Dashboard() {
  const [interactions, setInteractions] = useState([]);
const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetchInteractions();

  const interval = setInterval(() => {
    fetchInteractions();
  }, 10000); // every 10 seconds

  return () => clearInterval(interval);
}, []);

  const fetchInteractions = async () => {
  try {
    const response = await api.get("/interactions");
    setInteractions(response.data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  const totalInteractions = interactions.length;

  const totalDoctors = new Set(
    interactions.map((item) => item.doctorName)
  ).size;

  const followUps = interactions.filter(
    (item) => item.followUpDate
  ).length;

  const aiSuggestions = totalInteractions;
  const latestInteractions = interactions.slice(-5).reverse();
  const recentDoctors = [...new Set(
  interactions.map((item) => item.doctorName)
)].slice(0, 5);

const recentHospitals = [...new Set(
  interactions.map((item) => item.hospital)
)].slice(0, 5);
// Count interaction types
const interactionTypeCounts = {};

interactions.forEach((item) => {
  interactionTypeCounts[item.interactionType] =
    (interactionTypeCounts[item.interactionType] || 0) + 1;
});

// Bar Chart Data
const barData = {
  labels: Object.keys(interactionTypeCounts),
  datasets: [
    {
      label: "Interactions",
      data: Object.values(interactionTypeCounts),
      backgroundColor: [
        "#2563EB",
        "#16A34A",
        "#F59E0B",
        "#DC2626",
        "#7C3AED",
      ],
    },
  ],
};

// Pie Chart Data
const pieData = {
  labels: ["Doctors", "Hospitals"],
  datasets: [
    {
      data: [totalDoctors, recentHospitals.length],
      backgroundColor: [
        "#2563EB",
        "#16A34A",
      ],
    },
  ],
};
  const cardStyle = {
    background: "white",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  };
  if (loading) {
  return (
    <div
      style={{
        padding: "50px",
        textAlign: "center",
        fontSize: "22px",
      }}
    >
      Loading Dashboard...
    </div>
  );
}

  return (
    <div style={{ padding: "30px" }}>
      <h1>Dashboard</h1>
      <p>Welcome to the AI-First CRM HCP Module.</p>
      <div
  style={{
    display: "flex",
    gap: "15px",
    marginTop: "20px",
    marginBottom: "30px",
  }}
>
  <Link to="/log">
    <button
      style={{
        background: "#2563EB",
        color: "white",
        border: "none",
        padding: "10px 18px",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      ➕ Log Interaction
    </button>
  </Link>

  <Link to="/history">
    <button
      style={{
        background: "#16A34A",
        color: "white",
        border: "none",
        padding: "10px 18px",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      📋 View History
    </button>
  </Link>
</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <div style={cardStyle}>
          <h2>👨‍⚕️ Total Doctors</h2>
          <h1>{totalDoctors}</h1>
        </div>

        <div style={cardStyle}>
          <h2>📝 Total Interactions</h2>
          <h1>{totalInteractions}</h1>
        </div>

        <div style={cardStyle}>
          <h2>📅 Follow-ups</h2>
          <h1>{followUps}</h1>
        </div>

        <div style={cardStyle}>
          <h2>🤖 AI Suggestions</h2>
          <h1>{aiSuggestions}</h1>
        </div>
            </div>
      <div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginTop: "40px",
  }}
>
  {/* Bar Chart */}
  <div
    style={{
      background: "white",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    }}
  >
    <h2>📊 Interactions by Type</h2>

    <Bar data={barData} />
  </div>

  {/* Pie Chart */}
  <div
    style={{
      background: "white",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    }}
  >
    <h2>🥧 Doctors vs Hospitals</h2>

    <Pie data={pieData} />
  </div>
</div>
      <div
        style={{
          marginTop: "40px",
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2>Recent Interactions</h2>

        <table
          border="1"
          cellPadding="10"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Hospital</th>
              <th>Type</th>
              <th>Follow Up</th>
            </tr>
          </thead>

          <tbody>
            {latestInteractions.map((item) => (
                <tr key={item.id}>
                  <td>{item.doctorName}</td>
                  <td>{item.hospital}</td>
                  <td>{item.interactionType}</td>
                  <td>
  {item.followUpDate}

  <br />

  {new Date(item.followUpDate) >= new Date() ? (
    <span style={{ color: "green", fontWeight: "bold" }}>
      Upcoming
    </span>
  ) : (
    <span style={{ color: "red", fontWeight: "bold" }}>
      Overdue
    </span>
  )}
</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div
  style={{
    marginTop: "30px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  }}
>
  {/* Recent Doctors */}
  <div
    style={{
      background: "white",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    }}
  >
    <h2>👨‍⚕️ Recent Doctors</h2>

    {recentDoctors.length === 0 ? (
      <p>No doctors available.</p>
    ) : (
      <ul>
        {recentDoctors.map((doctor, index) => (
          <li key={index}>{doctor}</li>
        ))}
      </ul>
    )}
  </div>

  {/* Recent Hospitals */}
  <div
    style={{
      background: "white",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    }}
  >
    <h2>🏥 Recent Hospitals</h2>

    {recentHospitals.length === 0 ? (
      <p>No hospitals available.</p>
    ) : (
      <ul>
        {recentHospitals.map((hospital, index) => (
          <li key={index}>{hospital}</li>
        ))}
      </ul>
    )}
  </div>
</div>

    </div>

    
  );
}

export default Dashboard;
