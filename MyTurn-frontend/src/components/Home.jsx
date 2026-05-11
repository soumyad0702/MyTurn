import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import logo from "../assets/myturn-logo.png";

const orgs = [
  { id: "hospital", title: "Hospitals", subtitle: "Nearby hospitals & clinics", emoji: "🏥" },
  { id: "bank", title: "Banks", subtitle: "Loan, accounts & services", emoji: "🏦" },
  { id: "post", title: "Post Offices", subtitle: "Postal & parcel services", emoji: "📮" },
  { id: "gov", title: "Government Services", subtitle: "Licenses, certificates", emoji: "🧾" },
  { id: "restaurant", title: "Restaurants", subtitle: "Table & party bookings", emoji: "🍽️" },
];

export default function Home() {
  const navigate = useNavigate();
  const [city, setCity] = useState("Detecting...");
  const [manual, setManual] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation) {
      setManual(true);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          const place =
            data?.address?.city ||
            data?.address?.town ||
            data?.address?.village ||
            data?.address?.state ||
            "Unknown";
          setCity(place);
        } catch (e) {
          console.error(e);
          setCity("Unknown");
        }
      },
      () => {
        setManual(true);
      }
    );
  }, []);

  const handleManualSelect = (e) => setCity(e.target.value);

  const goToOrg = (id) => navigate(`/org/${id}`);

  return (
    <div className="hq-homepage">
      <header className="hq-hero">
        {/* Header top bar */}
        <div
          style={{
            position: "absolute",
            top: "16px",
            right: "20px",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "14px",
          }}
        >
          <span style={{ opacity: 0.8 }}>📍</span>
          {!manual ? (
            <span>{city}</span>
          ) : (
            <select
              value={city}
              onChange={handleManualSelect}
              style={{
                background: "rgba(255,255,255,0.08)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "8px",
                padding: "6px 10px",
              }}
            >
              <option value="">Select City</option>
              {[
                "Ahmedabad", "Bengaluru", "Bhopal", "Bhubaneswar", "Chandigarh",
                "Chennai", "Coimbatore", "Delhi", "Goa", "Guwahati", "Hyderabad",
                "Indore", "Jaipur", "Kochi", "Kolkata", "Lucknow", "Madurai",
                "Mangalore", "Mumbai", "Mysuru", "Nagpur", "Patna", "Pune",
                "Ranchi", "Surat", "Thiruvananthapuram", "Varanasi", "Vijayawada",
                "Visakhapatnam"
              ].map((cityName) => (
                <option key={cityName} value={cityName}>
                  {cityName}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Left side: title + buttons */}
        <div className="hq-hero-content">
          <h1 className="hq-title">MyTurn</h1>
          <p className="hq-subtitle">Know your turn. Skip the wait.</p>
          <div className="hq-cta">
            <button
              className="hq-btn hq-btn-primary"
              onClick={() => {
                const el = document.getElementById("org-grid");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Book My Spot
            </button>
            <button
              className="hq-btn hq-btn-ghost"
              onClick={() =>
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: "smooth",
                })
              }
            >
              How it works
            </button>
          </div>
        </div>

        {/* Right side: logo */}
        <div className="hq-logo-container">
          <img src={logo} alt="MyTurn Logo" className="hq-logo-img" />
        </div>
      </header>

      <main className="hq-main">
        <section id="org-grid" className="hq-org-grid">
          {orgs.map((o) => (
            <button
              key={o.id}
              className="hq-org-card"
              onClick={() => goToOrg(o.id)}
              aria-label={`Choose ${o.title}`}
            >
              <div className="hq-org-emoji">{o.emoji}</div>
              <div className="hq-org-info">
                <h3>{o.title}</h3>
                <p>{o.subtitle}</p>
              </div>
              <div className="hq-org-cta">Select →</div>
            </button>
          ))}
        </section>

        <section className="hq-how" aria-label="How QuickQueue works">
          <h2>How MyTurn Works</h2>
          <ol>
            <li>Select organization & service</li>
            <li>See current queue & estimated wait</li>
            <li>Enter your details and "Book My Spot"</li>
          </ol>
        </section>
      </main>

      <footer className="hq-footer">
        <div>© {new Date().getFullYear()} MyTurn. Smart Queue Management</div>
      </footer>
    </div>
  );
}
