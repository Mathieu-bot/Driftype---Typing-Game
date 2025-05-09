# Driftype Game

## Introduction
A modern typing game built with HTML, CSS, and Vanilla JavaScript. Features include user authentication (including Google Sign-In), typing statistics tracking, and a beautiful UI design.

## Features
- User authentication (Email/Password and Google Sign-In)
- Real-time typing speed measurement
- Statistics tracking
- Modern UI with Tailwind CSS
- A responsive landing page

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL database

### Frontend Setup
1. Clone the repository
2. Install Live Server extension in VS Code

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   npm install
   ```

2. Create `.env` file from `.env.example` and configure:
   - Database credentials
   - JWT secret
   - SMTP settings for email
   - Google OAuth credentials
   - Frontend URL
   - SSL use or not

3. Set up the database:
   - Create a database in PostgreSQL 
   - Use the SQL commands in `backend/src/utils/database.sql`
   - Execute them in your PostgreSQL database

4. Start the backend server:
   ```bash
   npm run dev
   ```

### IF YOU WNAT TO RUN IT IN ONE COMMAND
```bash
   npm run start
   ```
That's gonna run everything together

   

## Google Sign-In Configuration
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized origins:
   ```
   http://localhost:5500
   http://127.0.0.1:5500
   ```
6. Add authorized redirect URIs:
   ```
   http://localhost:5500/src/components/pages/login.html
   http://127.0.0.1:5500/src/components/pages/login.html
   ```
7. Copy credentials to your environment files

## Development
Use VS Code with Live Server for frontend development. The backend will run on http://localhost:3000.

