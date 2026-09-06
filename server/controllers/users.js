import User from "../models/User.js";

export async function me(req, res) {
  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    level: req.user.level,
    goal: req.user.goal,
    progress: req.user.progress,
  });
}
export async function update(req, res) {
  const u = await User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, goal: req.body.goal },
    { new: true },
  );
  res.json({
    id: u._id,
    name: u.name,
    email: u.email,
    level: u.level,
    goal: u.goal,
    progress: u.progress,
  });
}
