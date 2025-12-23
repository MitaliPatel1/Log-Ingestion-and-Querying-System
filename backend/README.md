# Log Ingestion Backend

## Overview

This is the backend component of a full-stack log ingestion and querying system. It provides RESTful APIs for ingesting logs and querying them with various filters. Data is persisted in a JSON file for simplicity.

## Features

- **Log Ingestion**: POST endpoint to ingest logs with validation for required fields (level, message, resourceId, timestamp, traceId, spanId, commit, metadata).
- **Log Querying**: GET endpoint with filtering by level, message (full-text search), resourceId, timestamp range, traceId, spanId, commit.
- **Real-Time Updates**: Uses Socket.IO to push new log notifications to connected clients.
- **File Watching**: Automatically detects changes to the logs JSON file and notifies clients for real-time UI updates.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Real-Time Communication**: Socket.IO
- **Data Persistence**: JSON file
- **Development**: Nodemon for auto-restart

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

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

## Log Data Schema

The log entries must conform to the following JSON schema:

- `level` (string, required): Log level (error, warn, info, debug)
- `message` (string, required): Log message
- `resourceId` (string, required): Resource identifier
- `timestamp` (string, required): ISO 8601 timestamp
- `traceId` (string, required): Trace identifier
- `spanId` (string, required): Span identifier
- `commit` (string, required): Commit hash
- `metadata` (object, required): Additional metadata as JSON object

## API Endpoints

### POST /logs

Ingests a single log entry and persists it to the JSON file database.

- **Body**: A single JSON object that strictly conforms to the Log Data Schema (level, message, resourceId, timestamp, traceId, spanId, commit, metadata).
- **Status**: 201 Created. Body: The log object that was successfully created and stored.
- **Status**: 400 Bad Request if the request body is missing, malformed, or fails schema validation.
- **Status**: 500 Internal Server Error for any other server-side failure during processing or persistence.

### GET /logs

Retrieves a list of log entries. This endpoint must support filtering based on the provided query parameters. All filters should be combinable (i.e., work together using AND logic).

- **Query Parameters** (all optional):
  - `level` (string)
  - `message` (string, for full-text search)
  - `resourceId` (string)
  - `timestamp_start` (ISO 8601 string)
  - `timestamp_end` (ISO 8601 string)
  - `traceId` (string)
  - `spanId` (string)
  - `commit` (string)
- **Status**: 200 OK. Body: A JSON array of log objects that match all applied filter criteria. The array should be sorted in reverse chronological order by timestamp. If no logs match, an empty array `[]` should be returned.
- **Status**: 500 Internal Server Error for any server-side failure during data retrieval or filtering.

## Design Decisions

- **Framework Choice**: Express.js for its simplicity and middleware ecosystem.
- **Data Storage**: JSON file for easy setup and demo purposes. Not suitable for production with high concurrency.
- **Validation**: Basic field validation in controllers. Uses standard JavaScript for minimal dependencies.
- **Real-Time**: Socket.IO for WebSocket communication to enable instant UI updates.
- **File Watching**: Node's fs.watch for detecting manual JSON file changes.
- **Architecture**: MVC-like structure with separate routes, controllers, and utilities for maintainability.

## Assumptions

- Timestamps are in ISO 8601 format.
- Metadata is a JSON object.
- No authentication required for demo purposes.
- Single JSON file sufficient for assessment scope.</content>
  <parameter name="filePath">d:\MyWork\log Ingestion\backend\README.md
