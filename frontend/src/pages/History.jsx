import { useEffect, useState } from "react";
import api from "../services/api";

function History() {
  const [interactions, setInteractions] = useState([]);
  const [search, setSearch] = useState("");
  const [editingInteraction, setEditingInteraction] = useState(null);

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

  const deleteInteraction = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this interaction?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/interaction/${id}`);

      alert("Interaction deleted successfully!");

      fetchInteractions();
    } catch (error) {
      console.error(error);
      alert("Failed to delete interaction.");
    }
  };

  const updateInteraction = async () => {
    try {
      await api.put(
        `/interaction/${editingInteraction.id}`,
        editingInteraction
      );

      alert("Interaction Updated Successfully!");

      setEditingInteraction(null);

      fetchInteractions();
    } catch (error) {
      console.error(error);
      alert("Failed to update interaction.");
    }
  };

  const filteredInteractions = interactions.filter(
    (item) =>
      item.doctorName.toLowerCase().includes(search.toLowerCase()) ||
      item.hospital.toLowerCase().includes(search.toLowerCase())
  );

  const exportCSV = () => {
    const headers = [
      "ID",
      "Doctor",
      "Hospital",
      "Type",
      "Products",
      "Follow Up",
    ];

    const rows = interactions.map((item) => [
      item.id,
      item.doctorName,
      item.hospital,
      item.interactionType,
      item.products,
      item.followUpDate,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "interaction_history.csv";
    link.click();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Interaction History</h2>

      <input
        type="text"
        placeholder="Search by Doctor or Hospital..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          fontSize: "16px",
        }}
      />

      <button
        onClick={exportCSV}
        style={{
          background: "#16A34A",
          color: "white",
          border: "none",
          padding: "10px 18px",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        📥 Export CSV
      </button>

      {editingInteraction && (
        <div
          style={{
            background: "#EFF6FF",
            border: "1px solid #93C5FD",
            padding: "20px",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        >
          <h3>Editing Interaction</h3>

          <div style={{ marginBottom: "10px" }}>
            <label>Doctor</label>
            <input
              type="text"
              value={editingInteraction.doctorName}
              onChange={(e) =>
                setEditingInteraction({
                  ...editingInteraction,
                  doctorName: e.target.value,
                })
              }
              style={{ width: "100%", padding: "8px" }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Hospital</label>
            <input
              type="text"
              value={editingInteraction.hospital}
              onChange={(e) =>
                setEditingInteraction({
                  ...editingInteraction,
                  hospital: e.target.value,
                })
              }
              style={{ width: "100%", padding: "8px" }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Products</label>
            <input
              type="text"
              value={editingInteraction.products}
              onChange={(e) =>
                setEditingInteraction({
                  ...editingInteraction,
                  products: e.target.value,
                })
              }
              style={{ width: "100%", padding: "8px" }}
            />
          </div>

          <button
            onClick={updateInteraction}
            style={{
              background: "#16A34A",
              color: "white",
              border: "none",
              padding: "10px 18px",
              borderRadius: "6px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            Save Changes
          </button>

          <button
            onClick={() => setEditingInteraction(null)}
            style={{
              background: "#6B7280",
              color: "white",
              border: "none",
              padding: "10px 18px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      )}

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "white",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <thead
          style={{
            backgroundColor: "#1E3A8A",
            color: "white",
          }}
        >
          <tr>
            <th style={{ padding: "12px" }}>ID</th>
            <th style={{ padding: "12px" }}>Doctor</th>
            <th style={{ padding: "12px" }}>Hospital</th>
            <th style={{ padding: "12px" }}>Type</th>
            <th style={{ padding: "12px" }}>Follow Up</th>
            <th style={{ padding: "12px" }}>Action</th>
          </tr>
        </thead>

     <tbody>
  {filteredInteractions.length === 0 ? (
    <tr>
      <td
        colSpan="6"
        style={{
          textAlign: "center",
          padding: "20px",
          color: "#6B7280",
        }}
      >
        No interactions found.
      </td>
    </tr>
  ) : (
    filteredInteractions.map((item, index) => (
      <tr
        key={item.id}
        style={{
          backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#F8FAFC",
        }}
      >
        <td style={{ padding: "12px", border: "1px solid #ddd" }}>
          {item.id}
        </td>

        <td style={{ padding: "12px", border: "1px solid #ddd" }}>
          {item.doctorName}
        </td>

        <td style={{ padding: "12px", border: "1px solid #ddd" }}>
          {item.hospital}
        </td>

        <td style={{ padding: "12px", border: "1px solid #ddd" }}>
          {item.interactionType}
        </td>

        <td style={{ padding: "12px", border: "1px solid #ddd" }}>
          {item.followUpDate}
        </td>

        <td style={{ padding: "12px", border: "1px solid #ddd" }}>
          <button
            onClick={() => setEditingInteraction(item)}
            style={{
              backgroundColor: "#2563EB",
              color: "white",
              border: "none",
              padding: "8px 12px",
              borderRadius: "6px",
              cursor: "pointer",
              marginRight: "8px",
            }}
          >
            Edit
          </button>

          <button
            onClick={() => deleteInteraction(item.id)}
            style={{
              backgroundColor: "#DC2626",
              color: "white",
              border: "none",
              padding: "8px 12px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    ))
  )}
</tbody>
      </table>
    </div>
  );
}

export default History;