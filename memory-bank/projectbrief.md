# Project Brief: Car Finder

## 1. Core Mission

This project, "Car Finder," is a full-stack web application designed to help users find cars. It will aggregate data by parsing various websites on a regular basis, storing the collected information in a central database for users to browse and search. The name is derived from the git repository URL.

## 2. High-Level Requirements

- **Frontend:** A modern, responsive user interface for searching, viewing, and potentially managing car listings.
- **Backend:** A robust API server to handle user-facing requests, business logic, and communication with the database. It will also include a separate service for regularly scraping car data from external websites.
- **Database:** A persistent data store for car information, user data, and other application-related content.

## 3. Architecture Overview

The project is structured as a TypeScript monorepo, containing separate packages for the client, server, and shared database logic.

- **Client:** A React application built with Vite.
- **Server:** A Node.js application using tRPC for type-safe API routes.
- **Data Layer:** Drizzle ORM is used for database access, with Zod for schema validation.
- **Testing:** The system includes a dedicated end-to-end testing suite.

This brief serves as the foundational document. All other memory bank files will build upon this understanding.
