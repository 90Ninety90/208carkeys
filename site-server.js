const express = require('express');
const path = require('path');
const fs = require('fs');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname)));

app.post('/api/contact', (req, res) => {
  const { name, contact, message } = req.body || {};
  if (!name || !contact) return res.status(400).json({ ok: false, error: 'Missing name or contact' });
  const entry = { time: new Date().toISOString(), name: String(name), contact: String(contact), message: message ? String(message) : '' };
  const logLine = JSON.stringify(entry) + '\n';
  fs.appendFile(path.join(__dirname, '..', 'contact.log'), logLine, err => { if (err) console.error('Failed to persist contact:', err); });
  console.log('Contact request:', entry);
  res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Site running at http://localhost:${PORT}`));
