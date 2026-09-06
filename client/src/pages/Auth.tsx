import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { setAuth } from "../store/store";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";
import { Loader } from "../components/common/Loader";

export function Auth({ mode }: { mode: "login" | "register" }) {
  const nav = useNavigate();
  const { dispatch } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function submit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await api<{ token: string; user: any }>(`/auth/${mode}`, {
        method: "POST",
        body: JSON.stringify(mode === "register" ? { name, email, password } : { email, password }),
      });
      dispatch(setAuth(data));
      nav("/dashboard");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка");
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="wrap narrow page-shell">
      <div className="auth-card">
        <div className="eyebrow">{mode === "login" ? "ВОЗВРАТ" : "НАЧАЛО"}</div>
        <h1>{mode === "login" ? "С возвращением" : "Создай аккаунт"}</h1>
        <form onSubmit={submit}>
          {mode === "register" && (
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Имя"
              required
            />
          )}
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль · минимум 6 символов"
            minLength={6}
            required
          />
          {error && <p className="error">{error}</p>}
          {loading ? (
            <Loader label="Сохраняем…" />
          ) : (
            <Button>{mode === "login" ? "Войти" : "Зарегистрироваться"} →</Button>
          )}
        </form>
        <p className="muted">
          {mode === "login" ? "Нет аккаунта? " : "Уже есть аккаунт? "}
          <a href={mode === "login" ? "/register" : "/login"}>
            {mode === "login" ? "Регистрация" : "Войти"}
          </a>
        </p>
      </div>
    </main>
  );
}
