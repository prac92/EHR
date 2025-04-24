import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigateToPatients = () => {
    navigate("/patients"); // Navigate to the Patient Management page
  };

  const handleNavigateToPatientsHistoryTracking = () => {
    navigate("/medical-history"); // Navigate to the Patient Management page
  };

  const handleNavigateToPatientsAchedulingPage = () => {
    navigate("/appointments"); // Navigate to the Patient Management page
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Welcome to the EHR System</h1>
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
              <button className="btn btn-primary" onClick={handleNavigateToPatients}>Manage Patients</button>
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
              <button className="btn btn-primary" onClick={handleNavigateToPatientsAchedulingPage}>View Appointments</button>
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
              <button className="btn btn-primary" onClick={handleNavigateToPatientsHistoryTracking}>Track History</button>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default HomePage;