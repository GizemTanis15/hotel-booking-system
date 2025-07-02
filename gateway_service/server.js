const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const commentRoutes = require('./routes/commentsProxy'); // yorum yönlendirme dosyası

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// route'ları bağla
app.use('/api/v1', commentRoutes);

// basit kontrol endpoint
app.get('/', (req, res) => {
  res.send('API Gateway çalışıyor');
});

// sunucuyu başlat
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚪 API Gateway ${PORT} portunda çalışıyor`);
});
