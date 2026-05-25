"use client";

import { useState } from "react";
import { Todo } from "@/hooks/useTodos";
import TodoItem from "./TodoItem";

type Filter = "all" | "active" | "completed";

interface TodoListProps {
  todos: Todo[];
  loading: boolean;
  onToggle: (id: string, completed: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function TodoList({ todos, loading, onToggle, onDelete }: TodoListProps) {
  const [filter, setFilter] = useState<Filter>("all");

  if (loading) {
    return (
      <div className="feed--empty">
        <div className="spinner" />
        <p className="loading-text">Loading your tasks…</p>
      </div>
    );
  }

  const filtered = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <>
      <div className="filters" id="filter-tabs">
        {(["all", "active", "completed"] as Filter[]).map((f) => (
          <button
            key={f}
            className={`filters__tab ${filter === f ? "filters__tab--active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f === "all" ? "All" : f === "active" ? "Active" : "Done"}
            {f === "all" && ` (${todos.length})`}
          </button>
        ))}
      </div>

      <div className="feed" id="todo-list" style={{ overflowY: "auto" }}>
        {filtered.length === 0 ? (
          <div className="feed--empty">
            <div className="feed__empty-ico">
              {filter === "completed" ? "🎉" : "📝"}
            </div>
            <p className="feed__empty-txt">
              {filter === "completed"
                ? "No completed tasks yet. Get started!"
                : filter === "active"
                ? "All caught up! Nothing pending."
                : "No tasks yet. Add one above!"}
            </p>
          </div>
        ) : (
          filtered.map((todo, i) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              colorIndex={i}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </>
  );
}
