"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useTodos } from "@/hooks/useTodos";
import AddTodoForm from "@/components/AddTodoForm";
import TodoList from "@/components/TodoList";

function getGreeting(): { text: string; emoji: string } {
  const h = new Date().getHours();
  if (h < 5) return { text: "Late night", emoji: "🌙" };
  if (h < 12) return { text: "Good morning", emoji: "☀️" };
  if (h < 17) return { text: "Good afternoon", emoji: "🌤️" };
  if (h < 21) return { text: "Good evening", emoji: "🌆" };
  return { text: "Good night", emoji: "🌙" };
}

const MOTIVATIONS = [
  { emoji: "🚀", text: "Small steps lead to big wins. Keep going!" },
  { emoji: "⚡", text: "You're building momentum. Stay focused!" },
  { emoji: "🎯", text: "Clarity is power. One task at a time." },
  { emoji: "🌱", text: "Every completed task is growth." },
  { emoji: "💎", text: "Consistency beats intensity. Always." },
];

export default function HomePage() {
  const { user, loading: authLoading, logout } = useAuth();
  const { todos, loading, error, createTodo, updateTodo, deleteTodo } = useTodos();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) router.push("/login");
  }, [user, authLoading, router]);

  const greeting = useMemo(() => getGreeting(), []);
  const motivation = useMemo(() => MOTIVATIONS[Math.floor(Math.random() * MOTIVATIONS.length)], []);

  if (authLoading || !user) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
        <p className="loading-text">Loading your workspace…</p>
      </div>
    );
  }

  const total = todos.length;
  const done = todos.filter((t) => t.completed).length;
  const pending = total - done;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  const circumference = 2 * Math.PI * 50;
  const offset = circumference - (pct / 100) * circumference;

  const now = new Date();
  const dayNum = now.getDate();
  const monthName = now.toLocaleDateString("en-US", { month: "long" });
  const weekday = now.toLocaleDateString("en-US", { weekday: "long" });

  return (
    <>
      {/* Decorative shapes */}
      <div className="deco deco--1" />
      <div className="deco deco--2" />
      <div className="deco deco--3" />

      <div className="orbit" id="main-content">
        {/* ─── Left Sidebar ─── */}
        <aside className="orbit__side">
          <div className="glass profile" id="profile-card">
            <div className="profile__avatar">{user.name.charAt(0).toUpperCase()}</div>
            <div className="profile__name">{user.name}</div>
            <div className="profile__email">{user.email}</div>
            <button className="profile__logout" onClick={logout} id="logout-btn">Sign Out</button>
          </div>

          <div className="glass date-card">
            <div className="date-card__day">{dayNum}</div>
            <div className="date-card__month">{monthName}</div>
            <div className="date-card__weekday">{weekday}</div>
          </div>

          <div className="glass stats" id="stats-panel">
            <div className="stat-chip">
              <span className="stat-chip__label">Total</span>
              <span className="stat-chip__val stat-chip__val--total">{total}</span>
            </div>
            <div className="stat-chip">
              <span className="stat-chip__label">Completed</span>
              <span className="stat-chip__val stat-chip__val--done">{done}</span>
            </div>
            <div className="stat-chip">
              <span className="stat-chip__label">Pending</span>
              <span className="stat-chip__val stat-chip__val--pending">{pending}</span>
            </div>
          </div>
        </aside>

        {/* ─── Center: Tasks ─── */}
        <main className="orbit__main">
          {/* Mobile-only user bar */}
          <div className="mobile-bar glass">
            <div className="mobile-bar__user">
              <div className="mobile-bar__avatar">{user.name.charAt(0).toUpperCase()}</div>
              <span className="mobile-bar__name">{user.name}</span>
            </div>
            <button className="mobile-bar__logout" onClick={logout}>Sign Out</button>
          </div>

          <div className="glass" style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div className="greeting">
              <h1 className="greeting__text">{greeting.text}, {user.name}! {greeting.emoji}</h1>
              <p className="greeting__sub">What will you accomplish today?</p>
            </div>

            <AddTodoForm onAdd={createTodo} />

            {error && <div className="error-banner" style={{ margin: "0 1.75rem" }} role="alert">⚠ {error}</div>}

            <TodoList
              todos={todos}
              loading={loading}
              onToggle={(id, completed) => updateTodo(id, { completed })}
              onDelete={deleteTodo}
            />
          </div>
        </main>

        {/* ─── Right: Insights ─── */}
        <aside className="orbit__peek">
          <div className="glass progress-card" id="progress-card">
            <div className="progress-ring">
              <svg viewBox="0 0 120 120">
                <defs>
                  <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--accent)" />
                    <stop offset="100%" stopColor="var(--sage)" />
                  </linearGradient>
                </defs>
                <circle className="progress-ring__bg" cx="60" cy="60" r="50" />
                <circle
                  className="progress-ring__fill"
                  cx="60" cy="60" r="50"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                />
              </svg>
              <div className="progress-ring__pct">{pct}%</div>
            </div>
            <span className="progress-card__label">
              {pct === 100 ? "All done! 🎉" : pct > 50 ? "Great progress!" : "Keep going!"}
            </span>
          </div>

          <div className="glass motiv">
            <div className="motiv__emoji">{motivation.emoji}</div>
            <p className="motiv__text">{motivation.text}</p>
          </div>

          <div className="glass cat-card">
            <div className="cat-card__title">Quick Insights</div>
            <div className="cat-chips">
              <span className="cat-chip cat-chip--sage">{done} done</span>
              <span className="cat-chip cat-chip--accent">{pending} left</span>
              <span className="cat-chip cat-chip--slate">{pct}% rate</span>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
