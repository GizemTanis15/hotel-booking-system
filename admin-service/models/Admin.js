const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {  // ✅ sade ve uyumlu alan adı
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Admin", AdminSchema);
