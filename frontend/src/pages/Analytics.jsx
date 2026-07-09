import { useEffect, useState } from "react";
import api from "../services/api";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function Analytics() {
  const [interactions, setInteractions] = useState([]);

  useEffect(() => {
    fetchInteractions();
  }, []);

  const fetchInteractions = async () => {
    try {
      const response = await api.get("/interactions");
      setInteractions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Count interaction types
  const interactionCounts = {};

  interactions.forEach((item) => {
    interactionCounts[item.interactionType] =
      (interactionCounts[item.interactionType] || 0) + 1;
  });

  const interactionData = Object.keys(interactionCounts).map((key) => ({
    name: key,
    value: interactionCounts[key],
  }));

  // Count specializations
  const specializationCounts = {};

  interactions.forEach((item) => {
    specializationCounts[item.specialization] =
      (specializationCounts[item.specialization] || 0) + 1;
  });

  const specializationData = Object.keys(specializationCounts).map((key) => ({
    specialization: key,
    count: specializationCounts[key],
  }));

  const COLORS = ["#1E3A8A", "#3B82F6", "#60A5FA", "#93C5FD"];

  return (
    <div style={{ padding: "30px" }}>
      <h1>Analytics Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: "40px",
          marginTop: "30px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            width: "500px",
            height: "350px",
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Interaction Types</h3>

          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie
                data={interactionData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {interactionData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div
          style={{
            width: "600px",
            height: "350px",
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Doctors by Specialization</h3>

          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={specializationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="specialization" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#1E3A8A" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Analytics;