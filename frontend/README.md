# Log Ingestion Frontend

## Overview

This is the frontend component of a full-stack log ingestion and querying system. It provides a user-friendly interface for viewing, filtering, and analyzing logs in real-time.

## Features

- **Dynamic Filtering**: Interface with search inputs, dropdowns, and date pickers for filtering logs by various criteria.
- **Real-Time Updates**: Automatically updates the log list when new logs are ingested or the JSON file is modified, without page refresh.
- **Log Visualization**: Color-coded log levels with appropriate visual cues.
- **Analytics Dashboard**: Bar chart showing log counts by level for the current filtered view.
- **Responsive Design**: Mobile-friendly layout using Tailwind CSS.

## Tech Stack

- **Framework**: React
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Real-Time Communication**: Socket.IO client
- **Charts**: Recharts
- **Development**: ESLint for code quality

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

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
   The app runs on http://localhost:5173 (check console output for exact port).

## Usage

- **Viewing Logs**: Logs are displayed in reverse chronological order.
- **Filtering**: Use the filter bar to search by message, select log levels, enter resource IDs, trace IDs, etc.
- **Date Filtering**: Use timestamp from/to inputs for date range filtering.
- **Analytics**: View the bar chart that updates based on current filters.
- **Real-Time**: New logs appear instantly without manual refresh.

## Design Decisions

- **Framework**: React with hooks for state management and side effects.
- **Build Tool**: Vite for fast development and hot reloading.
- **Styling**: Tailwind CSS for utility-first, responsive design.
- **Real-Time**: Socket.IO client to receive updates from the backend.
- **Charts**: Recharts for simple, React-compatible charting.
- **State Management**: Local React state with useState and useEffect.
- **Error Handling**: Basic error states with user-friendly messages.

## Assumptions

- Backend server is running on http://localhost:5000.
- Modern browser with WebSocket support.
- No authentication required for demo purposes.
