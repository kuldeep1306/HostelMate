require('dotenv').config();

const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth',       require('./routes/auth'));
app.use('/api/feedback',   require('./routes/feedback'));
app.use('/api/complaints', require('./routes/complaints'));
app.use('/api/notices',    require('./routes/notices'));
app.use('/api/societies',  require('./routes/societies'));


// Health check
app.get('/api/health', (req, res) => res.json({ status: 'OK', message: 'HostelMate API running' }));

// Google DNS use karo
dns.setServers(["8.8.8.8", "1.1.1.1"]);

// Connect MongoDB & start server
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on http://localhost:${process.env.PORT || 5000}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
