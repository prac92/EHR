const express = require("express");
const {
  getAppointmentsByPatientId,
  scheduleAppointment,
  updateAppointment,
  cancelAppointment,
  markAppointmentComplete,
} = require("../controllers/appointmentController");

const router = express.Router();

// Routes for appointment management
router.get("/:patient_id", getAppointmentsByPatientId); // Get all appointments for a patient
router.post("/", scheduleAppointment); // Schedule a new appointment
router.put("/:id", updateAppointment); // Update an appointment
router.put("/:id/cancel", cancelAppointment); // Cancel an appointment
router.put("/:id/complete", markAppointmentComplete); // Mark an appointment as completed

module.exports = router;