//create patient appointment scheduling component that can Schedule, view, update, and cancel patient appointments.Track appointment status (e.g., scheduled, completed, cancelled)


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";

const PatientAppointmentSchedulingPage = () => {
    const navigate = useNavigate();
  // State for appointments
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: "John Doe",
      date: "2025-04-25",
      time: "10:00 AM",
      status: "Scheduled",
    },
    {
      id: 2,
      patientName: "Jane Smith",
      date: "2025-04-26",
      time: "02:00 PM",
      status: "Completed",
    },
  ]);

  // State for modals
  const [showModal, setShowModal] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState({
    id: 0,
    patientName: "",
    date: "",
    time: "",
    status: "Scheduled",
  });

  // Open modal for adding or editing
  const handleShowModal = (appointment = { id: 0, patientName: "", date: "", time: "", status: "Scheduled" }) => {
    setCurrentAppointment(appointment);
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentAppointment({ id: 0, patientName: "", date: "", time: "", status: "Scheduled" });
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (currentAppointment.id === 0) {
      // Add new appointment
      setAppointments([
        ...appointments,
        { ...currentAppointment, id: appointments.length + 1 },
      ]);
    } else {
      // Update existing appointment
      setAppointments(
        appointments.map((appointment) =>
          appointment.id === currentAppointment.id
            ? currentAppointment
            : appointment
        )
      );
    }
    handleCloseModal();
  };

  // Handle delete
  const handleDelete = (id) => {
    setAppointments(appointments.filter((appointment) => appointment.id !== id));
  };
  
   // Navigate back to home page
   const handleBackToHome = () => {
    navigate("/home");
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Patient Appointment Scheduling</h1>
      <button className="btn btn-secondary" onClick={handleBackToHome}>
          Back to Home
        </button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.patientName}</td>
              <td>{appointment.date}</td>
              <td>{appointment.time}</td>
              <td>{appointment.status}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => handleShowModal(appointment)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(appointment.id)}
                >
                  Cancel
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
        Schedule Appointment
      </button>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentAppointment.id === 0
              ? "Schedule Appointment"
              : "Edit Appointment"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Patient Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter patient name"
                value={currentAppointment.patientName}
                onChange={(e) =>
                  setCurrentAppointment({
                    ...currentAppointment,
                    patientName: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={currentAppointment.date}
                onChange={(e) =>
                  setCurrentAppointment({
                    ...currentAppointment,
                    date: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                value={currentAppointment.time}
                onChange={(e) =>
                  setCurrentAppointment({
                    ...currentAppointment,
                    time: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={currentAppointment.status}
                onChange={(e) =>
                  setCurrentAppointment({
                    ...currentAppointment,
                    status: e.target.value,
                  })
                }
              >
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </Form.Select>
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                onClick={handleCloseModal}
                className="me-2"
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                {currentAppointment.id === 0 ? "Schedule" : "Update"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PatientAppointmentSchedulingPage;