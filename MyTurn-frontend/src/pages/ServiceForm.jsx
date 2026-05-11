// src/pages/ServiceForm.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import "../App.css";
import { createTicket, getQueueStats } from "../api/api";

const orgNames = {
  hospital: "Hospital",
  bank: "Bank",
  post: "Post Office",
  gov: "Government Office",
  restaurant: "Restaurant",
};

const serviceNames = {
  opd: "OPD Appointment",
  lab: "Lab Test Booking",
  vaccination: "Vaccination",
  loan: "Loan Consultation",
  account: "New Account Opening",
  parcel: "Send Parcel",
  passport: "Passport Application",
  license: "Driving License Renewal",
  aadhaar: "Aadhaar Update",
  table: "Table Booking",
  party: "Party Reservation",
};

export default function ServiceForm() {
  const { id, orgName, serviceId } = useParams();
  const decodedOrgName = decodeURIComponent(orgName);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    guests: "",
    date: "",
    time: "",
  });

  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);

  const isRestaurant = id === "restaurant";

  const today = new Date();
  const minDate = today.toISOString().split("T")[0];
  const currentTime = today.toTimeString().split(":").slice(0, 2).join(":");

  useEffect(() => {
    getQueueStats({
      orgType: id,
      orgName: decodedOrgName,
      serviceId,
    })
      .then(setStats)
      .catch(() => setStats(null));
  }, [id, decodedOrgName, serviceId]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      alert("Please fill in all required details.");
      return;
    }

    if (isRestaurant && (!formData.guests || !formData.date || !formData.time)) {
      alert("Please fill all restaurant booking details.");
      return;
    }

    if (isRestaurant) {
      const selectedDT = new Date(`${formData.date}T${formData.time}`);
      if (selectedDT <= new Date()) {
        alert("⚠️ Please select a future date/time.");
        return;
      }
    }

    try {
      setLoading(true);

      const payload = {
        orgType: id,
        orgName: decodedOrgName,
        serviceId,
        customerName: formData.name,
        phone: formData.phone,
      };

      const response = await createTicket(payload);

      setTicketData({
        name: formData.name,
        phone: formData.phone,
        orgLabel: orgNames[id] || id,
        orgName: decodedOrgName,
        service: serviceNames[serviceId] || serviceId,
        token: response.tokenNumber,
        qrPayload: response.qrPayload,
        waitingAhead: response.waitingAhead,
        totalInQueue: response.totalInQueue,
        ...(isRestaurant && {
          guests: formData.guests,
          bookingDate: formData.date,
          bookingTime: formData.time,
        }),
      });

      const newStats = await getQueueStats({
        orgType: id,
        orgName: decodedOrgName,
        serviceId,
      });
      setStats(newStats);
    } catch (err) {
      console.error(err);
      alert("Error booking ticket. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hq-main" style={{ padding: "40px", textAlign: "center" }}>
      <h1 style={{ color: "white", marginBottom: "8px" }}>{decodedOrgName}</h1>
      <h2 style={{ color: "rgba(255,255,255,0.8)", marginBottom: "16px" }}>
        {orgNames[id] || id}: {serviceNames[serviceId] || serviceId}
      </h2>

      {stats && (
        <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "16px" }}>
          Current waiting: <b>{stats.waitingCount}</b> • ETA:{" "}
          <b>{stats.estimatedTime}</b>
        </p>
      )}

      {!ticketData ? (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            maxWidth: "400px",
            margin: "0 auto",
            background: "rgba(255,255,255,0.05)",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <label style={{ color: "white", textAlign: "left" }}>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              style={inputStyle}
            />
          </label>

          <label style={{ color: "white", textAlign: "left" }}>
            Phone:
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              style={inputStyle}
            />
          </label>

          {isRestaurant && (
            <>
              <label style={{ color: "white", textAlign: "left" }}>
                Number of Guests:
                <input
                  type="number"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  placeholder="Enter number of guests"
                  style={inputStyle}
                />
              </label>

              <label style={{ color: "white", textAlign: "left" }}>
                Date:
                <input
                  type="date"
                  name="date"
                  min={minDate}
                  value={formData.date}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </label>

              <label style={{ color: "white", textAlign: "left" }}>
                Time:
                <input
                  type="time"
                  name="time"
                  min={formData.date === minDate ? currentTime : undefined}
                  value={formData.time}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </label>
            </>
          )}

          <button
            type="submit"
            className="hq-btn hq-btn-primary"
            style={{
              padding: "10px",
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            disabled={loading}
          >
            {loading
              ? "Booking..."
              : isRestaurant
              ? "Book Table"
              : "Book My Spot"}
          </button>
        </form>
      ) : (
        <div
          style={{
            textAlign: "center",
            color: "white",
            background: "rgba(255,255,255,0.05)",
            padding: "20px",
            borderRadius: "12px",
            maxWidth: "400px",
            margin: "0 auto",
          }}
        >
          <h2>Your Ticket</h2>
          <p>
            <strong>{ticketData.name}</strong> — {ticketData.service}
          </p>
          <p>{ticketData.orgName}</p>

          {isRestaurant && (
            <>
              <p>
                Guests: <b>{ticketData.guests}</b>
              </p>
              <p>
                Date: {ticketData.bookingDate} | Time: {ticketData.bookingTime}
              </p>
            </>
          )}

          <p>
            Token: <b>{ticketData.token}</b>
          </p>

          {/* UPDATED BLOCK - ETA */}
          <p>
            People ahead: <b>{ticketData.waitingAhead}</b> • Estimated wait:{" "}
            <b>{stats?.estimatedTime || "Calculating..."}</b>
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <QRCode
              value={ticketData.qrPayload || "MYTURN"}
              size={160}
              bgColor="#ffffff"
              fgColor="#000000"
              style={{ borderRadius: "8px", padding: "4px", background: "#fff" }}
            />
          </div>

          <p style={{ marginTop: "10px", color: "rgba(255,255,255,0.7)" }}>
            Show this QR at the counter
          </p>
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "5px",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.2)",
  background: "rgba(255,255,255,0.08)",
  color: "white",
};
