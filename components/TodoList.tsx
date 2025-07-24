import React from 'react';
import TodoItem from './TodoItem';

interface Task {
  _id: string;
  text: string;
  completed: boolean;
  dateTime: string;
}

interface TodoListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ tasks, onToggle, onDelete, onEdit }) => {
  if (tasks.length === 0) {
    return (
      <div className="w-full max-w-2xl mt-4 p-6 text-center rounded-md bg-[#3B4252]/70">
        <p className="text-[#E5E9F0]">No tasks yet. Add one above!</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mt-4">
      {tasks.map((task) => (
        <TodoItem
          key={task._id}
          id={task._id}
          text={task.text}
          dateTime={task.dateTime}
          completed={task.completed}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TodoList; 