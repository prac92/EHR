import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";

const PatientManagementPage = () => {
  const navigate = useNavigate();

  // State for patients
  const [patients, setPatients] = useState([
    { id: 1, name: "John Doe", age: 45, contact: "123-456-7890" },
    { id: 2, name: "Jane Smith", age: 30, contact: "987-654-3210" },
  ]);

  // State for modals
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [currentPatient, setCurrentPatient] = useState({
    id: 0,
    name: "",
    age: "",
    contact: "",
  });

  // Open modal for adding or editing
  const handleShowModal = (type, patient = { id: 0, name: "", age: "", contact: "" }) => {
    setModalType(type);
    setCurrentPatient(patient);
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentPatient({ id: 0, name: "", age: "", contact: "" });
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (modalType === "add") {
      setPatients([...patients, { ...currentPatient, id: patients.length + 1 }]);
    } else {
      setPatients(
        patients.map((patient) =>
          patient.id === currentPatient.id ? currentPatient : patient
        )
      );
    }
    handleCloseModal();
  };

  // Handle delete
  const handleDelete = (id) => {
    setPatients(patients.filter((patient) => patient.id !== id));
  };


  // Navigate back to home page
  const handleBackToHome = () => {
    navigate("/home");
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Patient Management</h1>
        
        <button className="btn btn-secondary" onClick={handleBackToHome}>
          Back to Home
        </button>
      </div>
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
              <td>{patient.contact}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => handleShowModal("edit", patient)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(patient.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="btn btn-success"
        onClick={() => handleShowModal("add")}
      >
        Add Patient
      </button>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === "add" ? "Add New Patient" : "Edit Patient"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={currentPatient.name}
                onChange={(e) =>
                  setCurrentPatient({ ...currentPatient, name: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter age"
                value={currentPatient.age}
                onChange={(e) =>
                  setCurrentPatient({ ...currentPatient, age: parseInt(e.target.value, 10) || "" })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact Details</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter contact details"
                value={currentPatient.contact}
                onChange={(e) =>
                  setCurrentPatient({
                    ...currentPatient,
                    contact: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={handleCloseModal} className="me-2">
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                {modalType === "add" ? "Add" : "Update"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PatientManagementPage;