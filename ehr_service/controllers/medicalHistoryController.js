const { connectToDatabase, sql } = require("../dbConfig");

// Get Medical History for a Patient
const getMedicalHistoryByPatientId = async (req, res) => {
  const { patient_id } = req.params;

  try {
    const pool = await connectToDatabase();
    const result = await pool
      .request()
      .input("patient_id", sql.Int, patient_id)
      .query("SELECT * FROM MedicalHistory WHERE patient_id = @patient_id");

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "No medical history found for this patient." });
    }

    res.json(result.recordset);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Add Medical History for a Patient
const addMedicalHistory = async (req, res) => {
  const { patient_id, illness, surgeries, medications } = req.body;

  if (!patient_id) {
    return res.status(400).json({ error: "Patient ID is required." });
  }

  try {
    const pool = await connectToDatabase();
    const result = await pool
      .request()
      .input("patient_id", sql.Int, patient_id)
      .input("illness", sql.VarChar, illness || null)
      .input("surgeries", sql.VarChar, surgeries || null)
      .input("medications", sql.VarChar, medications || null)
      .query(
        "INSERT INTO MedicalHistory (patient_id, illness, surgeries, medications) OUTPUT INSERTED.* VALUES (@patient_id, @illness, @surgeries, @medications)"
      );

    res.status(201).json(result.recordset[0]);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Update Medical History for a Patient
const updateMedicalHistory = async (req, res) => {
  const { id } = req.params;
  const { illness, surgeries, medications } = req.body;

  try {
    const pool = await connectToDatabase();
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .input("illness", sql.VarChar, illness || null)
      .input("surgeries", sql.VarChar, surgeries || null)
      .input("medications", sql.VarChar, medications || null)
      .query(
        "UPDATE MedicalHistory SET illness = @illness, surgeries = @surgeries, medications = @medications, updated_at = GETDATE() WHERE id = @id"
      );

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: "Medical history record not found." });
    }

    res.json({ message: "Medical history updated successfully." });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  getMedicalHistoryByPatientId,
  addMedicalHistory,
  updateMedicalHistory,
};