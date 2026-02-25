# Master Lock and Key — Static Site

This repository is configured to run as a static website on GitHub Pages.

## Live URL

- https://90ninety90.github.io/208carkeys/

## Local Preview

```powershell
cd site
python -m http.server 8000
# open http://localhost:8000
```

## GitHub Pages Deployment

1. Push this repository to GitHub.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, set:
	- **Source**: Deploy from a branch
	- **Branch**: `main` (or your default branch)
	- **Folder**: `/ (root)`
4. Save and wait for deployment.

## Contact Form on GitHub Pages

Because GitHub Pages is static-only, there is no backend `/api/contact` endpoint.
The contact form opens the visitor's email app using a `mailto:` link to:

- `masterlockandkey208@gmail.com`

If you want server-side collection later, connect a static form service (for example: Formspree, Basin, or Netlify Forms).
