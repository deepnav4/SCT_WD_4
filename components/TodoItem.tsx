import React from 'react';

interface TodoItemProps {
  id: string;
  text: string;
  dateTime: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  text,
  dateTime,
  completed,
  onToggle,
  onDelete,
  onEdit
}) => {
  // Format the date and time
  const formatDateTime = (dateTimeStr: string) => {
    if (!dateTimeStr) return 'No date set';
    
    const date = new Date(dateTimeStr);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="w-full p-4 mb-3 rounded-md bg-[#3B4252] flex items-start gap-3 transition-all hover:shadow-md">
      <div className="pt-1">
        <button
          onClick={() => onToggle(id)}
          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
            completed
              ? 'bg-[#A3BE8C] border-[#A3BE8C]'
              : 'border-[#88C0D0] hover:border-[#81A1C1]'
          }`}
        >
          {completed && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#2E3440]"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </button>
      </div>
      <div className="flex-1">
        <p className={`text-md ${completed ? 'task-completed' : 'text-[#D8DEE9]'}`}>{text}</p>
        <p className="text-xs text-[#E5E9F0]/70 mt-1">{formatDateTime(dateTime)}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(id)}
          className="p-1.5 rounded-md hover:bg-[#81A1C1]/20 text-[#88C0D0] transition-colors"
          aria-label="Edit task"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            <path d="m15 5 4 4" />
          </svg>
        </button>
        <button
          onClick={() => onDelete(id)}
          className="p-1.5 rounded-md hover:bg-[#81A1C1]/20 text-[#88C0D0] transition-colors"
          aria-label="Delete task"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TodoItem; 