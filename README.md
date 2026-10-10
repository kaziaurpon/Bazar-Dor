<div align="center">

# 🛒 বাজার দর (BazarDor)

**প্রয়োজনীয় পণ্যের আজকের দাম এক নজরে**

চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ ও মসলার বাজারদর, দামের ওঠানামা এবং বাজারভিত্তিক তুলনা।

</div>

---

## 📖 Description

**BazarDor** is a fully responsive Bangla web app that shows the daily prices of everyday essentials in Bangladesh.
It reads live data from a public API, highlights which products got more expensive or cheaper today, lets you
browse by category, and (after signing in) compare prices of a product across 12 different bazaars.

## 🧰 Technologies Used

| Purpose | Technology |
| --- | --- |
| Framework | **Next.js 16** (App Router) + **React 19** |
| Language | **TypeScript** |
| Styling | **Tailwind CSS v4** + **DaisyUI 5** |
| Authentication | **Better Auth** (email/password, Google, GitHub) |
| Database | SQLite (local, zero setup) · PostgreSQL (production / Vercel) |
| Notifications | **react-hot-toast** |
| Data source | `https://api.api-store.workers.dev/api/bazardor` |

## ✨ Key Features

1. **Live price ticker** – an infinite scrolling marquee with emoji, name, `টাকা/একক` and ▲/▼ change %.
2. **Smart home page** – hero banner with an anchor CTA, *আজ দাম বেড়েছে ▲* (top 6 risers), *আজ দাম কমেছে ▼* (top 6 fallers) and the full *সব পণ্য* grid, all with Bengali digits.
3. **Category pages with sorting** – numeric sort (*ডিফল্ট / দাম: কম থেকে বেশি / দাম: বেশি থেকে কম*), skeleton loaders and a friendly empty/404 state.
4. **Protected product details** – min / max / average price plus a table of prices from 12 bazaars (cards on mobile, table on larger screens).
5. **Complete authentication** – Better Auth with email + password, Google and GitHub login, toast feedback, protected-route redirects and sign-out.
6. **Profile & update information** – view your profile and change your name through Better Auth's `updateUser`.
7. **Fully responsive** – mobile, tablet and desktop; custom 404 page; no hard 404 when reloading dynamic routes.

## 🚀 Run locally (VS Code)

Requirements: **Node.js 20.9+** (22 LTS recommended) and npm.

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. A `.env.local` file is already included; the SQLite database
(`data/auth.sqlite`) and its tables are created automatically on the first run.

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
| `DATABASE_URL` | Vercel ✅ | PostgreSQL URL (e.g. free Neon / Supabase). Empty = local SQLite |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | optional | Enables Google login |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | optional | Enables GitHub login |

**Google:** Google Cloud Console → APIs & Services → Credentials → *OAuth client ID (Web)*.
Redirect URI: `<BETTER_AUTH_URL>/api/auth/callback/google`

**GitHub:** GitHub → Settings → Developer settings → OAuth Apps → *New*.
Callback URL: `<BETTER_AUTH_URL>/api/auth/callback/github`

> Without these keys the buttons stay visible, and clicking them shows a clear error toast. Email/password login always works.

## ☁️ Deploy on Vercel

1. Push the project to GitHub and import it in Vercel.
2. Create a free PostgreSQL database (Neon / Supabase) and add its URL as `DATABASE_URL`.
3. Add `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL` (your `https://….vercel.app` URL), plus the optional OAuth keys.
4. Deploy. The auth tables are created automatically during the build (`scripts/migrate.mjs`).
5. Add the production callback URLs (see above) in the Google / GitHub consoles.

All dynamic routes (`/category/[slug]`, `/product/[slug]`) are server rendered, so reloading any page works.

## 🗂️ Project structure

```
app/            routes (home, category, product, signin, signup, profile, 404, auth API)
components/     Navbar, Ticker, Hero, ProductCard, forms, skeletons …
lib/            API client, Bengali formatters, Better Auth config, session helpers
scripts/        migrate.mjs – creates the auth tables
```

## 📄 License

Built for learning purposes.
