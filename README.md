# כנפיים לעוף - מרכז טיפולי-לימודי

Next.js 16 static-export site deployed on Netlify.

## Before You Deploy

### 1. Netlify Environment Variable (REQUIRED)

Go to: **Netlify Dashboard → Your Site → Site Settings → Environment Variables**

Add the following variable:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_WEB3FORMS_KEY` | your Web3Forms access key (found in `.env.local`) |

Without this, the contact forms will silently fail in production.

### 2. OG Image (REQUIRED for social sharing)

Place a **1200×630** image at `public/og-image.jpg`.

This image appears when someone shares the site on WhatsApp, Facebook, LinkedIn, etc.
Use [Canva](https://canva.com) (free) to create it - include the site name and logo.

A temporary placeholder (`founder_portrait.jpg` cropped) is currently at `public/og-image.jpg`.
Replace it before launch.

### 3. Final build check

```bash
npm run build
```

Confirm the `out/` directory is generated with no errors.

---

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- **Framework**: Next.js 16 (App Router, static export)
- **Styling**: Tailwind CSS v4
- **Fonts**: Heebo, Rubik, Frank Ruhl Libre, Assistant (Google Fonts, Hebrew subsets)
- **Forms**: [Web3Forms](https://web3forms.com) (no backend required)
- **Hosting**: Netlify (`out/` published directory)

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Web3Forms access key for contact forms | Yes |

Copy `.env.local.example` → `.env.local` and fill in the value, or set directly in Netlify dashboard.
