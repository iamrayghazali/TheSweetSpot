import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

export const initDB = async () => {
  try {
    const db = await mysql.createConnection({
      host: process.env.SQL_HOST,
      user: process.env.SQL_USER,
      password: process.env.SQL_PASSWORD,
      database: process.env.SQL_DATABASE,
    });
    console.log("Connected to MySQL");
    return db;
  } catch (err) {
    console.error("Database connection failed:", err);
    throw err;
  }
};