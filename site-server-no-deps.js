const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const root = path.join(__dirname);
const port = process.env.PORT || 3000;

function sendFile(res, filePath, contentType) {
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

function getContentType(filePath) {
  if (filePath.endsWith('.html')) return 'text/html; charset=utf-8';
  if (filePath.endsWith('.css')) return 'text/css; charset=utf-8';
  if (filePath.endsWith('.js')) return 'application/javascript';
  if (filePath.endsWith('.svg')) return 'image/svg+xml';
  if (filePath.endsWith('.json')) return 'application/json';
  return 'application/octet-stream';
}

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);
  if (req.method === 'GET') {
    let pathname = parsed.pathname === '/' ? '/index.html' : parsed.pathname;
    const safePath = path.normalize(path.join(root, pathname));
    if (!safePath.startsWith(root)) { res.writeHead(403); res.end('Forbidden'); return; }
    const fullPath = safePath;
    const ct = getContentType(fullPath);
    sendFile(res, fullPath, ct);
    return;
  }

  if (req.method === 'POST' && parsed.pathname === '/api/contact') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const obj = JSON.parse(body || '{}');
        const entry = { time: new Date().toISOString(), name: String(obj.name||''), contact: String(obj.contact||''), message: String(obj.message||'') };
        const line = JSON.stringify(entry) + '\n';
        fs.appendFile(path.join(__dirname, '..', 'contact.log'), line, err => { if (err) console.error('append error', err); });
        res.writeHead(200, {'Content-Type':'application/json'});
        res.end(JSON.stringify({ ok: true }));
      } catch (e) {
        res.writeHead(400, {'Content-Type':'application/json'});
        res.end(JSON.stringify({ ok: false, error: 'invalid json' }));
      }
    });
    return;
  }

  res.writeHead(404); res.end('Not found');
});

server.listen(port, () => console.log(`No-deps site running at http://localhost:${port}`));
