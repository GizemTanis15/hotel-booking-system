
const Room = require("../models/Room");
const Booking = require("../models/Booking");

exports.searchRooms = async (req, res) => {
  const { destination, startDate, endDate, guests } = req.query;
  const user = req.user;

  try {
    const rooms = await Room.find({
      destination,
      capacity: { $gte: guests },
    });

    const results = [];

    for (const room of rooms) {
      const matchingAvailability = room.availability.find((a) => {
        const searchStart = new Date(startDate);
        const searchEnd = new Date(endDate);
        const availStart = new Date(a.startDate);
        const availEnd = new Date(a.endDate);

        return (
          a.isAvailable &&
          availStart <= searchStart &&
          availEnd >= searchEnd &&
          a.totalRooms > 0
        );
      });

      if (matchingAvailability) {
        const overlappingBookings = await Booking.find({
          roomId: room._id,
          $or: [
            {
              startDate: { $lt: new Date(endDate) },
              endDate: { $gt: new Date(startDate) },
            },
          ],
        });

        const bookedCount = overlappingBookings.length;
        const available = matchingAvailability.totalRooms - bookedCount;

        if (available > 0) {
          results.push({
            hotelName: room.hotelName || "Hotel Test",
            roomId: room._id,
            roomType: room.roomType,
            price: room.price,
            discountedPrice: user ? (room.price * 0.85).toFixed(2) : null,
            capacity: room.capacity,
            location: room.destination,
            availableRooms: available,
          });
        }
      }
    }

    res.status(200).json({
      message: "Başarılı",
      data: results,
    });

  } catch (err) {
    console.error("🔴 Search error details:", err.message);
    res.status(500).json({ error: "Search failed.", details: err.message });
  }
};

