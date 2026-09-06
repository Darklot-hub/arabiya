import type { Lesson } from "../../types";
import styles from "./LessonHeader.module.css";

export function LessonHeader({ lesson }: { lesson: Lesson }) {
  return (
    <header className={styles.root}>
      <div className={styles.eyebrow}>
        {lesson.level} · {lesson.goal} · {lesson.module}
      </div>
      <h1>{lesson.title}</h1>
      <p className="lead">{lesson.description}</p>
    </header>
  );
}
