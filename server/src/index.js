require("dotenv").config({ path: "../.env" });

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const dealRoutes = require("./routes/deals");
const claimRoutes = require("./routes/claims");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/deals", dealRoutes);
app.use("/api/claims", claimRoutes);

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;
console.log(MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ Mongo error:", err));

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
