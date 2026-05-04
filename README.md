## Astro Night

Movie library web application to manage your personal collection.

## Features

- View movies
- Search by title
- Filter by genres
- Sort by rating or other fields
- Add, edit, delete movies

## Tech Stack

- Next.js (App Router)
- TypeScript
- Redux Toolkit
- Redux-Saga
- JSON Server (mock API)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Setup environment variables

Create `.env.local` file:

```env
NEXT_PUBLIC_DB_URL=http://localhost:4000
```

or rename `.env.example`

(also you can edit server local port in package.json or run it by yourself: npx json-server src/app/api/db.json --port 4000)

### 3. Run json and development server:

```bash
npm run server
npm run dev
```

## Project Structure

    src
    ├── app
    │   ├── api     # Api layer
    │   └── (pages) # App Router pages
    ├── components  # UI components
    ├── lib         # hooks, store...
    ├── models      # constants, types, slices, etc...
    └── styles      # SCSS global styles
