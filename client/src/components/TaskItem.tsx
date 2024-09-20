import React from 'react';
import { Button } from "@/components/ui/button";
import { Trash, CheckCircle } from "lucide-react";

interface TaskItemProps {
  id: string;
  title: string;
  completed: boolean;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ id, title, completed, onToggleTask, onDeleteTask }) => {
  return (
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center space-x-2">
        <CheckCircle
          className={`h-5 w-5 cursor-pointer ${completed ? 'text-green-500' : 'text-gray-400'}`}
          onClick={() => onToggleTask(id)}
        />
        <span className={`${completed ? 'line-through' : ''}`}>{title}</span>
      </div>
      <Button size="icon" variant="ghost" onClick={() => onDeleteTask(id)}>
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};
