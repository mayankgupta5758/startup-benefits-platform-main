require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./src/models/User.js");

const MONGO_URI = process.env.MONGODB_URI;
console.log("Mongo URI:", MONGO_URI);

async function seedAdmin() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: "admin@gmail.com" });
    if (existingAdmin) {
      console.log("Admin user already exists");
      await mongoose.disconnect();
      return;
    }

    // Hash the password
    const passwordHash = await bcrypt.hash("admin123", 10);

    // Create admin user
    const adminUser = await User.create({
      name: "Admin User",
      email: "admin@gmail.com",
      passwordHash,
      role: "founder",
      isVerified: true,
      isAdmin: true,
    });

    console.log("✅ Admin user created:");
    console.log(`Email: ${adminUser.email}`);
    console.log(`Password: admin123`);
    console.log(`isAdmin: ${adminUser.isAdmin}`);

    await mongoose.disconnect();
    console.log("\n✅ Done!");
  } catch (err) {
    console.error("❌ Seed error:", err.message);
    process.exit(1);
  }
}

seedAdmin();
