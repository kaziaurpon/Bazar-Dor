<div align="center">

# 🛒 বাজার দর (BazarDor)

**প্রয়োজনীয় পণ্যের আজকের দাম এক নজরে**

চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ ও মসলার বাজারদর, দামের ওঠানামা এবং বাজারভিত্তিক তুলনা।

[![Live Demo](https://img.shields.io/badge/Live-Demo-05893e?style=for-the-badge&logo=vercel&logoColor=white)](https://bazar-dor-beryl-five.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06b6d4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

**🔗 [Live Link](https://bazar-dor-beryl-five.vercel.app)** · **📦 [GitHub Repository](https://github.com/kaziaurpon/Bazar-Dor)**

</div>

---

## 📖 Description

**BazarDor** is a fully responsive Bangla web app that shows the daily prices of everyday essentials in Bangladesh.
It reads live data from a public API, highlights which products got more expensive or cheaper today, lets you
browse by category, and (after signing in) compare the price of a product across 12 different bazaars.

Built as **Programming Hero – Assignment 07** from the provided Figma design.

## ✨ Key Features

1. **Live price ticker** – an infinite scrolling marquee with emoji, name, `টাকা/একক` and ▲/▼ change %; it pauses on hover.
2. **Smart home page** – hero banner with an anchor CTA (`#সব-পণ্য`), *আজ দাম বেড়েছে ▲* (top 6 risers), *আজ দাম কমেছে ▼* (top 6 fallers) and the full *সব পণ্য* grid, all with Bengali digits.
3. **Category pages with sorting** – highlighted active category, numeric sort (*ডিফল্ট / দাম: কম থেকে বেশি / দাম: বেশি থেকে কম*), skeleton loaders and a friendly empty/404 state.
4. **Protected product details** – minimum / maximum / average price plus a market-wise price table (cards on mobile, table on larger screens). Visitors who are signed out are redirected to the sign-in page with a toast.
5. **Complete authentication** – Better Auth with email + password, **Google** and **GitHub** login, toast feedback for every success/error, protected-route redirect and sign-out.
6. **Profile & update information** – view your profile and change your name through Better Auth's `updateUser`.
7. **Fully responsive & resilient** – mobile, tablet and desktop layouts, a custom 404 page, and server-rendered dynamic routes so refreshing any page never returns a hard 404.

## 🧰 Technologies Used

| Purpose | Technology |
| --- | --- |
| Framework | **Next.js 16** (App Router) + **React 19** |
| Language | **TypeScript** |
| Styling | **Tailwind CSS v4** + **DaisyUI 5**, Hind Siliguri font |
| Authentication | **Better Auth** (email/password, Google, GitHub, `updateUser`) |
| Database | **PostgreSQL** ([Neon](https://neon.tech)) in production · SQLite locally (zero setup) |
| Notifications | **react-hot-toast** |
| Data source | Programming Hero Bazar Dor API (with automatic fallback endpoints) |
| Hosting | **Vercel** |

## 🔌 API

Primary base URL: `https://openapi.programming-hero.com/api/bazardor`

| Endpoint | Purpose |
| --- | --- |
| `/products` | All products |
| `/products?category=chal` | Products of one category |
| `/products/1` | Single product |
| `/categories` | All categories |
| `/categories/chal` | Single category |

If the primary API is unavailable or rate-limited, the app automatically tries the alternative endpoints
(`api.api-store.workers.dev` and `api.abcz.workers.dev`). Responses are cached for 5 minutes.
You can point the app to any compatible endpoint with the `BAZARDOR_API` environment variable.

## 🚀 Run locally

Requirements: **Node.js 22.5 or newer** (<https://nodejs.org>) — local development uses Node's built-in SQLite, so no extra tools are needed.

```bash
git clone https://github.com/kaziaurpon/Bazar-Dor.git
cd Bazar-Dor
npm install
cp .env.example .env.local
npm run dev
```

Open <http://localhost:3000>. The local SQLite database and the authentication tables are created automatically on the first run.

Production check:

```bash
npm run build
npm start
```

## 🔐 Environment variables

Copy `.env.example` to `.env.local` and fill in what you need.

| Variable | Required | Notes |
| --- | --- | --- |
| `BETTER_AUTH_SECRET` | ✅ | Random string – `openssl rand -base64 32` |
| `BETTER_AUTH_URL` | ✅ | `http://localhost:3000` locally, your live URL in production |
| `DATABASE_URL` | Production ✅ | PostgreSQL URL (e.g. free Neon). Empty = local SQLite |
| `BAZARDOR_API` | optional | Custom API base URL (tried before the defaults) |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | optional | Enables Google login |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | optional | Enables GitHub login |

**Google:** Google Cloud Console → APIs & Services → Credentials → *OAuth client ID (Web application)*.
Authorized redirect URI: `<BETTER_AUTH_URL>/api/auth/callback/google`

**GitHub:** GitHub → Settings → Developer settings → OAuth Apps → *New OAuth App*.
Callback URL: `<BETTER_AUTH_URL>/api/auth/callback/github`

> Email/password sign-in works without any social keys. Without them, clicking a social button shows a clear error toast.

## ☁️ Deploy on Vercel

1. Push the project to GitHub and import it in Vercel.
2. Create a free PostgreSQL database (Neon) and add its connection string as `DATABASE_URL`.
3. Add `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL` (your `https://….vercel.app` URL), plus the optional OAuth keys.
4. Deploy. The authentication tables are created automatically (`scripts/migrate.mjs`).
5. Add the production callback URLs (see above) in the Google / GitHub consoles.

All dynamic routes (`/category/[slug]`, `/product/[slug]`) are server rendered, so reloading any page works.

## ✅ Assignment requirements covered

| Requirement | Status |
| --- | --- |
| Navbar with logo, Bangla date, category links, active state, auth buttons / profile | ✅ |
| Infinite price ticker (marquee) | ✅ |
| Hero with eyebrow, heading, subtitle, anchor CTA and banner image | ✅ |
| Top 6 risers, top 6 fallers, all products grid with Bengali digits | ✅ |
| Category page with sort (numeric), skeleton loader and empty state | ✅ |
| Protected product details with min / max / average and market-wise prices | ✅ |
| Sign in / Sign up with email, Google and GitHub + toasts | ✅ |
| Profile page and *Update information* (`updateUser`) | ✅ |
| Custom 404 page and reload-safe dynamic routes | ✅ |
| Responsive on mobile, tablet and desktop | ✅ |
| Deployed on Vercel · 8+ meaningful Git commits | ✅ |

## 🗂️ Project structure

```
app/            routes (home, category, product, signin, signup, profile, 404, auth API)
components/     Navbar, Ticker, Hero, ProductCard, forms, skeletons …
lib/            API client, Bengali formatters, Better Auth config, session helpers
scripts/        migrate.mjs – creates the auth tables
public/         hero banner and logo assets
```

## 👤 Author

**Kazi Sajedul Mahbub Arpon** – [@kaziaurpon](https://github.com/kaziaurpon)

## 📄 License

Built for learning purposes.