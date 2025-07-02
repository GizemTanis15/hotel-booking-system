const Room = require("../models/Room");

// Oda ekle
exports.createRoom = async (req, res) => {
  try {
    const newRoom = new Room(req.body);
    const savedRoom = await newRoom.save();
    res.status(201).json(savedRoom);
  } catch (err) {
    res.status(500).json({ msg: "Oda eklenirken hata oluştu", error: err.message });
  }
};
  
// Tüm odaları getir
exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json({ msg: "Odalar alınamadı", error: err.message });
  }
};

// Oda güncelle
exports.updateRoom = async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRoom) return res.status(404).json({ msg: "Oda bulunamadı" });
    res.json(updatedRoom);
  } catch (err) {
    res.status(500).json({ msg: "Güncelleme hatası", error: err.message });
  }
};

// Oda sil
exports.deleteRoom = async (req, res) => {
  try {
    const deleted = await Room.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: "Oda bulunamadı" });
    res.json({ msg: "Oda silindi" });
  } catch (err) {
    res.status(500).json({ msg: "Silme hatası", error: err.message });
  }
};

// ✅ Yeni eklenen fonksiyon: Odaya müsaitlik ekleme
exports.addAvailability = async (req, res) => {
    const { startDate, endDate, totalRooms } = req.body;
  
    if (!startDate || !endDate || !totalRooms) {
      return res.status(400).json({ msg: "Eksik bilgiler gönderildi" });
    }
  
    try {
      const room = await Room.findById(req.params.id);
      if (!room) {
        return res.status(404).json({ msg: "Oda bulunamadı" });
      }
  
      if (!room.availability) {
        room.availability = [];
      }
  
      room.availability.push({
        startDate,
        endDate,
        totalRooms,
        isAvailable: true,
      });
  
      await room.save();
  
      res.status(200).json({ msg: "Müsaitlik bilgisi eklendi", room });
    } catch (error) {
      res.status(500).json({ msg: "Müsaitlik eklenirken hata oluştu", error: error.message });
    }
  };