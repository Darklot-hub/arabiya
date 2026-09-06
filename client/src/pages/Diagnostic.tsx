import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { questions } from "../data";
import { api } from "../services/api";
import { Loader } from "../components/common/Loader";
import { Button } from "../components/common/Button";

export function Diagnostic() {
  const nav = useNavigate();
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const q = questions[i];
  const val = answers[q.id] ?? "";
  async function next() {
    if (!val.trim()) return;
    if (i < questions.length - 1) {
      setI(i + 1);
      return;
    }
    setLoading(true);
    try {
      await api("/diagnostic", { method: "POST", body: JSON.stringify({ answers }) });
      nav("/results");
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="wrap narrow page-shell">
      <div className="diagnostic-head">
        <div>
          <div className="eyebrow">
            ДИАГНОСТИКА · {i + 1}/{questions.length}
          </div>
          <h1>Покажи, что уже умеешь.</h1>
        </div>
        <div className="progress-track">
          <i style={{ width: `${((i + 1) / questions.length) * 100}%` }} />
        </div>
      </div>
      <section className="question-card">
        <div className="eyebrow">{q.skill}</div>
        <h2>{q.prompt}</h2>
        {q.options ? (
          <div className="options">
            {q.options.map((o) => (
              <button
                className={`option ${val === o ? "selected" : ""}`}
                key={o}
                onClick={() => setAnswers((a) => ({ ...a, [q.id]: o }))}
              >
                {o}
              </button>
            ))}
          </div>
        ) : (
          <textarea
            className="textarea"
            dir="rtl"
            value={val}
            onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
            rows={5}
            placeholder="Напиши ответ…"
          />
        )}
        <div className="actions">
          <span className="muted">Без подсказок. Нам важен твой реальный уровень.</span>
          {loading ? (
            <Loader />
          ) : (
            <Button onClick={next}>
              {i === questions.length - 1 ? "Завершить диагностику" : "Следующий вопрос"} →
            </Button>
          )}
        </div>
      </section>
    </main>
  );
}
