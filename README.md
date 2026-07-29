# Frontend Documentation

This project is the frontend for the SpeakUp application. It is a React and TypeScript web app that helps students and admins manage reports, resources, notifications, and chat in a simple and organized way.

## 1. What this frontend does

The frontend is the part of the product that users see and interact with. It handles:

- user login, signup, email verification, and password reset
- student pages for reports, resources, notifications, FAQs, privacy, about, contact, and settings
- admin pages for dashboards, reports, audit logs, resources, settings, and chat
- role-based access so students and admins see the correct pages
- API communication with the backend
- session handling so the user stays signed in while the browser is open

## 2. Main architecture

The app uses a clear, layered structure:

- entry point: the app starts from the main file and mounts into the browser
- routing: page navigation is handled by React Router
- layouts: student and admin sections use different layout wrappers
- shared state: global app data is stored in a context provider
- services: backend requests are grouped into service files
- UI components: reusable pieces such as buttons, cards, forms, and modals are kept separate

### How the app flows

1. The browser loads the app.
2. The main file wraps the app in React Router and the global app provider.
3. The router checks the requested URL and shows the correct page.
4. If the page is protected, the app checks the user role first.
5. The page may call an API service to get or send data.
6. The result is shown to the user, and the app updates the UI.

## 3. Main tools and libraries

This frontend uses the following tools:

- React for building the interface
- TypeScript for stronger typing and fewer runtime errors
- Vite for fast development and build handling
- React Router for page navigation
- Tailwind CSS for styling and layout
- Axios for HTTP requests
- Framer Motion for small UI animations
- Lucide React for icons
- Supabase JavaScript client for possible backend-related integrations

## 4. Why these tools were chosen

### React

React was chosen because it makes it easier to build reusable components and manage dynamic content.

### TypeScript

TypeScript was chosen to make the code easier to maintain and to catch mistakes earlier during development.

### Vite

Vite was chosen because it is fast and simple. It gives a smooth development experience and helps the app build quickly.

### React Router

React Router was chosen because the app has many pages and different user roles. It keeps navigation organized and easy to manage.

### Tailwind CSS

Tailwind CSS was chosen because it allows fast styling without much custom CSS. It also helps keep the design consistent across pages.

### Axios

Axios was chosen because it simplifies API requests and makes it easier to add shared settings like authentication headers.

## 5. Folder structure

The project is organized in a way that keeps the code easy to follow.

- src/pages: all page-level screens
- src/components: reusable UI and layout components
- src/context: shared state and app-wide logic
- src/api: backend service files and API helpers
- src/types: shared TypeScript types
- src/utils: helper functions for auth, formatting, and theme behavior
- public: static files such as images

This structure helps separate screens, reusable UI, and logic so the project stays easier to maintain.

## 6. Important parts of the app

### Entry point

The app starts in the main file, where React is mounted into the DOM. It also sets up the router and global provider.

### App routing

The main App.tsx file contains the route definitions. Public pages, student pages, and admin pages are separated clearly.

### Protected routes

Some pages are only available to certain users. These routes are wrapped in a protected layout layer that checks the user role before the page is shown.

### Global app context

The app context stores shared information such as:

- the current user
- the user role
- theme settings
- login and logout logic
- toast notifications

This keeps important data available across the app without repeating the same logic in every page.

### API layer

The shared API setup is placed in the API folder. It centralizes request configuration, making it easier to attach authentication tokens and keep API logic consistent.

## 7. Why the app uses a shared API setup

A shared API setup was chosen instead of placing request code directly inside each page because it is cleaner and easier to maintain.

This approach helps:

- keep authentication logic in one place
- reduce repeated code
- make backend changes easier
- keep pages focused on displaying content and handling user actions

## 8. Why the app uses context instead of passing props everywhere

The app uses context for shared data such as the current user, theme, and notifications.

This was chosen instead of passing props through many components because it:

- reduces prop drilling
- keeps shared state easier to manage
- makes the app structure cleaner
- helps avoid repetitive code

## 9. Why the project uses role-based routing

The app has different experiences for students and admins. Because of that, it uses role-based routing.

This was chosen because it:

- improves security
- prevents users from seeing pages they should not access
- makes the app behavior clearer for each role

## 10. How the authentication flow works

The authentication flow is simple:

1. The user enters their email and password on the login page.
2. The login request is sent to the backend.
3. If successful, the app saves the token and user information in session storage.
4. The app updates the global context with the logged-in user.
5. The user is redirected to the correct page based on their role.

This keeps the login state available throughout the app while still being tied to the browser session.

## 11. How the UI is organized

The interface is split into reusable parts:

- layout components for the student and admin shell
- page components for each screen
- UI components for buttons, cards, forms, modals, and notifications

This makes the app easier to build and easier to update later.

## 12. Development workflow

To run the app locally, use:

- npm install
- npm run dev

To build the app for production, use:

- npm run build

The linting step is also available through:

- npm run lint

## 13. Notes about the current setup

The project currently uses a local backend URL in the API config. In the future, this can be moved to an environment variable so it is easier to switch between local development and production.

## 14. Summary

This frontend is designed to be simple, organized, and role-based. It separates pages, layouts, shared state, and API logic so the project can grow without becoming hard to manage.
