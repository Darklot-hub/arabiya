import Club from "../models/Club.js";
export async function list(req, res) {
  res.json({ items: await Club.find() });
}
