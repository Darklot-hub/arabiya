import { FormEvent, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";
import { setUser } from "../store/store";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";
import { goals } from "../data";

export function Profile() {
  const { user, dispatch } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [goal, setGoal] = useState(user?.goal || "");
  const [msg, setMsg] = useState("");
  async function submit(e: FormEvent) {
    e.preventDefault();
    const u = await api<any>("/users/me", { method: "PUT", body: JSON.stringify({ name, goal }) });
    dispatch(setUser(u));
    setMsg("Профиль сохранён");
  }
  return (
    <main className="wrap narrow page-shell">
      <div className="eyebrow">ПРОФИЛЬ</div>
      <h1>Твой аккаунт.</h1>
      <form className="form-card" onSubmit={submit}>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Имя" />
        <select className="input" value={goal} onChange={(e) => setGoal(e.target.value)}>
          <option value="">Выбери цель</option>
          {goals.map((g) => (
            <option value={g.id} key={g.id}>
              {g.title}
            </option>
          ))}
        </select>
        <Button>Сохранить изменения</Button>
        {msg && <p>{msg}</p>}
      </form>
    </main>
  );
}
