# Cloud Note App

This project is a simple note-taking application with a React frontend and a Node.js backend.
- Example--> https://cloud-note-app-1.onrender.com/hi (best experience in desktop)
## Overview

**Cloud Note App** provides an effortless way to create and manage notes in the cloud. Key features include:

- **Random Domain Creation**: Instantly generate a unique domain to start taking notes.
- **Custom Domain Support**: Create and access your notes via a personalized domain.
- **Auto-Save Notes**: Notes are automatically saved every 2 seconds to prevent data loss.
- **Domain Deletion**: Easily delete a domain when it's no longer needed.
- 
## Getting Started

To get the application running locally, follow these steps:

### Prerequisites

*   Node.js and npm installed on your machine.

### Running the Application

1.  **Start the Backend Server:**
    *   Navigate to the `backend` directory in your terminal:
        ```bash
        cd path/to/your/project/cloud-note-app/backend
        ```
    *   Install dependencies:
        ```bash
        npm install
        ```
    *   Start the server:
        ```bash
        node server.js
        ```
    The backend server will typically start on `http://localhost:5000`.

2.  **Start the Frontend Development Server:**
    *   Open a new terminal window or tab.
    *   Navigate to the `frontend` directory:
        ```bash
        cd path/to/your/project/cloud-note-app/frontend
        ```
    *   Install dependencies:
        ```bash
        npm install
        ```
    *   Start the React development server:
        ```bash
        npm start
        ```
    The frontend application will open in your default browser, usually at `http://localhost:3000`.


## Project Structure

*   `/backend`: Contains the Node.js/Express server code and the SQLite database (`notes.db`).
*   `/frontend`: Contains the React application created with Create React App.
