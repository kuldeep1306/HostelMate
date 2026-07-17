const express = require('express');
const Notice = require('../models/Notice');
const { auth, adminOnly } = require('../middleware/auth');
const router = express.Router();

// GET all notices (any logged-in user)
router.get('/', auth, async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch { res.status(500).json({ message: 'Server error' }); }
});

// POST create notice (admin only)
router.post('/', auth, adminOnly, async (req, res) => {
  try {
    const { message } = req.body;
    if (!message?.trim()) return res.status(400).json({ message: 'Message required' });
    const doc = await Notice.create({ message });
    res.status(201).json(doc);
  } catch { res.status(500).json({ message: 'Server error' }); }
});

// DELETE notice (admin only)
router.delete('/:id', auth, adminOnly, async (req, res) => {
  try {
    await Notice.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch { res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
