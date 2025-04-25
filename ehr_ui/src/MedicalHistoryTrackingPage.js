import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";

const MedicalHistoryTrackingPage = () => {
  const navigate = useNavigate();

  // State for medical history
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [patientId, setPatientId] = useState("");
  const [currentRecord, setCurrentRecord] = useState({
    id: 0,
    illness: "",
    surgeries: "",
    medications: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  // Fetch medical history for a patient
  const fetchMedicalHistory = async () => {
    if (!patientId) {
      setError("Please enter a valid Patient ID.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/medical-history/${patientId}`);
      const data = await response.json();

      if (response.ok) {
        setError("");
        setMedicalHistory(data);
      } else {
        setError(data.error || "Failed to fetch medical history.");
      }
    } catch (err) {
      console.error("Error fetching medical history:", err);
      setError("Failed to fetch medical history.");
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentRecord({ ...currentRecord, [name]: value });
  };

  // Add new medical history
  const handleAddMedicalHistory = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/medical-history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ patient_id: patientId, ...currentRecord }),
      });

      if (response.ok) {
        setError("");
        fetchMedicalHistory(); // Refresh the medical history list
        handleCloseModal(); // Close the modal
      } else {
        const data = await response.json();
        setError(data.error || "Failed to add medical history.");
      }
    } catch (err) {
      console.error("Error adding medical history:", err);
      setError("Failed to add medical history.");
    }
  };

  // Update medical history
  const handleUpdateMedicalHistory = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/medical-history/${currentRecord.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentRecord),
      });

      if (response.ok) {
        setError("");
        fetchMedicalHistory(); // Refresh the medical history list
        handleCloseModal(); // Close the modal
      } else {
        const data = await response.json();
        setError(data.error || "Failed to update medical history.");
      }
    } catch (err) {
      console.error("Error updating medical history:", err);
      setError("Failed to update medical history.");
    }
  };

  // Open modal for adding or editing
  const handleShowModal = (record = { id: 0, illness: "", surgeries: "", medications: "" }) => {
    setCurrentRecord(record);
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentRecord({ id: 0, illness: "", surgeries: "", medications: "" });
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
        <h1>Medical History Tracking</h1>
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
        <button className="btn btn-primary mt-2" onClick={fetchMedicalHistory}>
          Fetch Medical History
        </button>
      </div>

      {/* Medical History Table */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Illness</th>
            <th>Surgeries</th>
            <th>Medications</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicalHistory.map((record) => (
            <tr key={record.id}>
              <td>{record.illness}</td>
              <td>{record.surgeries}</td>
              <td>{record.medications}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleShowModal(record)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-success" onClick={() => handleShowModal()}>
        Add Entry
      </button>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentRecord.id === 0 ? "Add Medical History" : "Edit Medical History"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={currentRecord.id === 0 ? handleAddMedicalHistory : handleUpdateMedicalHistory}>
            <Form.Group className="mb-3">
              <Form.Label>Illness</Form.Label>
              <Form.Control
                type="text"
                name="illness"
                placeholder="Enter illness"
                value={currentRecord.illness}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Surgeries</Form.Label>
              <Form.Control
                type="text"
                name="surgeries"
                placeholder="Enter surgeries"
                value={currentRecord.surgeries}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Medications</Form.Label>
              <Form.Control
                type="text"
                name="medications"
                placeholder="Enter medications"
                value={currentRecord.medications}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={handleCloseModal} className="me-2">
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                {currentRecord.id === 0 ? "Add" : "Update"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MedicalHistoryTrackingPage;