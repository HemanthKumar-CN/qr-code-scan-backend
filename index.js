// backend/app.js
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const router = express.Router();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "123" });
});

// const db = mysql.createConnection({
//   host: 'your-database-host',
//   user: 'your-database-user',
//   password: 'your-database-password',
//   database: 'your-database-name',
// });

// db.connect((err) => {
//   if (err) {
//     console.log('MySQL connection failed:', err);
//   } else {
//     console.log('Connected to MySQL');
//   }
// });

// Implement your API endpoints for saving, retrieving, and deleting QR codes here.

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
