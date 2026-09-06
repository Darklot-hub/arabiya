export function Loader({ label = "Загрузка…" }: { label?: string }) {
  return (
    <div className="loader-wrap">
      <div className="loader" />
      <span>{label}</span>
    </div>
  );
}
