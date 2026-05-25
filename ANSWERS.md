# ANSWERS

## How to run

Prereqs: install Node.js 20+ and npm.

1) Install backend dependencies

```
cd Backend
npm install
```

2) Install frontend dependencies

```
cd ..\Frontend
npm install
```

3) Run both servers (Windows)

```
run-dev.bat
```

Or run them in two terminals:

```
cd Backend
npm run dev
```

```
cd Frontend
npm run dev
```

Backend API: http://localhost:3000/api
Frontend: http://localhost:5173

## Stack choice

I used React + Vite for a fast dev loop and component-driven UI, and Express + SQLite for a minimal backend with persistence. A worse choice here would be a heavier full-stack framework (like a server-rendered SSR app) because the app is small, local-first, and does not need complex routing or server-side rendering.

## One real edge case

The order API returns a 400 if the client sends an empty items array, preventing invalid orders. See the guard in [Backend/routes/order/index.ts](Backend/routes/order/index.ts#L44-L47). Without this, empty orders would be inserted, leading to meaningless records and confusing totals.

## AI usage

- GitHub Copilot: asked for help wiring an Orders table and API routes; it suggested a simple SQLite table and list/add endpoints, which I then adapted.
- GitHub Copilot: asked to update the Cart page to post orders and clear local storage; it produced a draft handler that I modified.
- GitHub Copilot tools: used file reads and patches to apply the changes.

One concrete change: I adjusted the AI-generated order handler to compute the order total server-side (not just trust the client), so the backend remains authoritative. That logic is in [Backend/routes/order/index.ts](Backend/routes/order/index.ts#L49-L52).

## Honest gap

There is no authentication or admin protection, so anyone can create or view orders. With another day, I would add a basic auth layer (JWT or session-based) and restrict order and food admin routes on both backend and frontend.
