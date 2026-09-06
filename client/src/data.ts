import type { Goal, Level } from "./types";
export const goals: { id: Goal; title: string; description: string }[] = [
  { id: "conversation", title: "Разговорный", description: "Живая речь и уверенное общение." },
  {
    id: "business",
    title: "Для бизнеса",
    description: "Переговоры, письма и профессиональная лексика.",
  },
  { id: "travel", title: "Для путешествий", description: "Аэропорт, отель, кафе и город." },
  { id: "it", title: "Для IT", description: "Техническая лексика и рабочая коммуникация." },
  { id: "reading", title: "Чтение", description: "Новости, статьи и современная арабская проза." },
];
export const levels: Level[] = ["A1", "A2", "B1", "B2", "C1"];
export const questions = [
  {
    id: "q1",
    skill: "vocabulary",
    prompt: "Что означает مرحباً?",
    options: ["Спасибо", "Привет", "До свидания", "Пожалуйста"],
    answer: "Привет",
  },
  {
    id: "q2",
    skill: "grammar",
    prompt: "Выбери правильное предложение.",
    options: ["أنا طالب", "أنا طلاب", "أنا طالبين", "أنا يطالب"],
    answer: "أنا طالب",
  },
  {
    id: "q3",
    skill: "reading",
    prompt: "Прочитай: أنا أعمل في شركة. Где человек работает?",
    options: ["В школе", "В компании", "В аэропорту", "Дома"],
    answer: "В компании",
  },
  {
    id: "q4",
    skill: "listening",
    prompt: "Послушай и выбери: شُكْرًا",
    options: ["Спасибо", "Доброе утро", "Да", "Нет"],
    answer: "Спасибо",
  },
  { id: "q5", skill: "writing", prompt: "Напиши по-арабски: «Меня зовут Анна».", type: "text" },
  {
    id: "q6",
    skill: "speaking",
    prompt: "Скажи по-арабски: «Я изучаю арабский язык».",
    type: "text",
  },
];
