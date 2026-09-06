import { useEffect, useState } from "react";
import { LinkButton } from "../components/common/LinkButton";
import { Loader } from "../components/common/Loader";
import { api } from "../services/api";
import type { DiagnosticResult } from "../types";

export function Results() {
  const [r, setR] = useState<DiagnosticResult | null>(null);
  useEffect(() => {
    api<{ result: DiagnosticResult }>("/diagnostic/latest")
      .then((x) => setR(x.result))
      .catch(() => {});
  }, []);
  if (!r) return <Loader label="Анализируем ответы…" />;
  return (
    <main className="wrap page-shell">
      <div className="result-hero">
        <div className="eyebrow">РЕЗУЛЬТАТ ДИАГНОСТИКИ</div>
        <h1>
          Твой ориентировочный уровень - <em>{r.estimatedLevel}</em>.
        </h1>
        <p className="lead">Теперь можно выбрать цель и начать персональный маршрут.</p>
        <LinkButton to="/dashboard">Перейти к маршруту →</LinkButton>
      </div>
      <div className="skill-grid">
        {Object.entries(r.skills).map(([name, s]) => (
          <article className="stat-card" key={name}>
            <span>{name}</span>
            <strong>{s.estimatedLevel}</strong>
            <p>
              {s.score}% · {s.answered} ответов
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}
