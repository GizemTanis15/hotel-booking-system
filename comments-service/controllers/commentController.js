// controllers/commentController.js
const Comment = require('../models/Comment');

const createComment = async (req, res) => {
  try {
    const { roomId, comment, scores } = req.body;
    const userId = req.userId; // JWT'den alınan kullanıcı ID'si

    if (!roomId || !comment || !scores) {
      return res.status(400).json({ message: 'roomId, comment ve scores zorunludur.' });
    }



    const newComment = new Comment({
      userId,
      roomId,
      comment,
      scores
    });

    await newComment.save();
    res.status(201).json({ message: 'Yorum başarıyla eklendi.', data: newComment });
  } catch (error) {
    console.error('Yorum ekleme hatası:', error);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};

// GET /score-summary?roomId=...
const getScoreSummary = async (req, res) => {
    const { roomId } = req.query;
    if (!roomId) return res.status(400).json({ msg: 'roomId gerekli' });
  
    // kategori ortalamalarını topla
    const [r] = await Comment.aggregate([
      { $match: { roomId } },
      {
        $group: {
          _id: null,
          total:        { $sum: 1 },
          avgTemizlik:  { $avg: '$scores.temizlik' },
          avgServis:    { $avg: '$scores.servis'   },
          avgKonfor:    { $avg: '$scores.konfor'   }
        }
      }
    ]);
  
    if (!r) return res.json({ roomId, totalComments: 0 });
  
    const cats = [
      { key: 'temizlik', avg5: r.avgTemizlik },
      { key: 'servis',   avg5: r.avgServis   },
      { key: 'konfor',   avg5: r.avgKonfor   }
    ];
  
    // /10 ölçeğine çevirelim (5 × 2)
    cats.forEach(c => (c.avg10 = Number((c.avg5 * 2).toFixed(1))));
  
    const overall10 = Number(
      (cats.reduce((s, c) => s + c.avg10, 0) / cats.length).toFixed(1)
    );
  
    res.json({
      roomId,
      totalComments: r.total,
      average10: overall10,
      categories: cats.map(({ key, avg10 }) => ({ key, avg10 }))
    });
  };

module.exports = {
  createComment,
  getScoreSummary      // ← ekledik
};
