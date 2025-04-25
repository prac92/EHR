const { connectToDatabase, sql } = require("../dbConfig");

// Get All Patients
const getAllPatients = async (req, res) => {
  try {
    const pool = await connectToDatabase();
    const result = await pool.request().query("SELECT * FROM Patients");
    res.json(result.recordset);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Get a Single Patient by ID
const getPatientById = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await connectToDatabase();
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT * FROM Patients WHERE id = @id");

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "Patient not found." });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Add a New Patient
const addPatient = async (req, res) => {
  const { name, age, contact_details } = req.body;

  if (!name || !age || !contact_details) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const pool = await connectToDatabase();
    const result = await pool
      .request()
      .input("name", sql.VarChar, name)
      .input("age", sql.Int, age)
      .input("contact_details", sql.VarChar, contact_details)
      .query(
        "INSERT INTO Patients (name, age, contact_details) OUTPUT INSERTED.* VALUES (@name, @age, @contact_details)"
      );

    res.status(201).json(result.recordset[0]);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Update a Patient
const updatePatient = async (req, res) => {
  const { id } = req.params;
  const { name, age, contact_details } = req.body;

  try {
    const pool = await connectToDatabase();
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .input("name", sql.VarChar, name)
      .input("age", sql.Int, age)
      .input("contact_details", sql.VarChar, contact_details)
      .query(
        "UPDATE Patients SET name = @name, age = @age, contact_details = @contact_details WHERE id = @id"
      );

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: "Patient not found." });
    }

    res.json({ message: "Patient updated successfully." });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Delete a Patient
const deletePatient = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await connectToDatabase();
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM Patients WHERE id = @id");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: "Patient not found." });
    }

    res.json({ message: "Patient deleted successfully." });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  getAllPatients,
  getPatientById,
  addPatient,
  updatePatient,
  deletePatient,
};