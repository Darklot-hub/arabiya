import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import { Loader } from "../components/common/Loader";
import type { Lesson, Level } from "../types";
import { levels } from "../data";

export function Lessons() {
  const [items, setItems] = useState<Lesson[]>([]);
  const [level, setLevel] = useState<Level | "">("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    api<{ items: Lesson[] }>(`/lessons${level ? `?level=${level}` : ""}`)
      .then((x) => setItems(x.items))
      .finally(() => setLoading(false));
  }, [level]);
  return (
    <main className="wrap page-shell">
      <div className="page-title">
        <div>
          <div className="eyebrow">ОНЛАЙН-УЧЕБНИК</div>
          <h1>A1 → C1</h1>
          <p className="lead">Короткие модули с фокусом на реальную задачу</p>
        </div>
        <select className="input" value={level} onChange={(e) => setLevel(e.target.value as Level)}>
          <option value="">Все уровни</option>
          {levels.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="card-grid">
          {items.map((l) => (
            <Link className="card link-card" to={`/lessons/${l._id}`} key={l._id}>
              <span>
                {l.level} · {l.goal}
              </span>
              <h3>{l.title}</h3>
              <p>{l.description}</p>
              <b>Открыть →</b>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
