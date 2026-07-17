const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  user:      { type: String, required: true },  // "Name (Hostel, Room X)"
  message:   { type: String, required: true },
  createdAt: { type: Date, default: Date.now },

  // --- AI triage fields ---
  category: {
    type: String,
    enum: ['Electrical', 'Plumbing', 'Security', 'Mess', 'Internet', 'Cleanliness', 'Furniture', 'Other'],
    default: 'Other',
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Urgent'],
    default: 'Medium',
  },
  aiReasoning: { type: String }, // one-line explanation, shown as a tooltip in the admin UI
});

module.exports = mongoose.model('Complaint', complaintSchema);
