# TaskFlow Frontend

TaskFlow is a task-management web application built with Next.js, React, TypeScript, and Tailwind CSS. It provides authenticated users with a dashboard for viewing and updating tasks, task creation and detail views, team-member information, and user account details.


## Technology Stack

- Frontend  :Next.js
- Backend   :Express.js
- Database  :MongoDB

- dnd-kit for drag & drop functionality
- live url: http://pmtool.ddnsking.com/

## Prerequisites

- Node.js 20.9 or later
- npm
- A running TaskFlow API that supports the endpoints listed in [Configuration](#configuration)

## Setup

1. Install the dependencies:

   ```bash
   npm install
   ```

2. Create a local environment file. The default API URL is suitable when the backend runs on port `3001`:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

   You can omit this variable when the API is served from the same origin under `/api`.

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

The frontend sends API requests with credentials enabled, so the API must allow credentialed requests and set the `token` cookie used by the route middleware.

## Common Commands

```bash
npm run dev       # Start the development server
npm run lint      # Run ESLint
npm run build     # Create a production build
npm run start     # Serve the production build
```

Run `npm run build` before deploying. A production server must be started with `npm run start` after the build completes.

## Using the Application

1. Open `/signup` and create an account, or sign in at `/login`.
2. Use the dashboard at `/` to review tasks.
3. Select **New task** at `/task` to create a task.
4. Open a task to view or edit its details at `/task/:id`.
5. Drag tasks between board columns to update their status.
6. Open `/team` to view team members.
7. Use the account menu to view your profile, review your tasks, or log out.

All routes except `/login`, `/signup`, and static assets require the `token` authentication cookie. When the API returns `401`, the client redirects to `/login`.

## Configuration

| Variable | Default | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | `/api` | Base URL for the TaskFlow API. The value is exposed to the browser, so do not put secrets in it. |

For a separate local API, set the variable to a URL such as `http://localhost:3001/api`. The API should expose the following routes:

- `POST /auth/login`
- `POST /auth/register`
- `POST /auth/logout`
- `GET /tasks`
- `GET /tasks/:id`
- `POST /tasks`
- `PATCH /tasks/:id`
- `PATCH /tasks/status/:id`
- `DELETE /tasks/:id`
- `GET /users`
- `GET /users/me`
- `GET /users/myTasks`

## Project Structure

```text
app/                  Next.js routes and layouts
components/           Reusable dashboard, task, and user interface components
libs/api/             Axios API client and typed request helpers
middleware/           Authentication route protection
types/                Shared TypeScript models for tasks, users, and notifications
public/               Static assets
```

## Troubleshooting

### The page redirects to `/login`

The API has not provided a valid `token` cookie, or the cookie is not being sent with the request. Confirm that the backend login request succeeds, that the cookie is configured for local development, and that the API allows credentials from `http://localhost:3000`.

### API requests fail with a network error

Check that the backend is running and that `NEXT_PUBLIC_API_URL` points to the correct base URL, including the `/api` path when required. Restart `npm run dev` after changing environment variables.

### The project does not start after dependency changes

Reinstall dependencies and retry:

```powershell
Remove-Item -Recurse -Force node_modules
npm install
npm run dev
```

On macOS or Linux, use `rm -rf node_modules` instead of `Remove-Item`.

## References

- [Next.js documentation](https://nextjs.org/docs)
- [React documentation](https://react.dev/)
- [Axios documentation](https://axios-http.com/docs/intro)
