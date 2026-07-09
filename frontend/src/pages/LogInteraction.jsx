import { useState } from "react";
import { useDispatch } from "react-redux";
import { addInteraction } from "../redux/interactionSlice";
import api from "../services/api";

function LogInteraction() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    doctorName: "",
    hospital: "",
    specialization: "",
    interactionType: "Visit",
    products: "",
    followUpDate: "",
    notes: "",
  });

  const [aiResult, setAiResult] = useState(null);
  const [loading, setLoading] =useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Save to Redux
      setLoading(true);
      dispatch(addInteraction(formData));

      // Save to Backend
      const response = await api.post("/interaction", formData);
      console.log("Backend Response:", response.data);

      // Call AI Agent
      const aiResponse = await api.post("/ai-agent", formData);

      // Store AI response
      setAiResult(aiResponse.data);

      alert("Interaction Saved Successfully!");
      setLoading(false);
      // Reset form
      setFormData({
        doctorName: "",
        hospital: "",
        specialization: "",
        interactionType: "Visit",
        products: "",
        followUpDate: "",
        notes: "",
      });
    } catch (error) {
      setLoading(false);
  console.error("FULL ERROR:", error);

  if (error.response) {
    console.log("Backend Error:", error.response.data);
    alert(JSON.stringify(error.response.data));
  } else {
    alert(error.message);
  }
}
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Log HCP Interaction</h1>

      <div
        style={{
          display: "flex",
          gap: "30px",
          marginTop: "30px",
        }}
      >
        {/* Left Side */}
        <div
          style={{
            flex: 1,
            background: "white",
            padding: "25px",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Interaction Details</h2>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "15px" }}>
              <label>Doctor Name</label>
              <br />
              <input
  type="text"
  name="doctorName"
  value={formData.doctorName}
  onChange={handleChange}
  placeholder="Enter doctor name"
  required
  style={{ width: "100%", padding: "10px" }}
/>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Hospital</label>
              <br />
              <input
                type="text"
                name="hospital"
                value={formData.hospital}
                onChange={handleChange}
                placeholder="Enter hospital"
                required
                style={{ width: "100%", padding: "10px" }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Specialization</label>
              <br />
              <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                placeholder="Cardiology"
                required
                style={{ width: "100%", padding: "10px" }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Interaction Type</label>
              <br />
              <select
                name="interactionType"
                value={formData.interactionType}
                onChange={handleChange}
                style={{ width: "100%", padding: "10px" }}
              >
                <option>Visit</option>
                <option>Call</option>
                <option>Email</option>
              </select>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Products Discussed</label>
              <br />
              <input
                type="text"
                name="products"
                value={formData.products}
                onChange={handleChange}
                placeholder="Medicine names"
                required
                style={{ width: "100%", padding: "10px" }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Follow Up Date</label>
              <br />
              <input
                type="date"
                name="followUpDate"
                value={formData.followUpDate}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "10px" }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Notes</label>
              <br />
              <textarea
                rows="5"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                style={{ width: "100%", padding: "10px" }}
              />
            </div>

            <button
  type="submit"
  disabled={loading}
  style={{
    background: "#1E3A8A",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: loading ? "not-allowed" : "pointer",
    opacity: loading ? 0.6 : 1,
  }}
>
  {loading ? "Saving..." : "Save Interaction"}
</button>
          </form>
        </div>

        {/* Right Side */}
        <div
          style={{
            width: "400px",
            background: "white",
            padding: "25px",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2>🤖 AI Assistant</h2>

          <div
            style={{
              height: "600px",
              overflowY: "auto",
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "8px",
            }}
          >
            {!aiResult ? (
              <p>
                Hello! Fill in the interaction details and click
                <strong> Save Interaction</strong>.
              </p>
            ) : (
              <>
  <div
    style={{
      background: "#F8FAFC",
      padding: "15px",
      borderRadius: "10px",
      marginBottom: "15px",
      border: "1px solid #E5E7EB",
    }}
  >
    <h3>📄 Summary</h3>
    <pre
      style={{
        whiteSpace: "pre-wrap",
        fontFamily: "inherit",
      }}
    >
      {aiResult.summary}
    </pre>
  </div>

  <div
    style={{
      background: "#F8FAFC",
      padding: "15px",
      borderRadius: "10px",
      marginBottom: "15px",
      border: "1px solid #E5E7EB",
    }}
  >
    <h3>✉️ Email Draft</h3>
    <pre
      style={{
        whiteSpace: "pre-wrap",
        fontFamily: "inherit",
      }}
    >
      {aiResult.email}
    </pre>
  </div>

  <div
    style={{
      background: "#F8FAFC",
      padding: "15px",
      borderRadius: "10px",
      marginBottom: "15px",
      border: "1px solid #E5E7EB",
    }}
  >
    <h3>📅 Follow-up Suggestion</h3>
    <pre
      style={{
        whiteSpace: "pre-wrap",
        fontFamily: "inherit",
      }}
    >
      {aiResult.followup}
    </pre>
  </div>

  <div
    style={{
      background: "#F8FAFC",
      padding: "15px",
      borderRadius: "10px",
      border: "1px solid #E5E7EB",
    }}
  >
    <h3>💡 Next Best Action</h3>
    <pre
      style={{
        whiteSpace: "pre-wrap",
        fontFamily: "inherit",
      }}
    >
      {aiResult.action}
    </pre>
  </div>
</>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogInteraction;