# About SpeakUp

SpeakUp is a modern student safety and support platform designed for a university community. It provides students with a secure and confidential way to report incidents, access resources, receive notifications, and communicate with approved support personnel. At the same time, it gives administrators a dedicated workspace to manage cases, respond to student requests, oversee conversations, and publish educational materials.

## Purpose and Audience

The platform is built for two main audiences:

- Students: who need a safe place to report incidents, ask for help, and find resources.
- Administrators: who need tools to receive, review, assign, and resolve reports, as well as manage support content and communications.

SpeakUp is focused on promoting transparency, confidentiality, and quicker resolution of student concerns.

## What the App Does for Students

Students sign in to a personalized portal where they can:

- Submit incident reports using either a full, detailed report form or a quick report for faster intake.
- Track the status of submitted reports through a My Reports page and view detailed report history.
- Start or continue conversations with support staff, including support chats, counseling chats, and report-based conversations.
- Access curated safety resources grouped by topic to help them understand their options and find support.
- View notifications about case updates and platform announcements.
- Reach emergency contacts quickly from an emergency help page.
- Find answers in FAQ content and review the platform privacy policy.
- Learn about the project, contact support, and adjust their settings.

Students can choose to submit reports anonymously where applicable, while still benefiting from the platform’s case tracking and support features.

## What the App Does for Administrators

Administrators use a separate admin portal with tools for:

- Viewing an admin dashboard that summarizes open reports, assigned cases, resolved incidents, and confidential submissions.
- Managing all student reports with search, filter, and view toggles for full reports and quick reports.
- Inspecting report details, updating statuses, and assigning cases to support personnel.
- Handling chat conversations from students, claiming unassigned chats, and replying to active support or report-related conversations.
- Managing resources by creating, editing, publishing, and organizing support materials by category.
- Reviewing audit tracking summaries and system activity for accountability.
- Accessing profile and system settings to verify account details and confirm the platform’s active features.

The admin experience is designed to help support staff respond efficiently, coordinate work, and keep sensitive information secure.

## User Interface and Experience

SpeakUp is built with React and uses Tailwind CSS for a polished and responsive interface. The user experience emphasizes clarity and accessibility:

- Clean panels and cards for displaying data and actions.
- Prominent quick actions on the student home page for reporting, emergency assistance, chat, and resources.
- A hero section and bulletin board to show important announcements and safety tips.
- Tabbed and filtered views for chat and report management so admins can focus on assigned, unassigned, or all cases.
- Forms with clear field labels, dropdowns, and concise guidance for submitting reports and resources.
- A mobile-friendly layout that supports both compact and full-screen workflows.

Reusable UI components such as buttons, forms, modals, notification dropdowns, and toast messages create a consistent experience across both student and admin sections.

## How the App Works

SpeakUp operates as a single-page application with role-based routing and API-backed data flows:

- Authentication and role lookup are handled in the app context, enabling protected routes for student and admin shells.
- Public pages allow users to log in, register, recover passwords, and verify email addresses.
- Once authenticated, users are directed to either the student or admin section based on their role.
- The frontend calls backend endpoints through reusable API service modules, such as `reportService`, `chatConversationService`, `notificationService`, and `resourceService`.
- Student actions like creating a report or starting a chat trigger API requests and update the interface when the server returns new data.
- Admin actions like assigning chats, resolving reports, and publishing resources also happen through service calls and refresh the displayed data.

The app relies on secure JWT authentication and role-based access control to keep student information and administrative workflows separated.

## Key Technical Components

- React + TypeScript for component-driven UI and strong typing.
- Vite as the application bundler and development server.
- Tailwind CSS for styling and responsive layout.
- Axios for HTTP requests to backend APIs.
- React Router for navigation and protected route handling.
- Custom reusable components for cards, buttons, dialogs, forms, notifications, chat windows, and report forms.

The project structure separates concerns clearly: API services live in `src/api`, UI components in `src/components`, page-level routes in `src/pages`, and application state in `src/context`.

## Overall Vision

SpeakUp is more than a reporting tool; it is a safety platform designed to support students through confidential reporting, real-time communication, and resource access. It aims to bridge students and authorized support staff, helping build a safer campus environment.

For administrators, SpeakUp offers visibility, organization, and accountability, making it easier to manage sensitive cases and respond to student needs with confidence.
