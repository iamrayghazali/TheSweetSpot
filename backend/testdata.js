import bcrypt from "bcrypt";
import mysql from "mysql2";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Create MySQL connection
const db = mysql.createConnection({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
});

// Function to create test user with hashed password
const createTestUser = async () => {
  const username = "admin"; // Test username
  const password = "admin"; // Test password (will be hashed)
  const role = "admin"; // User role

  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // SQL query to insert the test user into the database
    const query = "INSERT INTO admin (username, password_hash, role) VALUES (?, ?, ?)";

    // Insert data into the database
    db.query(query, [username, hashedPassword, role], (err, results) => {
      if (err) {
        console.error("Error inserting user:", err);
        return;
      }
      console.log("User created successfully:", results);
    });
  } catch (error) {
    console.error("Error hashing the password:", error);
  }
};

// Run the createTestUser function
createTestUser();