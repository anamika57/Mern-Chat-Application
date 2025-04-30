const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
console.log("🔍 MONGODB_CONNECT =", process.env.MONGODB_CONNECT);

const dbConnect = async () => {
  try {
    
    const uri = process.env.MONGODB_CONNECT;
    
    if (!uri) {
      throw new Error("MongoDB connection URI is not defined in .env");
    }

    await mongoose.connect(uri);
  

    console.log("✅ DB connected successfully");
  } catch (err) {
    console.error("❌ Failed to connect to DB:", err.message);
    throw err;
  }
};

module.exports = dbConnect;
