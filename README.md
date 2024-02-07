# Purdue College Mentors for Kids Database Client

Client application built with NextJS that works with a [custom REST API](https://github.com/bkinaan/purdue-cmfk-database-server?tab=readme-ov-file).

## Current features

### Dashboard

Display member information from the server in a table format. Table UI is bulit from [shadcn/ui](https://ui.shadcn.com/docs/components/data-table) and [lucide react](https://lucide.dev/guide/packages/lucide-react). The information received is based on the current user's primary staff level.

### Upload

Automatically upload a CSV with mentor information to the database. Currently, this only works as an initialization of the database and cannot be used as an update to the database (coming soon).

### Security

Securely access database server information using JWT required by the server. Every request except for signing up or logging in requires a token administered by the server.

## What's Coming...

- Automatically upload little buddies from a single CSV file
- Be able to update the database by reuploading a CSV file
  - Only new information will be updated but the rest of the database will remain the same
  - Works on an CSV of mentors (complete database or not)
- GMs can take attendence automatically set up for their groups
- Automatically create TO sheets
- Manually make changes to pairing and buddy groups
- Much more...
