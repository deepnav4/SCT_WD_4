'use client';

import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import TodoInput from '../components/TodoInput';
import TodoList from '../components/TodoList';
import EditModal from '../components/EditModal';

interface Task {
  _id: string;
  text: string;
  completed: boolean;
  dateTime: string;
}

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  // Fetch todos when authenticated
  useEffect(() => {
    if (status === 'authenticated') {
      fetchTodos();
    }
  }, [status]);

  // Fetch todos from the API
  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/todos');
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError('Error loading tasks. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new task
  const handleAddTask = async (text: string, dateTime: string) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, dateTime }),
      });

      if (!response.ok) {
        throw new Error('Failed to add task');
      }

      const newTask = await response.json();
      setTasks([newTask, ...tasks]);
    } catch (err) {
      setError('Error adding task. Please try again.');
      console.error(err);
    }
  };

  // Toggle task completion status
  const handleToggleComplete = async (id: string) => {
    const task = tasks.find((t) => t._id === id);
    if (!task) return;

    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !task.completed }),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      const updatedTask = await response.json();
      setTasks(
        tasks.map((task) => (task._id === id ? updatedTask : task))
      );
    } catch (err) {
      setError('Error updating task. Please try again.');
      console.error(err);
    }
  };

  // Delete a task
  const handleDeleteTask = async (id: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      setError('Error deleting task. Please try again.');
      console.error(err);
    }
  };

  // Open the edit modal for a task
  const handleEditTask = (id: string) => {
    const taskToEdit = tasks.find((task) => task._id === id);
    if (taskToEdit) {
      setEditingTask(taskToEdit);
    }
  };

  // Save the edited task
  const handleSaveTask = async (id: string, text: string, dateTime: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, dateTime }),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      const updatedTask = await response.json();
      setTasks(
        tasks.map((task) => (task._id === id ? updatedTask : task))
      );
      setEditingTask(null);
    } catch (err) {
      setError('Error updating task. Please try again.');
      console.error(err);
    }
  };

  // Close the edit modal
  const handleCloseModal = () => {
    setEditingTask(null);
  };

  // Handle sign out
  const handleSignOut = () => {
    signOut({ redirect: false });
    router.push('/auth/signin');
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#2E3440] flex flex-col items-center justify-center p-4">
        <div className="text-[#D8DEE9]">Loading...</div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null; // Will redirect to sign-in page
  }

  return (
    <div className="min-h-screen bg-[#2E3440] flex flex-col items-center p-4">
      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <Header />
          <button
            onClick={handleSignOut}
            className="px-4 py-2 rounded-md bg-[#4C566A] text-[#E5E9F0] hover:bg-[#434C5E] transition-colors"
          >
            Sign Out
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-md text-red-200 text-sm">
            {error}
            <button
              onClick={() => setError('')}
              className="ml-2 text-xs hover:underline"
            >
              Dismiss
            </button>
          </div>
        )}

        <TodoInput onAddTask={handleAddTask} />
        
        {loading ? (
          <div className="w-full text-center p-4 text-[#E5E9F0]">Loading tasks...</div>
        ) : (
          <TodoList
            tasks={tasks}
            onToggle={handleToggleComplete}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
          />
        )}
      </div>
      
      {editingTask && (
        <EditModal
          task={editingTask}
          onClose={handleCloseModal}
          onSave={handleSaveTask}
        />
      )}
    </div>
  );
}
