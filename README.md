# Portfolio

Personal portfolio site. Next.js + Tailwind.

## Structure

```
src/
├── app/              # Next.js app router
│   ├── about/
│   ├── projects/
│   ├── contact/
│   └── layout.js
├── components/       # Reusable components
└── utils/            # Helpers and constants

public/               # Static assets
├── images/
└── icons/
```

## Setup

```bash
npm install
npm run dev
```

Runs on localhost:3000

## Deploy

Push to main → auto-deploys to Vercel

## Config

- Next.js config: `next.config.js`
- Tailwind: `tailwind.config.js`
- TypeScript: `tsconfig.json`

## Notes

- Using App Router (not Pages Router)
- Tailwind for styling
- Add env vars in Vercel dashboard if needed