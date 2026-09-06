import type { Lesson } from "../../types";

export function LessonProgress({ lesson, progress = 0 }: { lesson?: Lesson; progress?: number }) {
  return (
    <div className="progress-track" aria-label={`Прогресс урока ${progress}%`}>
      <i style={{ width: `${Math.max(0, Math.min(100, progress))}%` }} />
      {lesson ? (
        <span className="muted">
          {progress}% · {lesson.title}
        </span>
      ) : null}
    </div>
  );
}
