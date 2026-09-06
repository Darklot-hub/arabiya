import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Loader } from "../components/common/Loader";
import { LinkButton } from "../components/common/LinkButton";
import type { Club } from "../types";

export function Clubs() {
  const [clubs, setClubs] = useState<Club[]>([]);
  useEffect(() => {
    api<{ items: Club[] }>("/clubs").then((x) => setClubs(x.items));
  }, []);
  if (!clubs.length) return <Loader />;
  return (
    <main className="wrap page-shell">
      <div className="eyebrow">ARABIYA CLUBS</div>
      <h1>Практика после урока</h1>
      <p className="lead">Два формата: говорим и читаем</p>
      <div className="card-grid">
        {clubs.map((c) => (
          <article className="card" key={c._id}>
            <span>{c.type === "speaking" ? "РАЗГОВОРНЫЙ" : "ЧИТАТЕЛЬСКИЙ"} КЛУБ</span>
            <h2>{c.title}</h2>
            <p>{c.description}</p>
            <p>
              <b>{c.schedule}</b>
            </p>
            <LinkButton to="/profile">Записаться →</LinkButton>
          </article>
        ))}
      </div>
    </main>
  );
}
