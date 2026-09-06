import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { logout } from "../../store/store";

export function Header() {
  const { token, user, dispatch } = useAuth();
  return (
    <header className="header wrap">
      <Link className="logo" to="/">
        ARABI<span>YA</span>
      </Link>
      <nav>
        {token ? (
          <>
            <Link to="/dashboard">Мой путь</Link>
            <Link to="/lessons">Учебник</Link>
            <Link to="/clubs">Клубы</Link>
            <Link to="/profile">Профиль</Link>
            {user?.email.endsWith("@admin.local") && <Link to="/admin/lessons">Админ</Link>}
            <button className="text-btn" onClick={() => dispatch(logout())}>
              Выйти
            </button>
          </>
        ) : (
          <>
            <Link to="/lessons">Учебник</Link>
            <Link to="/clubs">Клубы</Link>
            <Link to="/login">Войти</Link>
          </>
        )}
      </nav>
    </header>
  );
}
