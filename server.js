// ============================================================
//   IMAGE PARADISE PHOTOGRAPHY — NODE.JS BACKEND
//   Run: npm install && node server.js
// ============================================================

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'enquiries.json');

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// In-memory store
let enquiries = [];
try {
  if (fs.existsSync(DATA_FILE)) enquiries = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
} catch (_) { enquiries = []; }

function save() {
  try { fs.writeFileSync(DATA_FILE, JSON.stringify(enquiries, null, 2)); } catch (_) {}
}

function validate(d) {
  const errs = [];
  if (!d.firstName?.trim()) errs.push('First name required');
  if (!d.lastName?.trim()) errs.push('Last name required');
  if (!d.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) errs.push('Valid email required');
  if (!d.sessionType?.trim()) errs.push('Session type required');
  if (!d.message || d.message.trim().length < 20) errs.push('Message too short');
  return errs;
}

// POST /api/contact
app.post('/api/contact', (req, res) => {
  const errs = validate(req.body);
  if (errs.length) return res.status(400).json({ success: false, errors: errs });

  const record = {
    id: Date.now(),
    ...req.body,
    firstName: req.body.firstName.trim(),
    lastName: req.body.lastName.trim(),
    email: req.body.email.trim().toLowerCase(),
    status: 'new',
    createdAt: new Date().toISOString()
  };

  enquiries.push(record);
  save();

  console.log(`✅ New enquiry: ${record.firstName} ${record.lastName} <${record.email}> — ${record.sessionType}`);

  // 📧 Add email notification here (Nodemailer / SendGrid)

  res.json({ success: true, id: record.id, message: 'Enquiry received!' });
});

// GET /api/enquiries
app.get('/api/enquiries', (req, res) => {
  res.json({ success: true, total: enquiries.length, data: enquiries });
});

// GET /api/enquiries/:id
app.get('/api/enquiries/:id', (req, res) => {
  const item = enquiries.find(e => e.id === Number(req.params.id));
  if (!item) return res.status(404).json({ success: false, message: 'Not found' });
  res.json({ success: true, data: item });
});

// PATCH /api/enquiries/:id/status
app.patch('/api/enquiries/:id/status', (req, res) => {
  const allowed = ['new', 'read', 'replied', 'booked', 'declined'];
  if (!allowed.includes(req.body.status)) return res.status(400).json({ success: false, message: 'Invalid status' });
  const item = enquiries.find(e => e.id === Number(req.params.id));
  if (!item) return res.status(404).json({ success: false, message: 'Not found' });
  item.status = req.body.status; item.updatedAt = new Date().toISOString();
  save();
  res.json({ success: true, data: item });
});

// GET /api/stats
app.get('/api/stats', (req, res) => {
  const byStatus = {}, bySession = {};
  enquiries.forEach(e => {
    byStatus[e.status] = (byStatus[e.status] || 0) + 1;
    bySession[e.sessionType] = (bySession[e.sessionType] || 0) + 1;
  });
  res.json({ success: true, stats: { total: enquiries.length, byStatus, bySession, newsletters: enquiries.filter(e => e.newsletter).length } });
});

// Serve index for all other routes (SPA)
app.get('*', (_, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log('');
  console.log('📸  Image Paradise Photography — Server Started');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`🌍  Website:    http://localhost:${PORT}`);
  console.log(`📬  API:        http://localhost:${PORT}/api/contact`);
  console.log(`📋  Enquiries:  http://localhost:${PORT}/api/enquiries`);
  console.log(`📊  Stats:      http://localhost:${PORT}/api/stats`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
});
