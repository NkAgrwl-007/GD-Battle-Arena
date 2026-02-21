import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./config/db.js";
import roomRoutes from "./routes/roomRoutes.js";

// ✅ Load env FIRST (very important)
dotenv.config();

// ✅ Debug (remove later)
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing in .env");
}

const app = express();
const httpServer = createServer(app);

// ================= MIDDLEWARE =================
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/auth", authRoutes);


// ================= ROUTES =================
app.use("/api/rooms", roomRoutes);

// health check
app.get("/", (req, res) => {
  res.send("🚀 GD Battle Arena API running");
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    httpServer.listen(PORT, () => {
      console.log(`🔥 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();
