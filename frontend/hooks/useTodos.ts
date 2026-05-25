"use client";

import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api";

export interface Todo {
  _id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await api.get<Todo[]>("/todos");
      setTodos(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to fetch todos";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTodo = useCallback(async (title: string) => {
    try {
      setError(null);
      const { data } = await api.post<Todo>("/todos", { title });
      setTodos((prev) => [data, ...prev]);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to create todo";
      setError(message);
    }
  }, []);

  const updateTodo = useCallback(
    async (id: string, updates: Partial<Pick<Todo, "title" | "completed">>) => {
      try {
        setError(null);
        const { data } = await api.patch<Todo>(`/todos/${id}`, updates);
        setTodos((prev) => prev.map((t) => (t._id === id ? data : t)));
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to update todo";
        setError(message);
      }
    },
    []
  );

  const deleteTodo = useCallback(async (id: string) => {
    try {
      setError(null);
      await api.delete(`/todos/${id}`);
      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to delete todo";
      setError(message);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return { todos, loading, error, fetchTodos, createTodo, updateTodo, deleteTodo };
}
