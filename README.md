# Go Todo App

This is a simple Todo API built with Go and Fiber. It allows users to create, read, update, and delete todo items.

## Prerequisites

- Go 1.22.3 or later
- Git

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/nathanrydel/go-todo-app.git
   cd go-todo-app
   ```

2. Install dependencies:

   ```bash
   go mod tidy
   ```

3. Create a `.env` file in the root directory and add the following line:

   ```env
   PORT=8080
   ```

### Running the Application

Run the application using the Go command:

```bash
go run main.go
```

The server will start running at `http://localhost:8080`.

## API Endpoints

### Get Home Page

- **URL:** `/`
- **Method:** `GET`
- **Response:**
  ```json
  {
    "msg": "Hello, World!"
  }
  ```

### Get All Todos

- **URL:** `/api/todos`
- **Method:** `GET`
- **Response:** An array of todo objects
  ```json
  [
    {
      "id": 1,
      "completed": false,
      "body": "Sample todo"
    }
  ]
  ```

### Create a New Todo

- **URL:** `/api/todos`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "body": "New todo item"
  }
  ```
- **Response:** The created todo object
  ```json
  {
    "id": 1,
    "completed": false,
    "body": "New todo item"
  }
  ```

### Get a Specific Todo

- **URL:** `/api/todos/:id`
- **Method:** `GET`
- **Response:** The requested todo object
  ```json
  {
    "id": 1,
    "completed": false,
    "body": "Sample todo"
  }
  ```

### Update a Specific Todo

- **URL:** `/api/todos/:id`
- **Method:** `PATCH`
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
    "id": 1,
    "completed": true,
    "body": "Updated todo item"
  }
  ```

### Delete a Specific Todo

- **URL:** `/api/todos/:id`
- **Method:** `DELETE`
- **Response:**
  ```json
  {
    "message": "Todo deleted"
  }
  ```

## Environment Variables

- `PORT`: The port number on which the server will run. This should be specified in a `.env` file.

## Dependencies

- [Fiber v2](https://github.com/gofiber/fiber)
- [godotenv](https://github.com/joho/godotenv)

### Indirect Dependencies

Listed in `go.mod` file as indirect dependencies.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

This project uses the following open-source packages:

- [Fiber](https://github.com/gofiber/fiber)
- [godotenv](https://github.com/joho/godotenv)

---
