const { connectToDatabase } = require("./dbConfig");

const testConnection = async () => {
  try {
    const pool = await connectToDatabase();
    console.log("Database connection successful");
    pool.close(); // Close the connection after testing
  } catch (err) {
    console.error("Database connection failed:", err);
  }
};

testConnection();