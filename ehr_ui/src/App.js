// filepath: c:\Users\psharma1\Desktop\EHR\ehr_ui\src\App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import RegisterPage from "./RegisterPage";
import PatientManagementPage from "./PatientManagementPage";
import MedicalHistoryTrackingPage from "./MedicalHistoryTrackingPage";
import PatientAppointmentSchedulingPage from "./PatientAppointmentSchedulingPage";
import ProfileSettingsPage from "./ProfileSettingsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/patients" element={<PatientManagementPage />} />
        <Route path="/medical-history" element={<MedicalHistoryTrackingPage />} />
        <Route path="/appointments" element={<PatientAppointmentSchedulingPage />} />
        <Route path="/profile" element={<ProfileSettingsPage />} />
      </Routes>
    </Router>
  );
}

export default App;