import type { Lesson, Level, Goal } from "../../types";

export const lessonData: Lesson[] = [
  {
    _id: "demo-a1",
    title: "Приветствие и знакомство",
    level: "A1" as Level,
    goal: "conversation" as Goal,
    description: "Базовые фразы для знакомства.",
    content: "مرحبا! اسمي آنا.",
    module: "Основы",
  },
  {
    _id: "demo-a1-travel",
    title: "Арабский для путешествий",
    level: "A1" as Level,
    goal: "travel" as Goal,
    description: "Фразы для аэропорта и отеля.",
    content: "أين المطار؟",
    module: "Путешествия",
  },
];
export type { Lesson };
