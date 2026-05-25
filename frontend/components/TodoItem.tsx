"use client";

import { Todo } from "@/hooks/useTodos";

interface TodoItemProps {
  todo: Todo;
  colorIndex: number;
  onToggle: (id: string, completed: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function TodoItem({ todo, colorIndex, onToggle, onDelete }: TodoItemProps) {
  const colorClass = `capsule--c${colorIndex % 6}`;
  const doneClass = todo.completed ? "capsule--done" : "";

  return (
    <div
      className={`capsule ${colorClass} ${doneClass}`}
      id={`todo-${todo._id}`}
      style={{ animationDelay: `${colorIndex * 0.05}s` }}
    >
      <div className="capsule__bar" />
      <label className="capsule__check">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo._id, !todo.completed)}
          aria-label={`Mark "${todo.title}" as ${todo.completed ? "incomplete" : "complete"}`}
        />
        <span className="capsule__mark" />
      </label>
      <span className="capsule__title">{todo.title}</span>
      <button
        className="capsule__del"
        onClick={() => onDelete(todo._id)}
        aria-label={`Delete "${todo.title}"`}
        title="Delete"
      >
        ✕
      </button>
    </div>
  );
}
