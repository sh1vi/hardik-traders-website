# Hardik Traders – Vite React Website (English + Hindi + WhatsApp + Real Form)

This package is a deploy-ready Vite React website for **Hardik Traders** with:
- responsive homepage
- English and Hindi localization
- auto-detect language from the browser (Hindi if `navigator.language` starts with `hi`, otherwise English)
- manual language switcher in the header
- selected language saved in browser localStorage
- real product images loaded from Wikimedia Commons file URLs
- WhatsApp buttons in both languages
- contact form with live email delivery using **Formspree**
- clickable product cards and product details page via hash routing (`#/product/:id`)

## Quick Start

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

Production files are generated in the `dist/` folder.

## Enable Live Contact Form Email Integration

1. Create a Formspree form.
2. Copy your Form ID.
3. Create a `.env` file from `.env.example`.
4. Set:

```bash
VITE_FORMSPREE_FORM_ID=your_form_id_here
```

Then restart the dev server.

## Editable Localization and Content

Update all English/Hindi content in:
- `src/App.jsx` → `translations.en`
- `src/App.jsx` → `translations.hi`

You can also edit:
- contact phone
- WhatsApp number
- product names/descriptions
- image URLs

## Real Images Used

This project references freely reusable images from Wikimedia Commons using `Special:FilePath` URLs.
Please review attribution and licensing requirements before production deployment.

## Deploy

You can deploy the `dist/` folder to Vercel, Netlify, Cloudflare Pages, GitHub Pages, or any static hosting.
