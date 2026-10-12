# Lalith Chandh – Portfolio

A static portfolio (HTML, CSS, vanilla JavaScript). No build step, no backend, no paid services.

```
index.html      page structure
style.css       all styling, light/dark themes, responsive rules
config.js       EDIT THIS: links, skills, projects, certificates
script.js       behaviour and rendering (rarely needs editing)
assets/
  resume.pdf            your résumé (already included)
  certificates/         supplied Azure, AWS, and MongoDB certificates
  images/               profile portrait shown in the hero card
```

## Run locally
Open `index.html` in a browser. Fonts and icons load from Google Fonts / cdnjs, so you need an internet connection for them.
For the most accurate behaviour (including "file not uploaded yet" detection), serve the folder instead:

```
python3 -m http.server 8000     # then visit http://localhost:8000
```

## Everything you edit lives in `config.js`

| To change | Edit |
|---|---|
| GitHub / LinkedIn / email / phone | `CONFIG.links` |
| Résumé file name | `CONFIG.resume` (and replace `assets/resume.pdf`) |
| CGPA | `CONFIG.cgpa` |
| "Open to opportunities" label | `CONFIG.availabilityLabel` (empty = hidden; set only if true) |
| Skills | `skillGroups` (delete any you can't back up) |
| Projects | `projects` |
| Certificates | `certificates` |

Internship dates and education entries are plain text in `index.html` (search for "June 2026" or "2023").

### Add or replace the résumé
Overwrite `assets/resume.pdf` with the new PDF (keep the same name).

### Replace the profile photo
Replace `assets/images/lalith-chandh.png` with the preferred portrait, keeping the same filename. The photo is displayed in the hero profile card.

### Add a certificate
1. Put the PDF or image in `assets/certificates/`.
2. Add or update an object in `certificates`:
```js
{
  title: "AWS Certified Developer – Associate",
  issuer: "Amazon Web Services",
  icon: "fa-brands fa-aws",
  file: "assets/certificates/aws-certified-developer-associate.pdf",
  verificationUrl: "https://...",   // real URL only, otherwise ""
  issueDate: "Month YYYY",          // real date only, otherwise ""
  expiryDate: "",
  credentialId: ""                  // publish only if you are comfortable doing so
}
```
Your Azure Fundamentals (`azure-fundamentals.pdf`), AWS Developer Associate (`aws-certified-developer-associate.pdf`), and MongoDB Associate DBA (`mongodb-associate-database-administrator.pdf`) certificates are already in `assets/certificates/` and linked from their cards. Click **View Certificate** to open each PDF in a new tab. AWS and MongoDB also have verification links sourced from their certificate PDFs. The other résumé-listed credentials remain without file links until their certificate files are added. "Verify Credential" appears only when `verificationUrl` is provided. Image files (png/jpg/webp/svg) also show a thumbnail.

### Project links
Set `repoUrl` to each project's own repository and `liveUrl` only if a working deployment exists. Empty values hide the button (source shows "Source code available on request").
Résumé figures (99.9 %, 40 %, 60 %, 3 s → 1 s) stay hidden until you set `metricsConfirmed: true` for that project.

## Deploy to GitHub Pages
1. Create a repository (your résumé points to `potlurilalith.github.io/Lalith-portfolio`, so name it `Lalith-portfolio`).
2. Upload everything in this folder (keep `assets/` structure) or push with git:
```
git init
git add .
git commit -m "Add portfolio"
git branch -M main
git remote add origin https://github.com/PotluriLalith/Lalith-portfolio.git
git push -u origin main
```
3. Repository **Settings → Pages → Build and deployment**: Source "Deploy from a branch", Branch `main`, folder `/ (root)`, Save.
4. After a minute the site is live at `https://potlurilalith.github.io/Lalith-portfolio/`.

Netlify / Vercel: drag the folder in, no build command, publish directory is the root.

## Pre-publish checklist
- [ ] Project 3 database: MySQL or MongoDB? Update `tech` in `config.js`.
- [ ] Confirm the résumé figures, then set `metricsConfirmed: true`.
- [ ] Add real repository URLs.
- [ ] Add certificate files, dates, issuers, verification links.
- [ ] Confirm the "Certified Advanced Automation Professional" issuer.
- [ ] Optionally add `assets/images/og-image.png` and an `og:image` meta tag for rich link previews.
