import mongoose, { Schema, models } from 'mongoose';

const todoSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    dateTime: {
      type: String,
      default: '',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Todo = models.Todo || mongoose.model('Todo', todoSchema);

export default Todo; 