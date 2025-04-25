import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigateToPatients = () => {
    navigate("/patients"); // Navigate to the Patient Management page
  };

  const handleNavigateToPatientsHistoryTracking = () => {
    navigate("/medical-history"); // Navigate to the Medical History Tracking page
  };

  const handleNavigateToPatientsSchedulingPage = () => {
    navigate("/appointments"); // Navigate to the Appointment Scheduling page
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="container mt-5">
      {/* Navigation Bar */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Welcome to the EHR System</h1>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <p className="text-center lead">
        Manage all aspects of your healthcare system from one place.
      </p>

      <div className="row mt-4">
        {/* Profile Settings */}
        <div className="col-md-4 mb-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Profile Settings</h5>
              <p className="card-text">
                Update your profile and account settings.
              </p>
              <button className="btn btn-primary">Go to Profile</button>
            </div>
          </div>
        </div>

        {/* Patient Management */}
        <div className="col-md-4 mb-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Patient Management</h5>
              <p className="card-text">
                Add, view, and manage patient records.
              </p>
              <button
                className="btn btn-primary"
                onClick={handleNavigateToPatients}
              >
                Manage Patients
              </button>
            </div>
          </div>
        </div>

        {/* Appointment Scheduling */}
        <div className="col-md-4 mb-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Appointment Scheduling</h5>
              <p className="card-text">
                Schedule, update, and manage appointments.
              </p>
              <button
                className="btn btn-primary"
                onClick={handleNavigateToPatientsSchedulingPage}
              >
                View Appointments
              </button>
            </div>
          </div>
        </div>

        {/* Medical History Tracking */}
        <div className="col-md-4 mb-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Medical History Tracking</h5>
              <p className="card-text">
                Record and view patient medical histories.
              </p>
              <button
                className="btn btn-primary"
                onClick={handleNavigateToPatientsHistoryTracking}
              >
                Track History
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;