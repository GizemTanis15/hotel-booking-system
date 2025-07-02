const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Eğer kullanıcı modelin farklıysa örn: "Customer" olarak değiştir
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  guestCount: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Booking", bookingSchema);
