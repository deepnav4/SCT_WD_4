import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import Todo from '@/models/Todo';

// Get a specific todo
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const todoId = params.id;
    
    await connectDB();

    const todo = await Todo.findOne({
      _id: todoId,
      userId: session.user.id,
    });

    if (!todo) {
      return NextResponse.json({ message: 'Todo not found' }, { status: 404 });
    }

    return NextResponse.json(todo);
  } catch (error) {
    console.error('Error fetching todo:', error);
    return NextResponse.json(
      { message: 'Error fetching todo' },
      { status: 500 }
    );
  }
}

// Update a todo
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const todoId = params.id;
    const updateData = await request.json();
    
    await connectDB();

    // Find and update the todo, ensuring it belongs to the current user
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: todoId, userId: session.user.id },
      updateData,
      { new: true }
    );

    if (!updatedTodo) {
      return NextResponse.json({ message: 'Todo not found' }, { status: 404 });
    }

    return NextResponse.json(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    return NextResponse.json(
      { message: 'Error updating todo' },
      { status: 500 }
    );
  }
}

// Delete a todo
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const todoId = params.id;
    
    await connectDB();

    // Find and delete the todo, ensuring it belongs to the current user
    const deletedTodo = await Todo.findOneAndDelete({
      _id: todoId,
      userId: session.user.id,
    });

    if (!deletedTodo) {
      return NextResponse.json({ message: 'Todo not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    return NextResponse.json(
      { message: 'Error deleting todo' },
      { status: 500 }
    );
  }
} 