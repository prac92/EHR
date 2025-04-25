import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PatientAppointmentSchedulingPage = () => {
  const navigate = useNavigate();

  // State for appointments
  const [appointments, setAppointments] = useState([]);
  const [patientId, setPatientId] = useState("");
  const [formData, setFormData] = useState({
    appointment_date: "",
    notes: "",
  });
  const [editingAppointmentId, setEditingAppointmentId] = useState(null);
  const [error, setError] = useState("");

  // Fetch appointments for a patient
  const fetchAppointments = async () => {
    if (!patientId) {
      setError("Please enter a valid Patient ID.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/appointments/${patientId}`);
      const data = await response.json();

      if (response.ok) {
        setError("");
        setAppointments(data);
      } else {
        setError(data.error || "Failed to fetch appointments.");
      }
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError("Failed to fetch appointments.");
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Schedule a new appointment
  const handleAddAppointment = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ patient_id: patientId, ...formData }),
      });

      if (response.ok) {
        setError("");
        fetchAppointments(); // Refresh the appointment list
        setFormData({ appointment_date: "", notes: "" }); // Reset form
      } else {
        const data = await response.json();
        setError(data.error || "Failed to schedule appointment.");
      }
    } catch (err) {
      console.error("Error scheduling appointment:", err);
      setError("Failed to schedule appointment.");
    }
  };

  // Edit an appointment
  const handleEditAppointment = (appointment) => {
    setEditingAppointmentId(appointment.id);
    setFormData({
      appointment_date: appointment.appointment_date.split("T")[0],
      notes: appointment.notes || "",
    });
  };

  // Update an appointment
  const handleUpdateAppointment = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/appointments/${editingAppointmentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setError("");
        fetchAppointments(); // Refresh the appointment list
        setEditingAppointmentId(null); // Exit edit mode
        setFormData({ appointment_date: "", notes: "" }); // Reset form
      } else {
        const data = await response.json();
        setError(data.error || "Failed to update appointment.");
      }
    } catch (err) {
      console.error("Error updating appointment:", err);
      setError("Failed to update appointment.");
    }
  };

  // Mark an appointment as completed
  const handleMarkComplete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/appointments/${id}/complete`, {
        method: "PUT",
      });

      if (response.ok) {
        setError("");
        fetchAppointments(); // Refresh the appointment list
      } else {
        const data = await response.json();
        setError(data.error || "Failed to mark appointment as completed.");
      }
    } catch (err) {
      console.error("Error marking appointment as completed:", err);
      setError("Failed to mark appointment as completed.");
    }
  };

  // Cancel an appointment
  const handleCancelAppointment = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/appointments/${id}/cancel`, {
        method: "PUT",
      });

      if (response.ok) {
        setError("");
        fetchAppointments(); // Refresh the appointment list
      } else {
        const data = await response.json();
        setError(data.error || "Failed to cancel appointment.");
      }
    } catch (err) {
      console.error("Error canceling appointment:", err);
      setError("Failed to cancel appointment.");
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="container mt-5">
      {/* Navigation Bar */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Appointment Scheduling</h1>
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

      {/* Patient ID Input */}
      <div className="mb-4">
        <label htmlFor="patientId" className="form-label">
          Patient ID
        </label>
        <input
          type="number"
          id="patientId"
          className="form-control"
          placeholder="Enter Patient ID"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={fetchAppointments}>
          Fetch Appointments
        </button>
      </div>

      {/* Appointment Form */}
      <form onSubmit={editingAppointmentId ? handleUpdateAppointment : handleAddAppointment}>
        <div className="mb-3">
          <label htmlFor="appointment_date" className="form-label">
            Appointment Date
          </label>
          <input
            type="date"
            id="appointment_date"
            name="appointment_date"
            className="form-control"
            value={formData.appointment_date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="notes" className="form-label">
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            className="form-control"
            placeholder="Enter notes (optional)"
            value={formData.notes}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          {editingAppointmentId ? "Update Appointment" : "Schedule Appointment"}
        </button>
      </form>

      <hr />

      {/* Appointment List */}
      <h3 className="mt-4">Appointments</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{new Date(appointment.appointment_date).toLocaleDateString()}</td>
              <td>{appointment.status}</td>
              <td>{appointment.notes}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEditAppointment(appointment)}
                  disabled={appointment.status === "completed" || appointment.status === "cancelled"}
                >
                  Edit
                </button>
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => handleMarkComplete(appointment.id)}
                  disabled={appointment.status === "completed"}
                >
                  Mark Complete
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleCancelAppointment(appointment.id)}
                  disabled={appointment.status === "cancelled"}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientAppointmentSchedulingPage;