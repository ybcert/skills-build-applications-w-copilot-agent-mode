# Octofit Tracker Frontend

The React presentation tier uses Vite and React Router for navigation. It expects the backend to be available at a Codespaces URL when running in GitHub Codespaces.

## Required environment variable

Create a local environment file such as `.env.local` and define:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is defined, the app will request data from:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

If `VITE_CODESPACE_NAME` is unset, the app falls back to `http://localhost:8000` so local development still works.

## Available routes

- `/` — Users
- `/teams` — Teams
- `/activities` — Activities
- `/leaderboard` — Leaderboard
- `/workouts` — Workouts
