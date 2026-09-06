import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";
import { Loader } from "../components/common/Loader";
import type { Lesson } from "../types";

export function LessonDetail() {
  const { id } = useParams();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  useEffect(() => {
    api<Lesson>(`/lessons/${id}`).then(setLesson);
  }, [id]);
  if (!lesson) return <Loader />;
  return (
    <main className="wrap narrow page-shell">
      <div className="eyebrow">
        {lesson.level} · {lesson.module}
      </div>
      <h1>{lesson.title}</h1>
      <p className="lead">{lesson.description}</p>
      <article className="lesson-content" dir="auto">
        {lesson.content}
      </article>
    </main>
  );
}
