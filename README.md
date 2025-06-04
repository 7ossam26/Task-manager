# Task Manager

A simple and efficient task management application built with React. This application helps users organize and track their daily tasks effectively.

## Features

*   **Add Tasks**: Easily add new tasks to your to-do list.
*   **Mark as Complete/Incomplete**: Toggle the completion status of tasks.
*   **Delete Tasks**: Remove tasks that are no longer needed.
*   **Persistent Storage**: Tasks are saved in local storage, so they persist across browser sessions.

## Technologies Used

*   **React**: A JavaScript library for building user interfaces.
*   **Vite**: A fast build tool and development server for modern web projects.
*   **JavaScript (ES6+)**: The primary programming language.
*   **HTML5 & CSS3**: For structuring and styling the application.
*   **React Context API & useReducer**: For state management across the application.
*   **Local Storage**: For persisting task data in the browser.

## Project Structure

The project follows a structured organization to enhance maintainability and scalability, as previously discussed:

```
Task-manager/
├── public/
│   └── vite.svg
├── src/
│   ├── app/
│   │   ├── App.jsx               # Main application component
│   │   ├── main.jsx              # Entry point of the application
│   │   ├── Contexts/
│   │   │   └── TodosContext.jsx  # Context for managing todos
│   │   └── reducers/
│   │       └── TodoReducer.jsx   # Reducer for todo state logic
│   ├── assets/
│   │   └── react.svg             # Static assets
│   ├── components/
│   │   ├── Todo.jsx              # Component for individual todo item
│   │   └── TodoList.jsx          # Component for displaying the list of todos
│   └── styles/
│       ├── App.css               # Styles for App.jsx
│       └── index.css             # Global styles
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
└── vite.config.js
```

## Installation

To get a local copy up and running, follow these steps:

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/7ossam26/Task-manager.git 
    cd Task-manager
    ```
    (If this is not your repository URL, please update it accordingly.)

2.  **Install dependencies:**
    Using npm:
    ```sh
    npm install
    ```
    Or using yarn:
    ```sh
    yarn install
    ```

## Getting Started / Running the Application

To start the development server:

Using npm:
```sh
npm run dev
```
Or using yarn:
```sh
yarn dev
```

This will typically start the application on `http://localhost:5173`. Open this URL in your web browser to view the app.
