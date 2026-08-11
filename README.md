# CV Builder Pro 🚀

A stunning, fully functional resume/CV builder PWA with Flutterwave payment integration.

## Features
- ✅ 3 beautiful templates: Modern, Classic, Creative
- ✅ Live real-time preview
- ✅ PDF download via browser print (Save as PDF)
- ✅ Flutterwave payment (₦500) before download — pays to your OPay account
- ✅ PWA — installable on Android, iOS, Windows
- ✅ Auto-saves to browser localStorage
- ✅ Responsive — works on mobile, tablet, desktop

## Deploy to Vercel (Step by Step)

### 1. Push to GitHub
```bash
cd cv-builder
git init
git add .
git commit -m "Initial commit: CV Builder Pro"
git remote add origin https://github.com/YOUR_USERNAME/cv-builder.git
git push -u origin main
```

### 2. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"New Project"**
3. Import your GitHub repository
4. Click **"Deploy"** — Vercel auto-detects Next.js

### 3. Add Environment Variables on Vercel
After deployment, go to **Project Settings → Environment Variables** and add:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY` | Your Flutterwave public key |
| `FLUTTERWAVE_SECRET_KEY` | Your Flutterwave secret key |

### 4. Get Flutterwave Keys
1. Sign up at [dashboard.flutterwave.com](https://dashboard.flutterwave.com)
2. Go to **Settings → API Keys**
3. Copy your **Public Key** (starts with `FLWPUBK-`)
4. Copy your **Secret Key** (starts with `FLWSECK-`)

### 5. Connect OPay to Flutterwave
1. In Flutterwave dashboard, go to **Settings → Subaccounts** OR
2. Set up your **Settlement Account** with your OPay bank details:
   - Bank: OPay (Premier Finance Microfinance Bank)
   - Account number: Your OPay account number

### 6. Redeploy
After adding env variables, click **"Redeploy"** in Vercel.

## Local Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Open http://localhost:3000
```

## PWA Installation
- **Android**: Open in Chrome → tap menu → "Add to Home Screen"
- **iOS**: Open in Safari → tap Share → "Add to Home Screen"  
- **Windows**: Open in Edge/Chrome → click install icon in address bar

## Project Structure
```
src/
├── app/
│   ├── page.tsx          # Landing page
│   ├── builder/page.tsx  # CV Builder
│   ├── api/generate-pdf/ # PDF generation API
│   └── layout.tsx
├── components/
│   ├── templates/        # 3 CV templates
│   ├── editor/           # Form sections
│   ├── CVPreview.tsx     # Live preview
│   └── PaymentModal.tsx  # Flutterwave payment
├── context/CVContext.tsx # Global state
└── types/cv.ts           # TypeScript types
```
