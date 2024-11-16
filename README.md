# Erino Project

## Description

A simple contact management app with a React frontend using Material-UI (MUI) and a Hono backend. The database is PostgreSQL hosted by Neon, suitable for serverless platforms like Cloudflare.

## Setup Instructions

### Prerequisites

- Node.js
- PostgreSQL database (Neon)

### Database Setup

1. Create a Neon PostgreSQL database and obtain the URL.
2. Add the URL to `seed.js` in the `src` directory.
3. Initialize the database:
    ```bash
    node src/seed.js
    ```

### Backend Setup

1. Navigate to the backend directory:
     ```bash
     cd backend
     ```
2. Add the database URL to `index.js`.
3. Install dependencies:
     ```bash
     npm install
     ```
4. Start the server:
     ```bash
     npm run dev
     ```

### Frontend Setup

1. Navigate to the `frontend-erino` directory:
     ```bash
     cd frontend-erino
     ```
2. Install dependencies:
     ```bash
     npm install
     ```
3. Start the server:
     ```bash
     npm run dev
     ```

## Technical Overview

### Major Decisions

- **Frontend**: React with MUI for styling.
- **Backend**: Hono for efficiency and serverless deployment.
- **Database**: PostgreSQL by Neon, optimized for serverless platforms.

### Functionality

- **Contact Management**: Save, display, edit, and delete contacts.
- **Serverless Deployment**: Backend deployable to Cloudflare serverless.

### How It Works

- **Frontend**: React app communicates with the backend via API calls. MUI ensures consistent styling.
- **Backend**: Hono handles API requests and CRUD operations on the PostgreSQL database.
- **Database**: PostgreSQL by Neon stores contact information securely, optimized for serverless environments.

## Challenges Faced

The complexity of the project was relatively low, so no major challenges were encountered. However, I had not used Material-UI (MUI) before, so working with it required some additional effort. I had to spend time Googling and reading the MUI documentation to understand how to effectively use it for styling the frontend components.
