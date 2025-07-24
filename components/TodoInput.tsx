import React, { useState } from 'react';

interface TodoInputProps {
  onAddTask: (text: string, dateTime: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ onAddTask }) => {
  const [text, setText] = useState('');
  const [dateTime, setDateTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTask(text, dateTime);
      setText('');
      setDateTime('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mb-6">
      <div className="flex flex-col gap-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="w-full p-3 rounded-md bg-[#3B4252] text-[#D8DEE9] placeholder-[#E5E9F0]/60 border border-transparent focus:border-[#81A1C1] focus:outline-none transition-colors"
        />
        <input
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          className="w-full p-3 rounded-md bg-[#3B4252] text-[#D8DEE9] border border-transparent focus:border-[#81A1C1] focus:outline-none transition-colors"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="w-full p-3 rounded-md bg-[#88C0D0] text-[#2E3440] font-medium hover:bg-[#81A1C1] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TodoInput; 