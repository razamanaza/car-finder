# Technical Context: Car Finder

## 1. Core Technologies

- **Language:** TypeScript
- **Runtime:** Node.js (for the server and scraper)
- **UI Framework:** React
- **API:** tRPC
- **Database ORM:** Drizzle
- **Schema Validation:** Zod

## 2. Frontend (`client/`)

- **Build Tool:** Vite
- **State Management:** TanStack Query (for server state)
- **Routing:** TanStack Router
- **UI Components:** Shadcn UI (indicated by `components.json`)
- **Styling:** Tailwind CSS (inferred from typical Shadcn UI setup)
- **Linting:** ESLint

## 3. Backend (`server/`)

- **Framework:** Fastify
- **Authentication:** Better auth library, managed in `server/src/lib/auth.ts`.
- **Database Driver:** A suitable driver for the chosen SQL database (e.g., `pg`, `mysql2`).

## 4. Scraper Service (`packages/scraper`)

- **Core Framework:** **Crawlee** will be the primary framework for all scraping tasks.
- **Dependencies:** The scraper package will include `crawlee`, `playwright` (for headless browser support), and `cheerio` (for fast static parsing).
- **Scheduling:** The scraping jobs will be initiated via a simple entry point script, which can be executed by a system cron job or run manually. Crawlee manages the internal scheduling of requests.

## 5. Shared Packages (`packages/`)

- **`drizzle/`**: Contains Drizzle ORM setup, schema, and migration configurations.
- **`zod/`**: Contains shared Zod schemas for consistent validation across the stack.

## 6. Development Setup

- **Package Manager:** `npm` (inferred from `package-lock.json`)
- **Monorepo Management:** Likely `npm` workspaces, configured in the root `package.json`.
- **Environment Variables:** Each part of the application (`client`, `server`, `scraper`) will have its own `.env` file.

## 7. Tooling

- **Code Formatting:** Prettier (`.prettierrc`)
- **Testing:** A dedicated `tests-e2e/` directory suggests an end-to-end testing framework like Playwright or Cypress is intended to be used.
