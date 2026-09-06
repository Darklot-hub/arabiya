import { LinkButton } from "../components/common/LinkButton";
import { goals } from "../data";

export function Landing() {
  return (
    <main>
      <section className="hero wrap">
        <div>
          <div className="eyebrow">ARABIYA · LANGUAGE LAB</div>
          <h1>
            Арабский,
            <br />
            <em>который работает</em> на тебя
          </h1>
          <p className="lead">
            Диагностика определяет твой уровень и собирает маршрут под цель: разговорный, бизнес,
            путешествия, IT или чтение
          </p>
          <div className="actions">
            <LinkButton to="/diagnostic">Пройти диагностику →</LinkButton>
            <LinkButton to="/lessons" variant="ghost">
              Открыть учебник
            </LinkButton>
          </div>
        </div>
        <div className="hero-card">
          <span>من أين نبدأ؟</span>
          <strong>С твоей цели</strong>
          <p>A1 → C1 · уроки · практика · клубы</p>
        </div>
      </section>
      <section className="wrap section">
        <div className="eyebrow">ЧТО МЫ ПРЕДЛАГАЕМ</div>
        <h2>Не один курс для всех</h2>
        <div className="card-grid">
          {goals.map((g) => (
            <article className="card" key={g.id}>
              <span className="arabic-sm">
                {g.id === "conversation"
                  ? "محادثة"
                  : g.id === "business"
                    ? "أعمال"
                    : g.id === "travel"
                      ? "سفر"
                      : g.id === "it"
                        ? "تقنية"
                        : "قراءة"}
              </span>
              <h3>{g.title}</h3>
              <p>{g.description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="wrap section clubs-intro">
        <div>
          <div className="eyebrow">КЛУБЫ</div>
          <h2>Язык должен выходить за пределы урока</h2>
          <p className="lead">Разговорный и читательский клубы для работы с настоящими текстами</p>
        </div>
        <LinkButton to="/clubs">Посмотреть клубы →</LinkButton>
      </section>
    </main>
  );
}
