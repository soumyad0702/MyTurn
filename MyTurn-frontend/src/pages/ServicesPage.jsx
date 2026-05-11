// src/pages/ServicesPage.jsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../App.css";

// Services for each organization type
const services = {
  hospital: [
    { id: "opd", title: "OPD Appointment", subtitle: "Consult a doctor" },
    { id: "lab", title: "Lab Test", subtitle: "Blood tests & diagnostics" },
    { id: "vaccination", title: "Vaccination", subtitle: "General & travel" },
  ],

  bank: [
    { id: "loan", title: "Loan Consultation", subtitle: "Home / Personal / Car" },
    { id: "account", title: "New Account Opening", subtitle: "Savings & Current" },
    { id: "card", title: "Card Services", subtitle: "Credit/Debit card issues" },
  ],

  post: [
    { id: "parcel", title: "Send Parcel", subtitle: "Domestic & International" },
    { id: "stamp", title: "Buy Stamps", subtitle: "Postal stamp counter" },
    { id: "tracking", title: "Track Package", subtitle: "Parcel inquiries" },
  ],

  gov: [
    { id: "passport", title: "Passport Application", subtitle: "New/Renewal" },
    { id: "license", title: "Driving License", subtitle: "Apply / Renew" },
    { id: "aadhaar", title: "Aadhaar Update", subtitle: "Mobile/Address update" },
  ],

  restaurant: [
    { id: "table", title: "Table Booking", subtitle: "Reserve table" },
    { id: "party", title: "Party Reservation", subtitle: "Small gathering booking" },
  ],
};

const orgNames = {
  hospital: "Hospitals",
  bank: "Banks",
  post: "Post Offices",
  gov: "Government Services",
  restaurant: "Restaurants",
};

export default function ServicesPage() {
  const navigate = useNavigate();
  const { id, orgName } = useParams(); // 👈 get both
  const decodedOrgName = orgName ? decodeURIComponent(orgName) : orgNames[id];

  const orgServiceList = services[id] || [];

  return (
    <div className="hq-main" style={{ padding: "40px", textAlign: "center" }}>
      <h1 style={{ color: "white" }}>
        {decodedOrgName || orgNames[id] || "Services"}
      </h1>
      <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "30px" }}>
        Choose a service to continue
      </p>

      <div className="hq-org-grid" style={{ marginTop: "20px" }}>
        {orgServiceList.map((s) => (
          <button
            key={s.id}
            className="hq-org-card"
            onClick={() =>
              navigate(
                `/book/${id}/${encodeURIComponent(
                  decodedOrgName || orgNames[id] || ""
                )}/${s.id}`
              )
            }
          >
            <div className="hq-org-info">
              <h3>{s.title}</h3>
              <p>{s.subtitle}</p>
            </div>
            <div className="hq-org-cta">Select →</div>
          </button>
        ))}
      </div>

      <button
        className="hq-btn hq-btn-ghost"
        style={{ marginTop: "30px" }}
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>
    </div>
  );
}
