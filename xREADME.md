# Master Lock and Key — Site (local server)

This folder contains the static site served by the demo Express server.


Run the demo server from the project root or directly from `C:\site`.

Static preview (no backend required):

```powershell
cd site
python -m http.server 8000
# open http://localhost:8000
```

Node (recommended — includes contact endpoint):

```powershell
# from any folder (requires Node installed)
node C:\site\site-server-no-deps.js
# open http://localhost:3000
```

The contact form POSTs to `/api/contact`. Submissions are appended to `C:\contact.log`.
