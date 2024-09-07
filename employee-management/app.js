const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const employeeRoutes = require("./routes/employee");

dotenv.config();
// Middlewares
app.use(express.json());
// Configure CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Allow only this origin
    credentials: true, // Allow cookies and other credentials to be included
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
mongoose
  .connect("mongodb://127.0.0.1:27017/employment")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .then(() => {
    app.listen(5000);
  })
  .then(() => {
    console.log("the server is running on port 5000");
  });
