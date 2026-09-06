import User from "../models/User.js";

const skills = [
  "vocabulary",
  "grammar",
  "reading",
  "listening",
  "writing",
  "speaking",
];
const level = (n) =>
  n < 25 ? "A1" : n < 45 ? "A2" : n < 65 ? "B1" : n < 82 ? "B2" : "C1";
export async function submit(req, res) {
  const answers = req.body.answers || {};
  const scores = {};
  for (const s of skills)
    scores[s] = { score: 0, answered: 0, estimatedLevel: "A1" };
  const correct = {
    q1: "Привет",
    q2: "أنا طالب",
    q3: "В компании",
    q4: "Спасибо",
  };
  for (const [id, val] of Object.entries(answers)) {
    const map = {
      q1: "vocabulary",
      q2: "grammar",
      q3: "reading",
      q4: "listening",
      q5: "writing",
      q6: "speaking",
    }[id];
    if (!map) continue;
    scores[map].answered++;
    let pct =
      map === "writing" || map === "speaking"
        ? String(val).trim().length > 10
          ? 80
          : 45
        : correct[id] === val
          ? 90
          : 30;
    scores[map].score = pct;
    scores[map].estimatedLevel = level(pct);
  }
  const total =
    Object.values(scores).reduce((a, s) => a + s.score, 0) / skills.length;
  const result = {
    estimatedLevel: level(total),
    skills: scores,
    total: Math.round(total),
  };
  await User.findByIdAndUpdate(req.user._id, {
    lastDiagnostic: result,
    level: result.estimatedLevel,
    progress: 5,
  });
  res.json({ result });
}
export async function latest(req, res) {
  const u = await User.findById(req.user._id);
  if (!u?.lastDiagnostic)
    return res.status(404).json({ message: "Диагностика ещё не пройдена" });
  res.json({ result: u.lastDiagnostic });
}
