import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import Todo from '@/models/Todo';

// Get all todos for the authenticated user
export async function GET() {
  try {
    const session = await auth();
    
    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    
    await connectDB();
    
    const todos = await Todo.find({ userId: session.user.id }).sort({ createdAt: -1 });
    
    return NextResponse.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json(
      { message: 'Error fetching todos' },
      { status: 500 }
    );
  }
}

// Create a new todo
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    
    const { text, dateTime } = await request.json();
    
    if (!text) {
      return NextResponse.json(
        { message: 'Task text is required' },
        { status: 400 }
      );
    }
    
    await connectDB();
    
    const newTodo = new Todo({
      text,
      dateTime,
      completed: false,
      userId: session.user.id,
    });
    
    await newTodo.save();
    
    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    console.error('Error creating todo:', error);
    return NextResponse.json(
      { message: 'Error creating todo' },
      { status: 500 }
    );
  }
} 