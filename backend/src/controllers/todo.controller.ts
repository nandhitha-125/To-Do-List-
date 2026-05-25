import { Response, NextFunction } from "express";
import Todo from "../models/Todo.model";
import { AuthRequest } from "../middleware/auth";

// @desc    Get all todos for current user
// @route   GET /api/todos
export const getTodos = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const todos = await Todo.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new todo
// @route   POST /api/todos
export const createTodo = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title } = req.body;

    if (!title || !title.trim()) {
      res.status(400).json({ message: "Title is required" });
      return;
    }

    const todo = await Todo.create({ title: title.trim(), userId: req.userId });
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a todo
// @route   PATCH /api/todos/:id
export const updateTodo = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    const todo = await Todo.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { ...(title !== undefined && { title: title.trim() }), ...(completed !== undefined && { completed }) },
      { new: true, runValidators: true }
    );

    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a todo
// @route   DELETE /api/todos/:id
export const deleteTodo = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOneAndDelete({ _id: id, userId: req.userId });

    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    next(error);
  }
};
