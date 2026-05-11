// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import OrgPage from "./pages/OrgPage";
import ServicesPage from "./pages/ServicesPage";
import ServiceForm from "./pages/ServiceForm";
import AdminDashboard from "./pages/AdminDashboard";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="hq-app-root">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/org/:id" element={<OrgPage />} />
          <Route path="/org/:id/service/:orgName" element={<ServicesPage />} />
          <Route path="/book/:id/:orgName/:serviceId" element={<ServiceForm />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
