import type { SkillName } from "../types";

type SkillValues = Partial<Record<SkillName, string | number>>;

export function SkillBar({ skills }: { skills: SkillValues }) {
  const names: SkillName[] = [
    "vocabulary",
    "grammar",
    "reading",
    "listening",
    "writing",
    "speaking",
  ];
  return (
    <div className="skill-grid">
      {names.map((name) => (
        <div className="stat-card" key={name}>
          <span>{name}</span>
          <strong>{skills[name] ?? "—"}</strong>
        </div>
      ))}
    </div>
  );
}
