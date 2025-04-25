const bcrypt = require("bcrypt");
const { connectToDatabase, sql } = require("../dbConfig");

// Login Controller
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const pool = await connectToDatabase();

    // Query the database for the user
    const result = await pool
      .request()
      .input("email", sql.VarChar, email)
      .query("SELECT * FROM Users WHERE email = @email");

    if (result.recordset.length === 0) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const user = result.recordset[0];

    // Compare the password
    const isPasswordValid = bcrypt.compareSync(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Respond with user details
    res.json({
      message: "Login successful",
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = { login };