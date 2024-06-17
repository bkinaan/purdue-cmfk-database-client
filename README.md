# Purdue College Mentors for Kids Database Client

Client application built with NextJS that works with a [custom REST API](https://github.com/bkinaan/purdue-cmfk-database-server?tab=readme-ov-file).

## Features

### Sign up/Log in

Mentors can create an account to access the database. This gives them complete control over all other mentors and buddies.

### Dashboard

Display server information information from the server in a table format. Table UI is bulit from [shadcn/ui](https://ui.shadcn.com/docs/components/data-table) and [lucide react](https://lucide.dev/guide/packages/lucide-react). There are three tables on the dashboard: mentor, buddy and pairs. Mentors are created by using the sign up page while buddies are created on the dashboard page within a mentor account. The pairs table is a report created from paired mentors and buddies. The pairs report is created automatically when mentors and buddies are linked. The user is also able to filter pairs based off of school and/or grade level of buddies.

### Security

Securely access database server information using a valid JWT required by the server. Every request except for signing up or logging in requires a token administered by the server.
