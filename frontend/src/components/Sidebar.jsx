import { Link } from "react-router-dom";
import {
  FaHome,
  FaClipboardList,
  FaHistory,
  FaChartBar,
} from "react-icons/fa";

function Sidebar() {
  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        backgroundColor: "#1E3A8A",
        color: "white",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ marginBottom: "30px" }}>AI CRM</h2>

      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ marginBottom: "20px" }}>
            <Link
              to="/"
              style={{ color: "white", textDecoration: "none" }}
            >
              <FaHome /> Dashboard
            </Link>
          </li>

          <li style={{ marginBottom: "20px" }}>
            <Link
              to="/log"
              style={{ color: "white", textDecoration: "none" }}
            >
              <FaClipboardList /> Log Interaction
            </Link>
          </li>

          <li style={{ marginBottom: "20px" }}>
            <Link
              to="/history"
              style={{ color: "white", textDecoration: "none" }}
            >
              <FaHistory /> History
            </Link>
          </li>

          <li>
            <Link
              to="/analytics"
              style={{ color: "white", textDecoration: "none" }}
            >
              <FaChartBar /> Analytics
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;