const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
const bcrypt   = require('bcryptjs');
const jwt      = require('jsonwebtoken');
const path     = require('path');
require('dotenv').config();

const app  = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET  = process.env.JWT_SECRET  || 'localshop_secret_key_change_in_prod';
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌ MONGO_URI is not set in environment variables. Exiting.');
  process.exit(1);
}

/* ── Middleware ── */
app.use(cors());
app.use(express.json());

/* ── MongoDB Connection ── */
mongoose.connect(MONGO_URI, {
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err.message));

/* ══════════════════════════════════════════
   MODELS
══════════════════════════════════════════ */

/* User model */
const userSchema = new mongoose.Schema({
  name:      { type: String, required: true, trim: true },
  email:     { type: String, required: true, unique: true, lowercase: true },
  password:  { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);

/* Shop model */
const shopSchema = new mongoose.Schema({
  name:        { type: String, required: true, trim: true },
  category:    { type: String, required: true },
  address:     { type: String, required: true },
  contact:     { type: String, required: true },
  description: { type: String, default: '' },
  instagram:   { type: String, default: '' },
  addedBy:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  createdAt:   { type: Date, default: Date.now }
});
const Shop = mongoose.model('Shop', shopSchema);

/* ══════════════════════════════════════════
   MIDDLEWARE: Auth guard
══════════════════════════════════════════ */
function authGuard(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

/* ══════════════════════════════════════════
   AUTH ROUTES
══════════════════════════════════════════ */

/**
 * POST /api/register
 * Body: { name, email, password }
 */
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ error: 'All fields required' });

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 10);
    const user   = await User.create({ name, email, password: hashed });

    const token = jwt.sign({ id: user._id, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ message: 'Registered successfully', token, name: user.name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/login
 * Body: { email, password }
 */
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: 'Email and password required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ message: 'Login successful', token, name: user.name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ══════════════════════════════════════════
   SHOP ROUTES
══════════════════════════════════════════ */

/**
 * GET /api/get-shops
 * Query params: ?q=keyword&category=Food
 * Returns all shops (or filtered)
 */
app.get('/api/get-shops', async (req, res) => {
  try {
    const { q, category } = req.query;
    let filter = {};

    if (category && category !== 'All') {
      filter.category = category;
    }
    if (q) {
      filter.$or = [
        { name:     { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } },
        { address:  { $regex: q, $options: 'i' } }
      ];
    }

    const shops = await Shop.find(filter).sort({ createdAt: -1 });
    res.json({ count: shops.length, shops });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/shops/:id
 * Returns single shop by ID
 */
app.get('/api/shops/:id', async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) return res.status(404).json({ error: 'Shop not found' });
    res.json(shop);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/add-shop
 * Protected: requires JWT
 * Body: { name, category, address, contact, description?, instagram? }
 */
app.post('/api/add-shop', authGuard, async (req, res) => {
  try {
    const { name, category, address, contact, description, instagram } = req.body;
    if (!name || !category || !address || !contact)
      return res.status(400).json({ error: 'Name, category, address, contact are required' });

    const shop = await Shop.create({
      name, category, address, contact,
      description: description || '',
      instagram:   instagram   || '',
      addedBy:     req.user.id
    });

    res.status(201).json({ message: 'Shop added successfully', shop });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * DELETE /api/shops/:id
 * Protected: only the user who added it can delete
 */
app.delete('/api/shops/:id', authGuard, async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) return res.status(404).json({ error: 'Shop not found' });
    if (String(shop.addedBy) !== String(req.user.id))
      return res.status(403).json({ error: 'Not authorized to delete this shop' });

    await shop.deleteOne();
    res.json({ message: 'Shop deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ── Start server ── */
app.listen(PORT, () => {
  console.log(`🚀 LocalShop API running at http://localhost:${PORT}`);
  console.log(`   Endpoints:`);
  console.log(`   POST /api/register`);
  console.log(`   POST /api/login`);
  console.log(`   GET  /api/get-shops`);
  console.log(`   POST /api/add-shop   (protected)`);
  console.log(`   GET  /api/shops/:id`);
  console.log(`   DELETE /api/shops/:id (protected)`);
});