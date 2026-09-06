import { useEffect, useState } from "react";
import { LinkButton } from "../components/common/LinkButton";
import { Loader } from "../components/common/Loader";
import { api } from "../services/api";
import type { Lesson, User } from "../types";
import { useAuth } from "../hooks/useAuth";

export function Dashboard() {
  const { user } = useAuth();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api<{ items: Lesson[] }>("/lessons?level=" + (user?.level || "A1"))
      .then((x) => setLessons(x.items))
      .finally(() => setLoading(false));
  }, [user?.level]);
  if (loading) return <Loader />;
  return (
    <main className="wrap page-shell">
      <div className="dashboard-head">
        <div>
          <div className="eyebrow">МОЙ ПУТЬ</div>
          <h1>{user?.name}, продолжаем!</h1>
          <p className="lead">
            {user?.level || "A1"} · {user?.goal || "Выбери цель"} · {user?.progress || 0}% прогресса
          </p>
        </div>
        <LinkButton to="/lessons">Открыть учебник →</LinkButton>
      </div>
      <div className="stats-grid">
        <div className="stat-card">
          <span>Уровень</span>
          <strong>{user?.level || "—"}</strong>
        </div>
        <div className="stat-card">
          <span>Прогресс</span>
          <strong>{user?.progress || 0}%</strong>
        </div>
        <div className="stat-card">
          <span>Уроков в маршруте</span>
          <strong>{lessons.length}</strong>
        </div>
        <div className="stat-card">
          <span>Клубы</span>
          <strong>2</strong>
        </div>
      </div>
      <section className="section">
        <div className="eyebrow">ТЕКУЩИЙ МОДУЛЬ</div>
        <div className="card-grid">
          {lessons.slice(0, 3).map((l) => (
            <article className="card" key={l._id}>
              <span>
                {l.level} · {l.module}
              </span>
              <h3>{l.title}</h3>
              <p>{l.description}</p>
              <LinkButton to={`/lessons/${l._id}`}>Начать →</LinkButton>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
