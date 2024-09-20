import React, { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme'; // Custom hook for theme
import { Button } from "@/components/ui/button";
import { SunMoon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { TaskInput } from "./components/TaskInput";
import { TaskItem } from "./components/TaskItem";
import axios from 'axios'; // For API requests

interface Task {
  _id: string;
  body: string;
  completed: boolean;
}

const TodoApp: React.FC = () => {
  const { theme, toggleTheme } = useTheme(); // Theme toggle logic
  const [tasks, setTasks] = useState<Task[]>([]); // Fetch tasks from backend
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch todos from the Go backend
  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/todos'); // Go API endpoint
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos(); // Fetch on component mount
  }, []);

  const addTask = async (newTask: string) => {
    try {
      const response = await axios.post('http://localhost:8080/api/todos', {
        body: newTask,
        completed: false,
      });
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const toggleTask = async (id: string) => {
    const taskToUpdate = tasks.find(task => task._id === id);
    if (!taskToUpdate) return;

    try {
      const response = await axios.patch(`http://localhost:8080/api/todos/${id}`, {
        completed: !taskToUpdate.completed,
      });
      setTasks(tasks.map(task => (task._id === id ? { ...task, completed: !task.completed } : task)));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/api/todos/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className={`min-h-screen p-4 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <Card className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl">Daily Tasks</h1>
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            <SunMoon className="h-5 w-5" />
          </Button>
        </div>
        <CardContent>
          <TaskInput onAddTask={addTask} />
          <h2 className="text-xl font-semibold mb-4 text-cyan-400">TODAY'S TASKS</h2>
          {loading ? (
            <p>Loading...</p> // This is where you can return skeleton components for loading
          ) : tasks.length === 0 ? (
            <p>No tasks yet.</p>
          ) : (
            tasks.map(task => (
              <TaskItem
                key={task._id}
                _id={task._id}
                title={task.body}
                completed={task.completed}
              />
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TodoApp;
