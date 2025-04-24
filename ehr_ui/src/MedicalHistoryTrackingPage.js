import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";

const MedicalHistoryTrackingPage = () => {
  const navigate = useNavigate();
  // State for medical history
  const [medicalHistory, setMedicalHistory] = useState([
    {
      id: 1,
      illness: "Diabetes",
      surgeries: "Appendectomy",
      medications: "Metformin",
      updatedAt: "2025-04-01",
    },
    {
      id: 2,
      illness: "Hypertension",
      surgeries: "None",
      medications: "Amlodipine",
      updatedAt: "2025-03-15",
    },
  ]);

  // State for modals
  const [showModal, setShowModal] = useState(false);
  const [currentRecord, setCurrentRecord] = useState({
    id: 0,
    illness: "",
    surgeries: "",
    medications: "",
    updatedAt: "",
  });

  // Open modal for adding or editing
  const handleShowModal = (record = { id: 0, illness: "", surgeries: "", medications: "", updatedAt: "" }) => {
    setCurrentRecord(record);
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentRecord({ id: 0, illness: "", surgeries: "", medications: "", updatedAt: "" });
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedRecord = {
      ...currentRecord,
      updatedAt: new Date().toISOString().split("T")[0], // Set current date
    };

    if (currentRecord.id === 0) {
      // Add new record
      setMedicalHistory([...medicalHistory, { ...updatedRecord, id: medicalHistory.length + 1 }]);
    } else {
      // Update existing record
      setMedicalHistory(
        medicalHistory.map((record) =>
          record.id === currentRecord.id ? updatedRecord : record
        )
      );
    }
    handleCloseModal();
  };
   // Navigate back to home page
   const handleBackToHome = () => {
    navigate("/home");};

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Medical History Tracking</h1>
      <button className="btn btn-secondary" onClick={handleBackToHome}>
          Back to Home
        </button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Illness</th>
            <th>Surgeries</th>
            <th>Medications</th>
            <th>Last Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicalHistory.map((record) => (
            <tr key={record.id}>
              <td>{record.illness}</td>
              <td>{record.surgeries}</td>
              <td>{record.medications}</td>
              <td>{record.updatedAt}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => handleShowModal(record)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="btn btn-success"
        onClick={() => handleShowModal()}
      >
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
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Illness</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter illness"
                value={currentRecord.illness}
                onChange={(e) =>
                  setCurrentRecord({ ...currentRecord, illness: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Surgeries</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter surgeries"
                value={currentRecord.surgeries}
                onChange={(e) =>
                  setCurrentRecord({ ...currentRecord, surgeries: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Medications</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter medications"
                value={currentRecord.medications}
                onChange={(e) =>
                  setCurrentRecord({ ...currentRecord, medications: e.target.value })
                }
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