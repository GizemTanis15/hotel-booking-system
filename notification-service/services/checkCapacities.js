const Room = require("../../admin-service/models/Room"); // Gerekirse yol ayarla
const Notification = require("../models/Notification");

module.exports = async function checkRoomCapacities() {
  try {
    const rooms = await Room.find();
    for (const room of rooms) {
      for (const period of room.availability) {
        if (period.totalRooms !== 0 && period.totalRooms <= (room.capacity || 5) * 0.2) {
          await Notification.create({
            message: `⚠️ Oda ${room.roomNumber} kapasitesi kritik seviyede (%${(period.totalRooms / (room.capacity || 5) * 100).toFixed(0)})`,
            type: "capacity",
            createdAt: new Date()
          });
          // Şunu da geçici olarak ekle:
console.log(`[TEST] ⚠️ Oda ${room.roomNumber} kapasitesi kritik seviyede.`);
        }
      }
    }
  } catch (err) {
    console.error("Kapasite kontrolü hatası:", err.message);
  }
};
