import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <footer className="wrap footer">ARABIYA · арабский по твоей цели</footer>
    </>
  );
}
