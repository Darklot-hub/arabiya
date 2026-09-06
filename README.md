# ARABIYA - дипломный проект

ARABIYA - desktop-first образовательная платформа для изучения арабского языка. Пользователь проходит диагностику, получает ориентировочный уровень A1-C1 и персональную программу: разговорный арабский, MSA/чтение, арабский для бизнеса, путешествий или IT. Также доступны разговорный и читательский клубы.

## Стек
- Frontend: React + TypeScript + Vite + CSS Modules + React Router + Redux Toolkit
- Backend: Node.js + Express + MongoDB + Mongoose + JWT
- REST API между клиентом и сервером
- Docker Compose

## Запуск локально
```bash
npm install
npm run install:all
npm run dev
```
Frontend: http://localhost:5173
API: http://localhost:5000/api/health

## Docker
```bash
docker compose up --build
```

## Демо-аккаунт
После регистрации можно сразу пройти диагностику. Для демонстрации CRUD добавлен приватный раздел `/admin/lessons`.

## Что реализовано
- Списки: программы, уроки, клубы, диагностические вопросы.
- Loader: GET-запросы, регистрация/вход, сохранение диагностики, CRUD уроков.
- React Router: `/`, `/diagnostic`, `/results`, `/dashboard`, `/lessons`, `/lessons/:id`, `/clubs`, `/login`, `/register`, `/profile`, `/admin/lessons`.
- Dynamic page: `/lessons/:id` получает урок по URL-параметру.
- Базовые компоненты: Button, Input, Loader, Modal, PageShell, ProtectedRoute, Header.
- Формы: регистрация/вход, профиль, создание/редактирование урока, диагностические ответы.
- Кастомные хуки: `useAuth`, `useApi`, `useDebounce`.
- Private Route: `/dashboard`, `/profile`, `/admin/lessons`.
- Редактирование: профиль пользователя и уроки.
- Удаление: уроки из приватной панели.
- Redux: auth/profile state, token and current user.
- Express: порт, JSON, CORS, статическая папка production build.
- REST: GET/POST/PUT/DELETE.
- Mongoose: User, Lesson, Club.
- JWT: register/login + auth middleware.
- Middleware: JWT auth + error handler.
- Handlers вынесены в routes/controllers.

<img width="1498" height="912" alt="Снимок экрана 2026-09-06 152924" src="https://github.com/user-attachments/assets/62ab4701-2b82-4bc4-ab0d-d0cc838651b7" />
<img width="1891" height="947" alt="Снимок экрана 2026-09-06 152839" src="https://github.com/user-attachments/assets/5c40246d-597e-49f7-8e1b-65e1cf7b1dac" />



