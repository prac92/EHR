const express = require("express");
const {
  getAllPatients,
  getPatientById,
  addPatient,
  updatePatient,
  deletePatient,
} = require("../controllers/patientController");

const router = express.Router();

// Routes for patient management
router.get("/", getAllPatients); // Get all patients
router.get("/:id", getPatientById); // Get a single patient by ID
router.post("/", addPatient); // Add a new patient
router.put("/:id", updatePatient); // Update a patient
router.delete("/:id", deletePatient); // Delete a patient

module.exports = router;