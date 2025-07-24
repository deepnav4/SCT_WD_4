import React, { useState, useEffect } from 'react';

interface Task {
  _id: string;
  text: string;
  dateTime: string;
}

interface EditModalProps {
  task: Task | null;
  onClose: () => void;
  onSave: (id: string, text: string, dateTime: string) => void;
}

const EditModal: React.FC<EditModalProps> = ({ task, onClose, onSave }) => {
  const [text, setText] = useState('');
  const [dateTime, setDateTime] = useState('');

  useEffect(() => {
    if (task) {
      setText(task.text);
      setDateTime(task.dateTime);
    }
  }, [task]);

  if (!task) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSave(task._id, text, dateTime);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#3B4252] p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
        <h2 className="text-xl font-semibold mb-4 text-[#D8DEE9]">Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="taskText" className="block text-sm font-medium text-[#E5E9F0] mb-2">
              Task
            </label>
            <input
              id="taskText"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-3 rounded-md bg-[#2E3440] text-[#D8DEE9] border border-[#4C566A] focus:border-[#81A1C1] focus:outline-none transition-colors"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="taskDateTime" className="block text-sm font-medium text-[#E5E9F0] mb-2">
              Date & Time
            </label>
            <input
              id="taskDateTime"
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              className="w-full p-3 rounded-md bg-[#2E3440] text-[#D8DEE9] border border-[#4C566A] focus:border-[#81A1C1] focus:outline-none transition-colors"
            />
          </div>
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-[#4C566A] text-[#E5E9F0] hover:bg-[#434C5E] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!text.trim()}
              className="px-4 py-2 rounded-md bg-[#88C0D0] text-[#2E3440] font-medium hover:bg-[#81A1C1] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal; 