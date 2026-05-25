"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) return;
    setLoading(true);
    setError("");
    try {
      await login(email.trim(), password);
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setError(axiosErr?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrap" id="login-page">
      <div className="deco deco--1" />
      <div className="deco deco--2" />
      <div className="glass auth-card" id="login-card">
        <div className="auth-header">
          <h1 className="auth-header__title">Welcome Back</h1>
          <p className="auth-header__sub">Sign in to your workspace</p>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="error-banner" role="alert">⚠ {error}</div>}
          <div className="auth-field">
            <label className="auth-label" htmlFor="login-email">Email</label>
            <input id="login-email" className="auth-input" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} required autoFocus />
          </div>
          <div className="auth-field">
            <label className="auth-label" htmlFor="login-password">Password</label>
            <input id="login-password" className="auth-input" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} required />
          </div>
          <button id="login-submit" className="auth-btn" type="submit" disabled={loading || !email.trim() || !password}>
            {loading ? <span className="auth-btn__loading"><span className="auth-btn__spinner" /> Signing in…</span> : "Sign In"}
          </button>
        </form>
        <p className="auth-footer">Don&apos;t have an account? <Link href="/signup" className="auth-link">Sign up</Link></p>
      </div>
    </div>
  );
}
