import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock, User, ArrowLeft, LogIn } from "lucide-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useAuth } from "../context/AuthContext";

const MySwal = withReactContent(Swal);

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const res = login(username, password);

    if (res.success) {
      MySwal.fire({
        icon: "success",
        title: "Login Berhasil!",
        text: "Selamat datang di Panel Admin Dashboard.",
        timer: 1500,
        showConfirmButton: false,
        background: "var(--bg-card)",
        color: "var(--text-primary)",
      }).then(() => {
        navigate("/admin");
      });
    } else {
      MySwal.fire({
        icon: "error",
        title: "Login Gagal",
        text: res.message,
        confirmButtonColor: "#09090b",
        background: "var(--bg-card)",
        color: "var(--text-primary)",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--bg-primary)] text-[var(--text-primary)] relative bg-grid-pattern">
      <Link
        to="/"
        className="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
      >
        <ArrowLeft size={16} /> Kembali ke Portofolio
      </Link>

      <div className="w-full max-w-md glow-card rounded-2xl p-8 border border-[var(--border-color)] bg-[var(--bg-card)] shadow-2xl">
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] mb-2">
            <Lock className="w-6 h-6 text-[var(--text-primary)]" />
          </div>
          <h2 className="text-2xl font-bold font-display text-[var(--text-primary)]">
            Admin Login
          </h2>
          <p className="text-xs text-[var(--text-muted)]">
            Masukkan username dan password untuk mengakses dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)] transition-colors duration-200 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)] transition-colors duration-200 text-sm"
              />
            </div>
          </div>

          {/* <div className="p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-[var(--text-muted)]">
            <span className="font-semibold text-[var(--text-secondary)]">
              Tips:
            </span>{" "}
            Kredensial default admin adalah: <br />
            Username:{" "}
            <code className="text-[var(--text-primary)] font-bold">
              admin
            </code>{" "}
            | Password:{" "}
            <code className="text-[var(--text-primary)] font-bold">admin</code>
          </div> */}

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[var(--accent-btn)] hover:bg-[var(--accent-btn-hover)] text-[var(--accent-btn-text)] font-semibold text-sm shadow-lg transition-all duration-200 active:scale-[0.98]"
          >
            <LogIn size={18} /> Login ke Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
