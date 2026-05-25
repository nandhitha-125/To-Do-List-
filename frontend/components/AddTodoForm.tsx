"use client";

import { useState, FormEvent } from "react";

interface AddTodoFormProps {
  onAdd: (title: string) => Promise<void>;
}

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed || submitting) return;
    setSubmitting(true);
    await onAdd(trimmed);
    setTitle("");
    setSubmitting(false);
  };

  return (
    <form className="composer" onSubmit={handleSubmit} id="add-todo-form">
      <input
        id="add-todo-input"
        className="composer__input"
        type="text"
        placeholder="✨ Add a new task…"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={submitting}
        autoFocus
      />
      <button
        id="add-todo-btn"
        className="composer__btn"
        type="submit"
        disabled={!title.trim() || submitting}
      >
        {submitting ? "Adding…" : "＋ Add"}
      </button>
    </form>
  );
}
