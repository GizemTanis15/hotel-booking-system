require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const roomRoutes = require("./routes/roomRoutes");
const searchRoutes = require("./routes/searchRoutes");
const userRoutes = require("./routes/userRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const { swaggerUi, specs } = require("./swagger");

const app = express();

// ✅ CORS middleware'i en üstte tanımla
app.use(cors({
  origin:[
    "http://127.0.0.1:5500",  // local test için
    "http://localhost:5500",  // local test için
    "https://hotel-booking-system-ten-jade.vercel.app", // ✅ buraya kendi Vercel URL'ini yaz
    "https://hotel-booking-system-2-aay3.onrender.com",
  ],
  credentials: true
}));

// ✅ JSON parser
app.use(express.json());

// ✅ Tüm route'lar
app.use("/api/v1/rooms", roomRoutes);
app.use("/api/v1", searchRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/bookings", bookingRoutes);
app.use("/api/v1/admin", authRoutes);

// ✅ Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// ✅ Test endpoint
app.get("/", (req, res) => {
  res.send("Ana sayfa çalışıyor!");
});

// ✅ MongoDB bağlantısı ve server başlatma
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT || 3000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB connection failed", err));
