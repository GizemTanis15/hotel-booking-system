const Notification = require("../models/Notification");

exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json({ data: notifications });
  } catch (err) {
    res.status(500).json({ error: "Bildirimler alınamadı" });
  }
};
