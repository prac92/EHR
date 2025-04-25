const express = require("express");
const {
  getMedicalHistoryByPatientId,
  addMedicalHistory,
  updateMedicalHistory,
} = require("../controllers/medicalHistoryController");

const router = express.Router();

// Routes for medical history management
router.get("/:patient_id", getMedicalHistoryByPatientId); // Get medical history for a patient
router.post("/", addMedicalHistory); // Add medical history for a patient
router.put("/:id", updateMedicalHistory); // Update medical history for a patient

module.exports = router;