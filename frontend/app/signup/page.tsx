"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function SignupPage() {
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password) return;
    if (password.length < 6) { setError("Password must be at least 6 characters"); return; }
    setLoading(true);
    setError("");
    try {
      await signup(name.trim(), email.trim(), password);
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setError(axiosErr?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrap" id="signup-page">
      <div className="deco deco--1" />
      <div className="deco deco--3" />
      <div className="glass auth-card" id="signup-card">
        <div className="auth-header">
          <h1 className="auth-header__title">Create Account</h1>
          <p className="auth-header__sub">Start your productivity journey</p>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="error-banner" role="alert">⚠ {error}</div>}
          <div className="auth-field">
            <label className="auth-label" htmlFor="signup-name">Name</label>
            <input id="signup-name" className="auth-input" type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} disabled={loading} required autoFocus />
          </div>
          <div className="auth-field">
            <label className="auth-label" htmlFor="signup-email">Email</label>
            <input id="signup-email" className="auth-input" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} required />
          </div>
          <div className="auth-field">
            <label className="auth-label" htmlFor="signup-password">Password</label>
            <input id="signup-password" className="auth-input" type="password" placeholder="Min. 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} required minLength={6} />
          </div>
          <button id="signup-submit" className="auth-btn" type="submit" disabled={loading || !name.trim() || !email.trim() || !password}>
            {loading ? <span className="auth-btn__loading"><span className="auth-btn__spinner" /> Creating…</span> : "Create Account"}
          </button>
        </form>
        <p className="auth-footer">Already have an account? <Link href="/login" className="auth-link">Sign in</Link></p>
      </div>
    </div>
  );
}
