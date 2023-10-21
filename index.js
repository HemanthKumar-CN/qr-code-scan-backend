const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
var cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
app.use(cors());
require("dotenv").config();
const port = process.env.PORT || 3000;

// Create a Sequelize instance
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DB_USERNAME,
  process.env.PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    dialectModule: require("mysql2"),
  },
);

console.log(process.env.DB_USERNAME);

// Define a model for your QR code data
const QRCode = sequelize.define("qr_codes", {
  content: {
    type: DataTypes.STRING,
  },
  thumbnail: {
    type: DataTypes.STRING,
  },
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
  },
  // Add other fields if needed, such as scan_date
});

app.use(bodyParser.json());

// Configure storage for uploaded thumbnail images
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Define an endpoint to save scanned QR codes

app.get("/", (req, res) => {
  res.status(200).json({ message: "Homepage" });
});

app.post("/qrcodes", async (req, res) => {
  console.log(req, "----request body");
  try {
    const content = req.body.content;
    const thumbnail = req.body.thumbnail;

    // Create a new QRCode entry in the database
    const qrCode = await QRCode.create({
      content: content,
      thumbnail: thumbnail,
    });

    console.log(qrCode, "---qrCode uploaded");

    res.status(201).json({ message: "QR code saved successfully" });
  } catch (error) {
    console.error("Error saving QR code:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Define an endpoint to retrieve a list of scanned QR codes
app.get("/qrcodes", async (req, res) => {
  try {
    // Retrieve all QRCode entries from the database
    const qrCodes = await QRCode.findAll();
    console.log(qrCodes, "----------------");
    res.status(200).json(qrCodes);
  } catch (error) {
    console.error("Error retrieving QR codes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/qrcodes/:id", async (req, res) => {
  const qrCodeId = req.params.id;
  console.log(qrCodeId, typeof qrCodeId, "))))))))))))))))))");
  try {
    const qrCodeDelete = await QRCode.destroy({
      where: {
        id: qrCodeId,
      },
    });
    console.log(qrCodeDelete, "delete request");

    res.status(200).json({ message: "Database deleted successfully" });
  } catch (error) {
    console.error("Error deleting the database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Sync the database and start the server
sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

// const db = mysql.createConnection({
//   host: "sql12.freesqldatabase.com",
//   user: "sql12654553",
//   password: "rwy2We2izy",
//   database: "sql12654553",
// });
