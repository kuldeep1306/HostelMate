const express = require('express');
const Feedback = require('../models/Feedback');
const { auth, adminOnly } = require('../middleware/auth');
const router = express.Router();

// GET all feedbacks (admin only)
router.get('/', auth, adminOnly, async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch { res.status(500).json({ message: 'Server error' }); }
});

// POST submit feedback (any logged-in user)
router.post('/', auth, async (req, res) => {
  try {
    const { name, roll, feedback } = req.body;
    if (!name || !roll || !feedback) return res.status(400).json({ message: 'All fields required' });
    const doc = await Feedback.create({ name, roll, feedback });
    res.status(201).json(doc);
  } catch { res.status(500).json({ message: 'Server error' }); }
});

// DELETE feedback (admin only)
router.delete('/:id', auth, adminOnly, async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch { res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
