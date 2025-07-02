const amqp = require("amqplib");
const Notification = require("../models/Notification");

async function listenForReservations() {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    const queue = "reservations";

    await channel.assertQueue(queue, { durable: true });

    console.log("📥 Rezervasyon kuyruğu dinleniyor...");

    channel.consume(queue, async (msg) => {
      const data = JSON.parse(msg.content.toString());
      console.log("Yeni rezervasyon:", data);

      await Notification.create({
        message: `✅ Yeni rezervasyon: Oda ${data.roomNumber}, Kullanıcı: ${data.userId}`,
        type: "reservation",
        createdAt: new Date()
      });

      channel.ack(msg);
    });
  } catch (err) {
    console.error("Rezervasyon kuyruğu hatası:", err.message);
  }
}

module.exports = listenForReservations;
