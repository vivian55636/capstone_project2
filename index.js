require("dotenv").config();

const express = require("express");
const { Pool } = require("pg"); // Correctly import Pool from pg
const app = express();

app.use(express.json()); // Parse JSON bodies

const { PGHOST, PGUSER, PGDATABASE, PGPASSWORD, PGPORT } = process.env;
const pool = new Pool({ // Correctly initialize Pool
  user: PGUSER,
  host: PGHOST,
  database: PGDATABASE,
  password: PGPASSWORD,
  port: PGPORT,
});

app.get("/", async (req, res) => {
  const client = await pool.connect();

  try {
    const result = await client.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (errors) {
    console.error(errors);
    res.status(500).json({ error: "Internal Server Error" }); // Proper error response
  } finally {
    client.release();
  }
});

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" }); // Handle 404 errors
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});