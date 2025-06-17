# Task Manager API

A simple Node.js REST API for managing tasks, built with Express and using in-memory storage.

## Overview

This API allows you to create, read, update, and delete tasks. Each task has an `id`, `title`, `description`, `completed` status, and `priority`.

## Setup Instructions

1. **Clone the repository:**
    ```bash
    git clone <repo-url>
    cd task-manager-api-Govindkm
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Start the server:**
    ```bash
    npm start
    ```
    The API will run on `http://localhost:3000` by default.

4. **Ensure `task.json` exists in the project root with a structure like:**
    ```json
    {
      "tasks": []
    }
    ```

## API Endpoints

### Get All Tasks

- **Endpoint:** `GET /tasks`
- **Description:** Returns all tasks.
- **Test with curl:**
  ```bash
  curl http://localhost:3000/tasks
  ```

### Get Task by ID

- **Endpoint:** `GET /tasks/:id`
- **Description:** Returns a single task by its ID.
- **Test with curl:**
  ```bash
  curl http://localhost:3000/tasks/1
  ```

### Get Tasks by Priority

- **Endpoint:** `GET /tasks/priority/:level`
- **Description:** Returns tasks filtered by priority (e.g., `high`, `medium`, `low`).
- **Test with curl:**
  ```bash
  curl http://localhost:3000/tasks/priority/high
  ```

### Create a New Task

- **Endpoint:** `POST /tasks`
- **Description:** Creates a new task.
- **Body:** JSON with `title` and `description`.
- **Test with curl:**
  ```bash
  curl -X POST http://localhost:3000/tasks \
     -H "Content-Type: application/json" \
     -d '{"title":"New Task","description":"Details"}'
  ```

### Update a Task

- **Endpoint:** `PUT /tasks/:id`
- **Description:** Updates an existing task.
- **Body:** JSON with any of `title`, `description`, `completed`.
- **Test with curl:**
  ```bash
  curl -X PUT http://localhost:3000/tasks/1 \
     -H "Content-Type: application/json" \
     -d '{"completed":true}'
  ```

### Delete a Task

- **Endpoint:** `DELETE /tasks/:id`
- **Description:** Deletes a task by ID.
- **Test with curl:**
  ```bash
  curl -X DELETE http://localhost:3000/tasks/1
  ```

## Notes

- All endpoints return JSON responses.
- The API uses in-memory storage; data will reset when the server restarts.
- Make sure to use the correct port if you change the default.
