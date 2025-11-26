# Task Manager

A full-stack task management application built with React, Netlify Functions, and MongoDB. Features a modern, responsive interface with complete CRUD operations and serverless backend architecture.

## Live Demo

**[View Live Application](https://amazing-lokum-5d1160.netlify.app)**

## Screenshots

_[Add screenshots here of your app - home page, completed tasks view, etc.]_

## Features

- **Create Tasks** - Add new tasks with a clean, intuitive interface
- **Edit Tasks** - Update task details on the fly
- **Complete Tasks** - Mark tasks as done and view them separately
- **Delete Tasks** - Remove tasks you no longer need
- **Persistent Storage** - All data stored in MongoDB Atlas
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Serverless Backend** - Powered by Netlify Functions for scalability

## Tech Stack

**Frontend:**
- React with React Router for navigation
- CSS Modules for component-scoped styling
- Modern ES6+ JavaScript

**Backend:**
- Netlify Functions (serverless Node.js)
- MongoDB Driver for database operations
- RESTful API architecture

**Database:**
- MongoDB Atlas (cloud-hosted)

**Deployment:**
- Netlify (frontend + functions)
- Environment variable configuration for secure DB access

## Architecture

```
Client (React) 
    ↓
Netlify Functions (Serverless API)
    ↓
MongoDB Atlas (Database)
```

The application uses a serverless architecture where:
- React handles the UI and client-side routing
- Netlify Functions serve as API endpoints (CORS-enabled)
- MongoDB Atlas provides persistent cloud storage

## API Endpoints

- `GET /api/tasks` - Fetch all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update an existing task
- `DELETE /api/tasks/:id` - Delete a task

## Installation & Local Development

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/JustinLee9/Task-Manager.git
cd Task-Manager
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:
```
MONGODB_URI=your_mongodb_connection_string
```

4. **Run locally**

```bash
# Start Netlify Dev (runs both frontend and functions)
netlify dev
```

The app will be available at `http://localhost:8888`

### Building for Production

```bash
npm run build
```

## Deployment

The app is configured for Netlify deployment:

1. Connect your GitHub repository to Netlify
2. Set environment variables in Netlify dashboard:
   - `MONGODB_URI` - Your MongoDB connection string
3. Deploy! Netlify will automatically build and deploy

Build settings:
- Build command: `npm run build`
- Publish directory: `build`
- Functions directory: `netlify/functions`

## Project Goals & Achievements

This project successfully demonstrates:
- Building a full-stack application with serverless architecture
- Implementing complete CRUD operations with MongoDB
- Managing async state and API calls in React
- Deploying serverless functions with Netlify
- Handling CORS in a production environment
- Configuring environment variables for secure deployment
- Creating a responsive, user-friendly interface

## Security

- MongoDB connection string stored as environment variable
- CORS enabled only for necessary origins
- No sensitive data exposed in client-side code

## Author

**Justin Lee**
- GitHub: [@JustinLee9](https://github.com/JustinLee9)
- Portfolio: [justinlee.vercel.app](https://justinlee.vercel.app)

---

If you found this project helpful, please consider giving it a star!


