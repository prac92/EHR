import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PatientManagementPage = () => {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({ name: "", age: "", contact_details: "" });
  const [editingPatientId, setEditingPatientId] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch all patients on component load
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/patients");
      const data = await response.json();
      setPatients(data);
    } catch (err) {
      console.error("Error fetching patients:", err);
      setError("Failed to fetch patients.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddPatient = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setError("");
        fetchPatients(); // Refresh the patient list
        setFormData({ name: "", age: "", contact_details: "" }); // Reset form
      } else {
        const data = await response.json();
        setError(data.error || "Failed to add patient.");
      }
    } catch (err) {
      console.error("Error adding patient:", err);
      setError("Failed to add patient.");
    }
  };

  const handleEditPatient = (patient) => {
    setEditingPatientId(patient.id);
    setFormData({ name: patient.name, age: patient.age, contact_details: patient.contact_details });
  };

  const handleUpdatePatient = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/patients/${editingPatientId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setError("");
        fetchPatients(); // Refresh the patient list
        setEditingPatientId(null); // Exit edit mode
        setFormData({ name: "", age: "", contact_details: "" }); // Reset form
      } else {
        const data = await response.json();
        setError(data.error || "Failed to update patient.");
      }
    } catch (err) {
      console.error("Error updating patient:", err);
      setError("Failed to update patient.");
    }
  };

  const handleDeletePatient = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/patients/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setError("");
        fetchPatients(); // Refresh the patient list
      } else {
        const data = await response.json();
        setError(data.error || "Failed to delete patient.");
      }
    } catch (err) {
      console.error("Error deleting patient:", err);
      setError("Failed to delete patient.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="container mt-5">
      {/* Navigation Bar */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Patient Management</h2>
        <div>
          <button className="btn btn-primary me-2" onClick={() => navigate("/home")}>
            Home
          </button>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={editingPatientId ? handleUpdatePatient : handleAddPatient}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            placeholder="Enter patient name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            className="form-control"
            placeholder="Enter patient age"
            value={formData.age}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contact_details" className="form-label">
            Contact Details
          </label>
          <input
            type="text"
            id="contact_details"
            name="contact_details"
            className="form-control"
            placeholder="Enter contact details"
            value={formData.contact_details}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          {editingPatientId ? "Update Patient" : "Add Patient"}
        </button>
      </form>

      <hr />

      <h3 className="mt-4">Patient List</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Contact Details</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.name}</td>
              <td>{patient.age}</td>
              <td>{patient.contact_details}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEditPatient(patient)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeletePatient(patient.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientManagementPage;