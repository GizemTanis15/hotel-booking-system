const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  totalRooms: {
    type: Number,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
});

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true },
  roomType: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  destination: { type: String, required: true },
  capacity: { type: Number, required: true }, 
  availability: [availabilitySchema], // ✅ availability array olarak tanımlandı
});

module.exports = mongoose.model("Room", roomSchema);
