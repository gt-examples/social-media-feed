# Social Media Feed

A social media feed application demonstrating internationalization with General Translation.

**[Live Demo](https://social-media-feed.generaltranslation.dev)** | **[General Translation Docs](https://generaltranslation.com/docs)**

## About

This example app showcases a Twitter/X-style social feed with posts, comments, user profiles, and an explore page — all fully internationalized using GT's translation tools. Every string, from post content to UI labels, is translated across multiple locales.

## GT Features Used

- `<T>` — JSX translation with wide wrapping
- `<Var>` — Dynamic values inside translated content
- `<Num>` — Locale-aware number formatting
- `<DateTime>` — Date/time formatting per locale
- `<Plural>` — Pluralization (likes, comments, shares, posts, followers)
- `<Branch>` — Conditional rendering (post type badges)
- `<LocaleSelector>` — Language picker
- `getGT` — Server-side string translations
- `loadTranslations` — Local translation storage

## Getting Started

```bash
git clone https://github.com/gt-examples/social-media-feed.git
cd social-media-feed
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Built With

- [Next.js](https://nextjs.org)
- [General Translation](https://generaltranslation.com) (gt-next)
- [Tailwind CSS](https://tailwindcss.com)
