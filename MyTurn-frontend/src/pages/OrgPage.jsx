// src/pages/OrgPage.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../App.css";

const orgData = {
  hospital: [
    { name: "Apollo Hospitals", address: "Jubilee Hills, Hyderabad" },
    { name: "Yashoda Hospital", address: "Somajiguda, Hyderabad" },
    { name: "Care Hospitals", address: "Banjara Hills, Hyderabad" },
    { name: "AIG Hospitals", address: "Gachibowli, Hyderabad" },
    { name: "KIMS Hospital", address: "Secunderabad, Hyderabad" },
  ],
  bank: [
    { name: "State Bank of India", address: "Abids Road, Hyderabad" },
    { name: "HDFC Bank", address: "Banjara Hills Road No. 12, Hyderabad" },
    { name: "ICICI Bank", address: "Madhapur, Hyderabad" },
    { name: "Axis Bank", address: "Ameerpet, Hyderabad" },
    { name: "Canara Bank", address: "Koti Main Road, Hyderabad" },
  ],
  post: [
    { name: "Hyderabad GPO", address: "Abids, Hyderabad" },
    { name: "Banjara Hills Post Office", address: "Road No. 3, Hyderabad" },
    { name: "Madhapur Post Office", address: "Hitech City Road, Hyderabad" },
    { name: "Secunderabad Head Post Office", address: "Sardar Patel Road" },
    { name: "Kukatpally Post Office", address: "KPHB Colony, Hyderabad" },
  ],
  gov: [
    { name: "MeeSeva Center", address: "Koti, Hyderabad" },
    { name: "RTA Office", address: "Khairatabad, Hyderabad" },
    { name: "GHMC Office", address: "Tank Bund, Hyderabad" },
    { name: "Passport Seva Kendra", address: "Ameerpet, Hyderabad" },
    { name: "Income Tax Office", address: "Basheerbagh, Hyderabad" },
  ],
  restaurant: [
    { name: "Paradise Biryani", address: "Secunderabad, Hyderabad" },
    { name: "Chutneys", address: "Banjara Hills, Hyderabad" },
    { name: "Barbeque Nation", address: "Gachibowli, Hyderabad" },
    { name: "Rayalaseema Ruchulu", address: "Ameerpet, Hyderabad" },
    { name: "Bawarchi", address: "RTC Cross Roads, Hyderabad" },
  ],
};

const orgTitles = {
  hospital: "Hospitals",
  bank: "Banks",
  post: "Post Offices",
  gov: "Government Offices",
  restaurant: "Restaurants",
};

export default function OrgPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const orgList = orgData[id] || [];

  return (
    <div className="hq-main">
      <h1 style={{ color: "white", textAlign: "center" }}>
        {orgTitles[id] || "Organizations"} in Hyderabad
      </h1>

      <div className="hq-org-grid" style={{ marginTop: "24px" }}>
        {orgList.map((org, index) => (
          <div
            key={index}
            className="hq-org-card"
            onClick={() =>
              navigate(`/org/${id}/service/${encodeURIComponent(org.name)}`)
            }
            style={{ cursor: "pointer" }}
          >
            <div className="hq-org-info">
              <h3>{org.name}</h3>
              <p>{org.address}</p>
            </div>
            <div className="hq-org-cta">View Services →</div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <button
          className="hq-btn hq-btn-ghost"
          onClick={() => navigate("/")}
          style={{ padding: "10px 18px" }}
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}
