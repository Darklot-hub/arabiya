import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { fileURLToPath } from "url";

dotenv.config({
  path: fileURLToPath(new URL("./.env", import.meta.url)),
});

console.log("CWD:", process.cwd());
console.log("MONGO_URI:", process.env.MONGO_URI);
import authRoutes from "./routes/auth.js";
import lessonRoutes from "./routes/lessons.js";
import clubRoutes from "./routes/clubs.js";
import userRoutes from "./routes/users.js";
import diagnosticRoutes from "./routes/diagnostic.js";
import Lesson from "./models/Lesson.js";
import Club from "./models/Club.js";
import { errorHandler } from "./middleware/auth.js";
const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json());
app.get("/api/health", (req, res) =>
  res.json({ ok: true, name: "ARABIYA API" }),
);
app.use("/api/auth", authRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/clubs", clubRoutes);
app.use("/api/users", userRoutes);
app.use("/api/diagnostic", diagnosticRoutes);
app.use(errorHandler);
const lessons = [
  [
    "Приветствие и знакомство",
    "A1",
    "conversation",
    "Основы",
    "Учимся здороваться, представляться и задавать первый вопрос.",
    "مرحبا! أنا آنا. ما اسمك؟",
  ],
  [
    "Арабский для путешествий: аэропорт",
    "A1",
    "travel",
    "Путешествия",
    "Фразы для регистрации и посадки.",
    "أين بوابة الصعود؟ أين جوازات السفر؟",
  ],
  [
    "Рабочая переписка",
    "B1",
    "business",
    "Бизнес",
    "Лексика и структура короткого делового письма.",
    "مرحباً، أود أن أناقش معكم المشروع.",
  ],
  [
    "IT: продуктовая команда",
    "B1",
    "it",
    "IT",
    "Техническая лексика для ежедневной работы.",
    "نحتاج إلى تحسين واجهة المستخدم.",
  ],
  [
    "Читаем новость",
    "B2",
    "reading",
    "Чтение",
    "Разбираем заголовок и ключевые конструкции новостного текста.",
    "أعلنت الشركة عن إطلاق منتج جديد.",
  ],
  [
    "Дискуссия о технологиях",
    "C1",
    "conversation",
    "Продвинутая речь",
    "Аргументация и нюансированная лексика.",
    "من وجهة نظري، تؤثر التكنولوجيا في طريقة تواصلنا.",
  ],
];
const seed = async () => {
  if ((await Lesson.countDocuments()) === 0)
    await Lesson.insertMany(
      lessons.map((x) => ({
        title: x[0],
        level: x[1],
        goal: x[2],
        module: x[3],
        description: x[4],
        content: x[5],
      })),
    );
  if ((await Club.countDocuments()) === 0)
    await Club.insertMany([
      {
        title: "Разговорный клуб · Arabic Coffee",
        type: "speaking",
        description:
          "45 минут живой практики с темой недели и мягкой коррекцией ошибок.",
        schedule: "Среда · 19:00",
      },
      {
        title: "Читательский клуб · Arabic Pages",
        type: "reading",
        description:
          "Читаем короткий текст, разбираем лексику и обсуждаем идеи.",
        schedule: "Суббота · 12:00",
      },
    ]);
};
const start = async () => {
  await mongoose.connect(
    process.env.MONGO_URI || "mongodb://localhost:27017/arabiya",
  );
  await seed();
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`ARABIYA API on ${port}`));
};
start().catch(console.error);
