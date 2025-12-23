# Log Ingestion and Querying System

## Overview

This is a full-stack application for ingesting and querying logs, built as a take-home assessment. It consists of a Node.js backend for log ingestion and querying, and a React frontend for viewing and filtering logs.

The backend uses Express.js and persists data in a JSON file. The frontend uses React with Tailwind CSS for styling.

## Features

- **Log Ingestion**: POST endpoint to ingest logs with required fields (level, message, resourceId, timestamp, traceId, spanId, commit, metadata).
- **Log Querying**: GET endpoint with filtering by level, message (full-text search), resourceId, timestamp range, traceId, spanId, commit.
- **Frontend**: Dynamic filtering interface with search, dropdowns, and inputs. Visual cues for log levels. Reverse chronological display.
- **Real-Time Updates**: New logs are pushed to the frontend in real-time using WebSockets (Socket.IO).
- **Analytics Dashboard**: Bar chart showing log counts by level for the current filtered view.

## Tech Stack

- **Backend**: Node.js, Express.js, Socket.IO, JSON file persistence.
- **Frontend**: React, Vite, Tailwind CSS, Axios, Socket.IO client, Recharts.

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm

### Backend Setup

1. Navigate to the backend directory:

   ```
   cd backend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```
   The server runs on http://localhost:5000.

### Frontend Setup

1. Navigate to the frontend directory:

   ```
   cd frontend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```
   The app runs on http://localhost:5174 (or similar, check the console output).

### Running Both Servers

To run the full application:

1. Open two terminal windows.
2. In one terminal, follow the backend setup steps above.
3. In the other terminal, follow the frontend setup steps.
4. Access the application at http://localhost:5174.

## Usage

- **Ingest Logs**: Send POST requests to http://localhost:5000/logs with JSON body matching the schema.
- **Query Logs**: Use the frontend interface or GET http://localhost:5000/logs with query params.
- **Real-Time**: New logs ingested will appear instantly in the UI without refresh.

## API Endpoints

- `POST /logs`: Ingest a log entry.
- `GET /logs`: Query logs with optional filters (level, message, resourceId, timestampFrom, timestampTo, traceId, spanId, commit).

## Design Decisions

- **Backend Framework**: Chose Express.js for its simplicity and wide adoption in Node.js applications. It provides robust routing and middleware support without unnecessary complexity.
- **Data Persistence**: Used a JSON file for simplicity and to meet the assessment requirements. This avoids the need for a database setup, making the project easier to run locally. Trade-off: JSON files are not suitable for high-volume production use due to lack of concurrency control and performance issues with large files. For a real-world application, a database like MongoDB or PostgreSQL would be preferred.
- **Filtering Logic**: Implemented server-side filtering in `filterLogs.js` using JavaScript array methods. This ensures efficient querying without relying on external libraries. Trade-off: For very large datasets, this could be slow; in production, a database with indexing would be better.
- **Frontend Framework**: Selected React with Vite for fast development and hot reloading. Vite provides quick build times compared to Create React App.
- **Styling**: Used Tailwind CSS for utility-first styling, allowing rapid UI development with responsive design. Trade-off: Inline styles can make the code verbose, but it ensures consistency and avoids CSS conflicts.
- **Real-Time Updates**: Integrated Socket.IO for WebSocket communication to push new logs to the frontend instantly. This enhances user experience without polling. Trade-off: Adds complexity to the architecture; for simpler apps, polling might suffice.
- **Analytics**: Added a bar chart using Recharts to visualize log levels. Kept it simple and integrated with the filtering system. Trade-off: Recharts is lightweight but less customizable than D3.js; chosen for ease of use.
- **Validation**: Basic required field checks on POST requests. Did not use a full schema validation library like Joi to keep dependencies minimal. Trade-off: Less robust validation; in production, proper schema validation would be essential.
- **Testing**: Included Jest for unit tests with Babel for ES module support. Focused on key functions like filtering and validation. Trade-off: Not comprehensive end-to-end testing; sufficient for this assessment scope.
- **Architecture**: Separated concerns with MVC-like structure (routes, controllers, utilities). This improves maintainability. Trade-off: Overkill for a small project, but good practice.

## Assumptions

- Timestamps are in ISO 8601 format.
- Metadata is a JSON object.
- No authentication or authorization required, as this is a demo system.
- Single JSON file is sufficient for demo purposes; no need for database migration or backup strategies.
- The system runs on a single machine; no distributed deployment considerations.
- Log levels are limited to the standard set (error, warn, info, debug).
- Users will ingest logs via API; no direct file upload interface.
- The frontend assumes a modern browser with WebSocket support.
