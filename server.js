const express = require('express');
const mongoose = require('mongoose');
const { nanoid } = require('nanoid');
const Url = require('./models/Url');

const app = express();
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// ✅ Route: Create short URL
app.post('/api/shorten', async (req, res) => {
  const { longUrl } = req.body;
  if (!longUrl) return res.status(400).json({ error: 'longUrl is required' });

  const shortCode = nanoid(6);
  const url = new Url({ shortCode, longUrl });
  await url.save();

  res.json({ shortCode, shortUrl: `http://localhost:3000/${shortCode}` });
});

// ✅ Route: Redirect
app.get('/:shortCode', async (req, res) => {
  const { shortCode } = req.params;
  const url = await Url.findOne({ shortCode });
  if (url) return res.redirect(url.longUrl);
  return res.status(404).send('Short URL not found');
});

// ✅ Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
