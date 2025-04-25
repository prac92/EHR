const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");
const medicalHistoryRoutes = require("./routes/medicalHistoryRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");


const app = express();
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
// Patient routes
app.use("/api/patients", patientRoutes);

app.use("/api/medical-history", medicalHistoryRoutes);

app.use("/api/appointments", appointmentRoutes);

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});