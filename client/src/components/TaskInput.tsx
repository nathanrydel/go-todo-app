import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface TaskInputProps {
  onAddTask: (newTask: string) => void;
}

export const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState<string>("");

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      onAddTask(newTask);
      setNewTask("");
    }
  };

  return (
    <div className="flex space-x-2 mb-4">
      <Input
        type="text"
        placeholder="Buy Groceries"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <Button onClick={handleAddTask} size="icon" variant="outline">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};
