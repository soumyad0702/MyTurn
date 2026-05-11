import React, { useEffect, useState } from "react";
import {
  getWaitingTickets,
  getActiveTickets,
  getCompletedTickets,
  completeTicket,
} from "../api/api";

export default function AdminDashboard() {
  const [waiting, setWaiting] = useState([]);
  const [active, setActive] = useState([]);
  const [completed, setCompleted] = useState([]);

  async function load() {
    try {
      setWaiting(await getWaitingTickets());
      setActive(await getActiveTickets());
      setCompleted(await getCompletedTickets());
    } catch (err) {
      console.error(err);
    }
  }

  async function markDone(id) {
    await completeTicket(id);
    load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={container}>
      <h1 style={title}>Admin Dashboard</h1>

      <div style={subtitle}>
        Smart Queue Monitoring System 🚀
      </div>

      {/* ACTIVE */}
      <h2 style={sectionTitle}>🟢 Active Service</h2>
      {active.length === 0 && <p>No active tickets</p>}
      {active.map((t) => (
        <Box key={t.id} color="#00c853">
          <Info t={t} />
          <button style={btn} onClick={() => markDone(t.id)}>
            Complete
          </button>
        </Box>
      ))}

      {/* WAITING */}
      <h2 style={sectionTitle}>🟡 Waiting</h2>
      {waiting.length === 0 && <p>No waiting tickets</p>}
      {waiting.map((t) => (
        <Box key={t.id} color="#ffffff" text="black">
          <Info t={t} />
          <button style={btn} onClick={() => markDone(t.id)}>
            Complete
          </button>
        </Box>
      ))}

      {/* COMPLETED */}
      <h2 style={sectionTitle}>✅ Completed</h2>
      {completed.length === 0 && <p>No completed tickets</p>}
      {completed.map((t) => (
        <Box key={t.id} color="#dddddd" text="black">
          <Info t={t} />
        </Box>
      ))}
    </div>
  );
}

// ================= TOKEN FORMAT =================

function generateToken(t) {
  const orgShort = t.orgName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 3);

  const serviceShort = t.serviceId.substring(0, 3).toUpperCase();

  const num = String(t.tokenNumber).padStart(2, "0");

  return `${orgShort}-${serviceShort}-${num}`;
}

// ================= COMPONENTS =================

function Info({ t }) {
  return (
    <div>
      <b>{t.customerName}</b> — Token {generateToken(t)}
      <br />
      <span style={{ opacity: 0.9 }}>
        <b>{t.orgName}</b> — {t.serviceId.toUpperCase()}
      </span>
    </div>
  );
}

function Box({ children, color, text = "white" }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: color,
        color: text,
        padding: "18px",
        marginTop: "12px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
      }}
    >
      {children}
    </div>
  );
}

// ================= STYLES =================

const container = {
  padding: "40px",
  color: "white",
  minHeight: "100vh",
  width: "100%",
  background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
};

const title = {
  fontSize: "42px",
  marginBottom: "10px",
};

const subtitle = {
  fontSize: "18px",
  opacity: 0.8,
  marginBottom: "20px",
};

const sectionTitle = {
  marginTop: "30px",
};

const btn = {
  background: "black",
  color: "white",
  padding: "10px 16px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};