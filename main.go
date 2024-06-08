package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Todo struct {
	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Completed bool               `json:"completed"`
	Body      string             `json:"body"`
}

type UpdateTodo struct {
	Completed *bool   `json:"completed"`
	Body      *string `json:"body"`
}

var collection *mongo.Collection

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file", err)
	}

	PORT := os.Getenv("PORT")
	MONGODB_URI := os.Getenv("MONGODB_URI")

	clientOptions := options.Client().ApplyURI(MONGODB_URI)
	client, err := mongo.Connect(context.Background(), clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(context.Background(), nil)

	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Server running at http://localhost:" + PORT)
	fmt.Println("Connected to MongoDB Atlas!")

	collection = client.Database("todo_go_db").Collection("todos")

	app := fiber.New()

	app.Get("/api/todos", getTodos)
	app.Post("/api/todos", createTodo)
	app.Get("api/todos/:id", getTodo)
	app.Patch("api/todos/:id", updateTodo)
	app.Delete("api/todos/:id", deleteTodo)

	if PORT == "" {
		PORT = "8080"
	}

	if os.Getenv("ENV") == "production" {
		app.Static("/", "./client/dist")
	}

	log.Fatal(app.Listen("0.0.0.0:" + PORT))
}

// Return an array of all todos
func getTodos(c *fiber.Ctx) error {
	var todos []Todo

	cursor, err := collection.Find(context.Background(), bson.M{})

	if err != nil {
		log.Panic(err)
		return err
	}

	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()) {
		var todo Todo
		if err := cursor.Decode(&todo); err != nil {
			log.Panic(err)
			return err
		}
		todos = append(todos, todo)
	}

	return c.JSON(todos)
}

// Create and return a new todo
func createTodo(c *fiber.Ctx) error {
	todo := new(Todo) // {id: 0, completed: false, body: ""}

	if err := c.BodyParser(todo); err != nil {
		return err
	}

	if todo.Body == "" {
		log.Print("Trying to create a todo without a body")
		return c.Status(400).JSON(fiber.Map{"error": "Body is required"})
	}

	insertResult, err := collection.InsertOne(context.Background(), todo)
	if err != nil {
		log.Panic(err)
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}

	todo.ID = insertResult.InsertedID.(primitive.ObjectID)

	return c.Status(201).JSON(todo)
}

// Return a specific todo
func getTodo(c *fiber.Ctx) error {
	id := c.Params("id")
	objectId, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid ID"})
	}

	var todo Todo

	filter := bson.M{"_id": objectId}

	err = collection.FindOne(context.Background(), filter).Decode(&todo)

	if err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Todo not found"})
	}

	return c.Status(200).JSON(fiber.Map{"message": todo})
}

// Update a specific todo
func updateTodo(c *fiber.Ctx) error {
	id := c.Params("id")
	objectId, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		log.Panic(err)
		return c.Status(400).JSON(fiber.Map{"error": "Invalid ID"})
	}

	var updateData UpdateTodo

	if err := c.BodyParser(&updateData); err != nil {
		return err
	}

	filter := bson.M{"_id": objectId}
	update := bson.M{"$set": bson.M{"completed": updateData.Completed, "body": updateData.Body}}

	_, err = collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		log.Panic(err)
		return err
	}

	return c.Status(200).JSON(fiber.Map{"message": "Todo updated"})
}

// Delete a specific todo
func deleteTodo(c *fiber.Ctx) error {
	id := c.Params("id")
	objectId, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		log.Panic(err)
		return c.Status(400).JSON(fiber.Map{"error": "Invalid ID"})
	}

	filter := bson.M{"_id": objectId}
	_, err = collection.DeleteOne(context.Background(), filter)

	if err != nil {
		log.Panic(err)
		return err
	}

	return c.Status(200).JSON(fiber.Map{"message": "Todo deleted"})
}
