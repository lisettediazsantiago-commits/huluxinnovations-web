# HuLux Innovations — Website

A static homepage for HuLux Innovations.
**Live tagline:** *Closer, when it matters most.*

---

## 📁 Project Structure

```
hulux-website/
├── public/
│   ├── index.html          ← The whole site (HTML/CSS/JS in one file)
│   └── assets/
│       └── hulux-mark.jpg  ← Logo
├── vercel.json             ← Vercel deployment config
├── firebase.json           ← Firebase Hosting config
├── .gitignore
└── README.md
```

Everything that gets served lives inside `/public`. That's the convention both Vercel and Firebase Hosting expect.

---

## 🚀 Deployment

### Option 1 — Vercel (easiest)

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the GitHub repo
4. Vercel auto-detects the `vercel.json` config and deploys
5. You'll get a live URL like `huluxinnovations.vercel.app`

To connect a custom domain (e.g. `huluxinnovations.com`):
Vercel dashboard → Project → Settings → Domains → Add.

**Local preview with Vercel CLI:**
```bash
npm i -g vercel
vercel dev
```

---

### Option 2 — Firebase Hosting

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize (only first time): `firebase init hosting`
   - When prompted, select your Firebase project
   - Public directory: **`public`** (already set in `firebase.json`)
   - Single-page app: **No**
   - Overwrite `public/index.html`: **No** ⚠️ (keep the existing one)
4. Deploy: `firebase deploy --only hosting`

Custom domain: Firebase Console → Hosting → Add custom domain.

---

### Option 3 — Plain GitHub Pages

1. Push to GitHub
2. Repo → Settings → Pages
3. Source: `Deploy from a branch` → `main` → `/public` folder
4. Save, wait ~1 min, your site is at `username.github.io/repo-name`

---

## 🛠 Editing the Site

Everything is in **`public/index.html`** — HTML, CSS, and JavaScript all in one file. Open it in any editor.

### Common edits you might want to make

**Change the contact email** (currently `hello@huluxinnovations.com`):
Search the file for `hello@huluxinnovations.com` — appears in the Partners section and footer.

**Update the LinkedIn URL** (currently `linkedin.com/company/huluxinnovations`):
Search for `linkedin.com/company/huluxinnovations`.

**Add or edit beliefs:**
Search for `<!-- BELIEFS -->`. Each belief is its own `<div class="belief">` block — duplicate one to add another.

**Add a section:**
Sections follow this pattern:
```html
<section id="your-id">
  <div class="reveal">
    <div class="section-eyebrow">YOUR EYEBROW</div>
    <h2 class="section-title">Your title <em>with accent</em>.</h2>
    <div class="section-divider"></div>
    <p>Your content.</p>
  </div>
</section>
```
The `reveal` class triggers the fade-up animation on scroll.

---

## 📬 Wiring Up the Email Form

The signup form currently just shows a success message. To actually collect emails, pick one and swap in the form action:

**Formspree** (easiest, free tier 50/mo):
1. Sign up at [formspree.io](https://formspree.io), create a form, get the endpoint
2. In `index.html`, replace:
   ```html
   <form class="signup-form" id="emailForm" onsubmit="handleSubmit(event)">
   ```
   with:
   ```html
   <form class="signup-form" action="https://formspree.io/f/YOUR_ID" method="POST">
   ```
3. Remove the `onsubmit` JS handler if you want native form behavior.

**Mailchimp / ConvertKit / Beehiiv:**
Each gives you an HTML embed snippet. Replace the entire `<form>` block with theirs, then re-apply the `.signup-form` styling classes.

**Firebase Firestore** (if you want full control):
Add the Firebase SDK and write a small `submitEmail()` function that calls `addDoc()`. Happy to help wire this up.

---

## 🎨 Brand Tokens (in case you want to extend)

```css
--navy:        #0A1A35  /* primary background */
--navy-deep:   #060F23  /* alternate section background */
--navy-soft:   #142849  /* hover states */
--gold:        #C9A961  /* primary accent */
--gold-warm:   #D4B876  /* hover gold */
--cream:       #F5F1E8  /* primary text */
```

Fonts (Google Fonts, already loaded):
- **Cinzel** — eyebrows, wordmark, buttons (display serif)
- **Cormorant Garamond** — headlines and body (editorial serif)
- **Inter** — nav links, buttons (sans-serif support)

---

## 📝 License

© 2026 HuLux Innovations. All rights reserved.
