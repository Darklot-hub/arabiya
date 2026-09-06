import Lesson from "../models/Lesson.js";

export async function list(req, res) {
  const q = req.query.level ? { level: req.query.level } : {};
  res.json({ items: await Lesson.find(q).sort({ level: 1, createdAt: 1 }) });
}
export async function get(req, res) {
  const x = await Lesson.findById(req.params.id);
  if (!x) return res.status(404).json({ message: "Урок не найден" });
  res.json(x);
}
export async function create(req, res) {
  res.status(201).json(await Lesson.create(req.body));
}
export async function update(req, res) {
  const x = await Lesson.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!x) return res.status(404).json({ message: "Урок не найден" });
  res.json(x);
}
export async function remove(req, res) {
  await Lesson.findByIdAndDelete(req.params.id);
  res.json({ message: "Урок удалён" });
}
