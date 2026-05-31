# PolicyCompare Frontend

A React + Vite + TypeScript UI for comparing up to 4 policy documents side-by-side.

## Setup

1. Copy environment values from `.env.example` to `.env`.
2. Install dependencies:

```bash
cd frontend
npm install
```

3. Run development server:

```bash
npm run dev
```

4. Open the app in the browser at `http://localhost:5173`.

## Notes
- The frontend expects a backend API at `VITE_API_URL`.
- Use the Policy List page to select policies, then compare them side-by-side.
