# Go Todo App

This is a monorepo of simple Todo API built with Go and Fiber with the frontend being built with React and TypeScript. It allows users to create, read, update, and delete todo items and have todo persistence using Mongo DB.

## Prerequisites

- Go 1.22.3 or later
- Git
- MongoDB

## Getting Started

### Installation

Clone the repository:

```bash
git clone https://github.com/nathanrydel/go-todo-app.git
cd go-todo-app
```

Install dependencies:

```bash
go mod tidy
```

Create a `.env` file in the root directory and add the following lines:

```plaintext
PORT=8080
MONGODB_URI=your_mongodb_connection_string
```

### Running the Application

Run the application using the Go command:

```bash
go run main.go
```

The server will start running at `http://localhost:8080`.

## API Endpoints

### Get Home Page

- **URL:** /
- **Method:** GET
- **Response:**
  ```json
  {
    "msg": "Hello, World!"
  }
  ```

### Get All Todos

- **URL:** /api/todos
- **Method:** GET
- **Response:** An array of todo objects
  ```json
  [
    {
      "id": "60c72b2f9b1d8b3b5c8f9d9a",
      "completed": false,
      "body": "Sample todo"
    }
  ]
  ```

### Create a New Todo

- **URL:** /api/todos
- **Method:** POST
- **Request Body:**
  ```json
  {
    "body": "New todo item"
  }
  ```
- **Response:** The created todo object
  ```json
  {
    "id": "60c72b2f9b1d8b3b5c8f9d9a",
    "completed": false,
    "body": "New todo item"
  }
  ```

### Get a Specific Todo

- **URL:** /api/todos/:id
- **Method:** GET
- **Response:** The requested todo object
  ```json
  {
    "id": "60c72b2f9b1d8b3b5c8f9d9a",
    "completed": false,
    "body": "Sample todo"
  }
  ```

### Update a Specific Todo

- **URL:** /api/todos/:id
- **Method:** PATCH
- **Request Body:** One or both of the following fields
  ```json
  {
    "completed": true,
    "body": "Updated todo item"
  }
  ```
- **Response:** The updated todo object
  ```json
  {
    "id": "60c72b2f9b1d8b3b5c8f9d9a",
    "completed": true,
    "body": "Updated todo item"
  }
  ```

### Delete a Specific Todo

- **URL:** /api/todos/:id
- **Method:** DELETE
- **Response:**
  ```json
  {
    "message": "Todo deleted"
  }
  ```

## Environment Variables

- `PORT`: The port number on which the server will run. This should be specified in a `.env` file.
- `MONGODB_URI`: The connection string for the MongoDB database.

## Dependencies

- Fiber v2
- godotenv
- MongoDB Go Driver

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgements

This project uses the following open-source packages:

- Fiber
- godotenv
- MongoDB Go Driver

---