const Booking = require("../models/Booking");
const Room = require("../models/Room");

// Rezervasyon oluştur (availability güncellemesi dahil)
exports.createBooking = async (req, res) => {
  try {
    const { roomId, startDate, endDate, guestCount } = req.body;
    const userId = req.user.id;

    // Odayı getir
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: "Oda bulunamadı" });
    }

    // Uygunluk kontrolü
    const availability = room.availability.find(a => {
      return (
        a.isAvailable &&
        new Date(a.startDate) <= new Date(startDate) &&
        new Date(a.endDate) >= new Date(endDate)
      );
    });

    if (!availability) {
      return res.status(400).json({ error: "Bu tarih aralığında uygunluk yok" });
    }

    if (availability.totalRooms <= 0) {
      return res.status(400).json({ error: "Müsait oda kalmamış" });
    }

    // Rezervasyon oluştur
    const newBooking = new Booking({
      roomId,
      startDate,
      endDate,
      guestCount,
      userId,
    });

    await newBooking.save();

    // totalRooms değerini 1 azalt
    availability.totalRooms -= 1;
    await room.save();

    res.status(201).json({
      message: "Rezervasyon başarıyla oluşturuldu. Ödeme alındı, işlem simülasyonu yapıldı.",
      booking: newBooking,
    });
  } catch (error) {
    res.status(500).json({
      error: "Rezervasyon oluşturulamadı",
      details: error.message,
    });
  }
};

// Kullanıcının rezervasyonlarını getir
exports.getBookingsByUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const bookings = await Booking.find({ userId }).populate(
      "roomId",
      "roomType price description destination"
    );

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      error: "Rezervasyonlar alınamadı",
      details: error.message,
    });
  }
};
