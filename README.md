# Purdue College Mentors for Kids Database Client

Client application built with NextJS that works with a [custom REST API](https://github.com/bkinaan/purdue-cmfk-database-server?tab=readme-ov-file).

## Current features

### Dashboard

Display member information from the server in a table format. Table UI is bulit from [shadcn/ui](https://ui.shadcn.com/docs/components/data-table) and [lucide react](https://lucide.dev/guide/packages/lucide-react). The information received is based on the current user's primary staff level. Here are the responses:

#### VP of Programming

Receives all the mentors that are on the activity day assigned to the user.

### Upload

Automatically upload a CSV with mentor information to the database. Currently, this only works as an initialization of the database and cannot be used as an update to the database (coming soon).

## What's Coming...

- Automatically upload little buddies from a single CSV file
- Be able to update the database by reuploading a CSV file (only new information will be udpated but the database will remain intact)
- Securely access mentor and little buddy information
- GMs can take attendence automatically set up for their groups
- TOs can check out little buddies automatically set up for their activity day
- Manually make changes to pairing and buddy groups
- Much more...
