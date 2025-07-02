const cron = require("node-cron");
const checkRoomCapacities = require("../services/checkCapacities");

function scheduleCapacityCheck() {
  // Her gece saat 02:00'de çalışır
  cron.schedule("0 2 * * *", async () => {
    console.log("🔔 Kapasite kontrolü başlatıldı...");
    await checkRoomCapacities();
  });
}

module.exports = scheduleCapacityCheck;
