# System Patterns: Car Finder

## 1. Architecture: Monorepo

The project utilizes a monorepo structure to manage the frontend, backend, and shared packages in a single repository. This promotes code sharing, simplifies dependency management, and ensures consistency across the entire stack.

- **`client/`**: Contains the React-based user interface.
- **`server/`**: Contains the Node.js backend and API logic.
- **`packages/`**: Holds shared code, such as database schemas (`drizzle/`), validation logic (`zod/`), dedicated service for web scraping tasks ( `scraper/`)

## 2. API Layer: tRPC

Type-safe, end-to-end APIs are implemented using tRPC. This eliminates the need for manual API contract synchronization (like OpenAPI/Swagger) and provides static guarantees that the client and server are always in sync.

- **Routers:** API logic is organized into routers on the server (`server/src/routes/`).
- **Client-side Hooks:** The client consumes tRPC procedures via custom React hooks (`client/src/lib/trpc.ts`), which are built on top of TanStack Query.

## 3. Data Management (Client): TanStack Query

The client uses TanStack Query for all server-state management. This provides a robust framework for data fetching, caching, and synchronization.

- **Query Keys:** A structured keying system is used to manage the query cache.
- **Mutations:** Server-side actions (create, update, delete) are handled via mutations.
- **Error Handling:** Global error handling for queries is implemented to provide consistent user feedback.

## 4. Data Persistence (Server): Drizzle ORM

Drizzle is used as the Object-Relational Mapper (ORM) to interact with the SQL database. It provides a type-safe query builder that aligns well with the TypeScript-first approach.

- **Schema Definition:** Database tables and relations are defined in `packages/drizzle/src/db/schema.ts`.
- **Migrations:** Database schema changes are managed through Drizzle's migration system.

## 5. Schema & Validation: Zod

Zod is the single source of truth for data validation throughout the application. It is used for:

- **Environment Variables:** Validating server and client environment variables.
- **API Inputs:** Ensuring API inputs match the expected schema.
- **Database Schemas:** Can be used to infer types from database schemas.

## 6. Background Processing: Web Scraping with Crawlee

A dedicated background service (`packages/scraper`) will be built using the **Crawlee** framework. This provides a robust, efficient, and low-maintenance solution for data aggregation.

- **Hybrid Scraping:** Crawlee will be configured to use fast HTTP requests for simple sites and automatically escalate to a full headless browser (Playwright) only for complex, JavaScript-heavy sites. This optimizes resource usage.
- **Request Management:** Crawlee's built-in request queue and storage will be used to manage the list of URLs to crawl.
- **Rate Limiting:** The framework's native rate-limiting features (`maxRequestsPerMinute`) will be configured to avoid overloading target servers.
- **Data Processing:** Each crawler will have a dedicated handler to parse the page content (using Cheerio or Playwright's DOM access) and structure the data.
- **Error Handling & Retries:** Crawlee's robust error handling and automatic retry mechanisms will be leveraged to ensure reliability.
