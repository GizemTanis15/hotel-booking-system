const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Routes & Swagger
const notificationRoutes = require("./routes/notificationRoutes");
const { swaggerUi, specs } = require("./swagger");

// Kuyruk ve cron görevleri
const scheduleCapacityCheck = require("./queues/capacityQueue"); // Eğer cron ayrıysa
const listenForReservations = require("./queues/reservationQueue");

app.use(express.json());

// Swagger UI
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));

// Bildirim endpoint'i
app.use("/api/v1/notifications", notificationRoutes);

// MongoDB bağlantısı
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("📦 MongoDB bağlantısı başarılı");

    // Arka plan servislerini başlat
    scheduleCapacityCheck();      // Kapasiteyi gece kontrol eden cron-job
    listenForReservations();      // RabbitMQ rezervasyon kuyruğu dinleme
  })
  .catch((err) => {
    console.error("❌ MongoDB bağlantı hatası:", err.message);
  });

// Sunucu dinlemeye başlasın
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🔔 Notification Service ${PORT} portunda çalışıyor`);
});
