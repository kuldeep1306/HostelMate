const express = require('express');
const Complaint = require('../models/Complaint');
const { auth, adminOnly } = require('../middleware/auth');
const { classifyComplaint } = require('../utils/classifyComplaint');
const router = express.Router();

// GET all complaints (admin only) — Urgent/High priority surfaces first
router.get('/', auth, adminOnly, async (req, res) => {
  try {
    const priorityOrder = { Urgent: 0, High: 1, Medium: 2, Low: 3 };
    const complaints = await Complaint.find().sort({ createdAt: -1 }).lean();
    complaints.sort((a, b) => (priorityOrder[a.priority] ?? 2) - (priorityOrder[b.priority] ?? 2));
    res.json(complaints);
  } catch { res.status(500).json({ message: 'Server error' }); }
});

// POST submit complaint (any logged-in user)
router.post('/', auth, async (req, res) => {
  try {
    const { name, hostel, room, message } = req.body;
    if (!name || !hostel || !room || !message) return res.status(400).json({ message: 'All fields required' });
    const user = `${name.trim()} (${hostel.trim()}, Room ${room.trim()})`;

    // AI triage — never blocks complaint creation if it fails
    const { category, priority, reasoning } = await classifyComplaint(message);

    const doc = await Complaint.create({ user, message, category, priority, aiReasoning: reasoning });
    res.status(201).json(doc);
  } catch { res.status(500).json({ message: 'Server error' }); }
});

// DELETE complaint (admin only)
router.delete('/:id', auth, adminOnly, async (req, res) => {
  try {
    await Complaint.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch { res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
