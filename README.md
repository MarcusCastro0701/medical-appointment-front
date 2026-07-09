# Medical Appointment Assistant — Frontend

A simple web interface for a conversational LLM system that schedules and manages medical appointments. Users sign up/sign in, chat in natural language with the AI assistant to schedule or cancel appointments, and view their appointments in a dedicated screen.

This is the frontend only. It talks to a separate backend API (LangGraph/LangChain-based conversational agent) that must be running for the app to work.

## Stack

- React 19 + TypeScript
- Vite
- React Router
- styled-components
- Axios

## Running locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure the backend URL:
   ```bash
   cp .env.example .env
   # edit .env if your backend isn't running at http://localhost:3000
   ```
3. Start the backend API separately (see the backend project's own docs/`CLAUDE.md`).
4. Start the dev server:
   ```bash
   npm run dev
   ```

The app will be available at the URL Vite prints (default `http://localhost:5173`).

## Other scripts

- `npm run build` — type-check and build for production
- `npm run preview` — preview the production build locally
- `npm run lint` — run oxlint
