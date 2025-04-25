const { connectToDatabase, sql } = require("../dbConfig");

// Get All Appointments for a Patient
const getAppointmentsByPatientId = async (req, res) => {
  const { patient_id } = req.params;

  try {
    const pool = await connectToDatabase();
    const result = await pool
      .request()
      .input("patient_id", sql.Int, patient_id)
      .query("SELECT * FROM Appointments WHERE patient_id = @patient_id");

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "No appointments found for this patient." });
    }

    res.json(result.recordset);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Schedule a New Appointment
const scheduleAppointment = async (req, res) => {
  const { patient_id, appointment_date, notes } = req.body;

  if (!patient_id || !appointment_date) {
    return res.status(400).json({ error: "Patient ID and appointment date are required." });
  }

  try {
    const pool = await connectToDatabase();
    const result = await pool
      .request()
      .input("patient_id", sql.Int, patient_id)
      .input("appointment_date", sql.DateTime, appointment_date)
      .input("status", sql.VarChar, "scheduled") // Explicitly set status to 'scheduled'
      .input("notes", sql.VarChar, notes || null)
      .query(
        "INSERT INTO Appointments (patient_id, appointment_date, status, notes) OUTPUT INSERTED.* VALUES (@patient_id, @appointment_date, @status, @notes)"
      );

    res.status(201).json(result.recordset[0]);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Update an Appointment
const updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { appointment_date, status, notes } = req.body;

  try {
    const pool = await connectToDatabase();
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .input("appointment_date", sql.DateTime, appointment_date || null)
      .input("status", sql.VarChar, status || "scheduled") // Default to 'scheduled' if status is not provided
      .input("notes", sql.VarChar, notes || null)
      .query(
        "UPDATE Appointments SET appointment_date = @appointment_date, status = @status, notes = @notes WHERE id = @id"
      );

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: "Appointment not found." });
    }

    res.json({ message: "Appointment updated successfully." });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Cancel an Appointment
const cancelAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await connectToDatabase();
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("UPDATE Appointments SET status = 'cancelled' WHERE id = @id");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: "Appointment not found." });
    }

    res.json({ message: "Appointment cancelled successfully." });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};
// Mark an Appointment as Completed
const markAppointmentComplete = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await connectToDatabase();
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("UPDATE Appointments SET status = 'completed' WHERE id = @id");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: "Appointment not found." });
    }

    res.json({ message: "Appointment marked as completed successfully." });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  getAppointmentsByPatientId,
  scheduleAppointment,
  updateAppointment,
  cancelAppointment,
  markAppointmentComplete
};