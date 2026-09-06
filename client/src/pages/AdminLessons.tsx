import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { Lesson, Level, Goal } from "../types";
import { Loader } from "../components/common/Loader";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";

const blank = {
  title: "",
  level: "A1" as Level,
  goal: "conversation" as Goal,
  description: "",
  content: "",
  module: "Основы",
};

export function AdminLessons() {
  const [items, setItems] = useState<Lesson[]>([]);
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  async function load() {
    setLoading(true);
    api<{ items: Lesson[] }>("/lessons")
      .then((x) => setItems(x.items))
      .finally(() => setLoading(false));
  }
  useEffect(() => {
    load();
  }, []);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const url = editing ? `/lessons/${editing}` : "/lessons";
    await api(url, { method: editing ? "PUT" : "POST", body: JSON.stringify(form) });
    setForm(blank);
    setEditing(null);
    load();
  }
  async function del(id: string) {
    if (confirm("Удалить урок?")) {
      await api(`/lessons/${id}`, { method: "DELETE" });
      load();
    }
  }
  if (loading) return <Loader />;
  return (
    <main className="wrap page-shell">
      <div className="eyebrow">PRIVATE · CRUD</div>
      <h1>Управление уроками.</h1>
      <form className="form-card" onSubmit={submit}>
        <Input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Название"
          required
        />
        <Input
          value={form.module}
          onChange={(e) => setForm({ ...form, module: e.target.value })}
          placeholder="Модуль"
          required
        />
        <Input
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Описание"
          required
        />
        <textarea
          className="textarea"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          placeholder="Содержание"
          required
        />
        <div className="actions">
          <Button>{editing ? "Сохранить" : "Добавить урок"}</Button>
          {editing && (
            <button
              className="btn ghost"
              type="button"
              onClick={() => {
                setEditing(null);
                setForm(blank);
              }}
            >
              Отмена
            </button>
          )}
        </div>
      </form>
      <div className="admin-list">
        {items.map((l) => (
          <article className="card" key={l._id}>
            <span>
              {l.level} · {l.goal}
            </span>
            <h3>{l.title}</h3>
            <div className="actions">
              <button
                className="btn ghost"
                onClick={() => {
                  setEditing(l._id);
                  setForm({
                    title: l.title,
                    level: l.level,
                    goal: l.goal,
                    description: l.description,
                    content: l.content,
                    module: l.module,
                  });
                }}
              >
                Редактировать
              </button>
              <button className="btn danger" onClick={() => del(l._id)}>
                Удалить
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
