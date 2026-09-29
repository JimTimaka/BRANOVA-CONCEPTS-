const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.FRONTEND_URL || true
}));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    business: "Branova Concepts Uganda Ltd",
    message: "Branova API is running"
  });
});

app.get("/api/services", (req, res) => {
  res.json([
    { name: "Sourcing", description: "Product and supply sourcing for businesses and organisations." },
    { name: "Branding", description: "Branding, printing and promotional production." },
    { name: "Supply", description: "Branded and non-branded corporate and general supplies." }
  ]);
});

app.post("/api/enquiries", (req, res) => {
  const { name, phone, email, message } = req.body || {};

  if (!name || !message) {
    return res.status(400).json({ ok: false, message: "Name and message are required." });
  }

  // Database/email integration will be connected here.
  return res.status(201).json({
    ok: true,
    message: "Enquiry received.",
    enquiry: { name, phone: phone || "", email: email || "", message }
  });
});

app.listen(PORT, () => {
  console.log(`Branova backend running on port ${PORT}`);
});
