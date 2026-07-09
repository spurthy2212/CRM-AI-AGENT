import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import LogInteraction from "./pages/LogInteraction";

function App() {
  return (
    <BrowserRouter>
      <nav
        style={{
          background: "#1E3A8A",
          padding: "15px 30px",
          display: "flex",
          gap: "20px",
        }}
      >
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Dashboard
        </Link>

        <Link
          to="/log"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Log Interaction
        </Link>

        <Link
          to="/history"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          History
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/log" element={<LogInteraction />} />
        <Route path="/history" element={<History />} />
      </Routes>
      <footer
  style={{
    marginTop: "40px",
    padding: "20px",
    textAlign: "center",
    background: "#1E3A8A",
    color: "white",
  }}
>
  AI-First CRM HCP Module © 2026 | Developed by Ravuri Lakshmi Spurthy
</footer>

    </BrowserRouter>
  );
}

export default App;