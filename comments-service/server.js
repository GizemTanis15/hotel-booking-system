// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


const commentRoutes = require('./routes/commentRoutes'); // birazdan oluşturacağız
const { swaggerUi, swaggerSpec } = require('./swagger');

dotenv.config();

const app = express();
app.use(cors({
    origin: "http://127.0.0.1:5500", // Veya "http://localhost:5500"
    credentials: true
  }));
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// MongoDB bağlantısı
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected successfully!');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Routes
app.use('/api/v1/comments', commentRoutes);

// Sunucu başlat
const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Comment Service running on port ${PORT}`);
});
