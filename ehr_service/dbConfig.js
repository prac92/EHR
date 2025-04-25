const sql = require("mssql");

const dbConfig = {
    server: "localhost",
    database: "ehr_db",
    options: {
      encrypt: true,
      trustServerCertificate: true,
    },
    authentication: {
      type: "ntlm", // Use NTLM for Windows Authentication
      options: {
        domain: "PMMR", // Replace with your domain
        userName: "psharma1",
        password: "Limestone21011992/", // Optional if using Integrated Security
      },
    },
  };

const connectToDatabase = async () => {
  try {
    const pool = await sql.connect(dbConfig);
    console.log("Connected to SQL Server");
    return pool;
  } catch (err) {
    console.error("Database connection failed:", err);
    throw err;
  }
};

module.exports = { connectToDatabase, sql };