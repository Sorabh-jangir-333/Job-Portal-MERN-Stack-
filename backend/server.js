const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies

// CORS Configuration (Allows frontend to send & receive cookies)
app.use(
  cors({
    origin: "http://localhost:3000", // Change this if frontend is hosted elsewhere
    credentials: true, // Allows cookies to be sent with requests
  })
);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Connection Error:", err));

// Routes
app.use("/api/auth", require("./routes/auth")); // Auth routes
app.use("/api/jobs", require("./routes/job")); // Job routes

// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Profile Route Example (Protected route)
app.get("/api/users/profile", (req, res) => {
  res.json({ message: "Profile data" });
});
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.use("/api/apply", require("./routes/apply"));

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
