import jwt from "jsonwebtoken";
import User from "../models/User.js";
export async function auth(req, res, next) {
  try {
    const h = req.headers.authorization || "";
    if (!h.startsWith("Bearer "))
      return res.status(401).json({ message: "Требуется авторизация" });
    const token = h.slice(7);
    const p = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(p.id).select("-password");
    if (!req.user)
      return res.status(401).json({ message: "Пользователь не найден" });
    next();
  } catch {
    return res.status(401).json({ message: "Недействительный токен" });
  }
}
export function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).json({ message: "Внутренняя ошибка сервера" });
}
