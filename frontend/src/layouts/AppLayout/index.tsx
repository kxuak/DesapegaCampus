import { useEffect, useState } from "react";
import { NavLink, Outlet, Link, useLocation } from "react-router-dom";
import Icon from "../../components/Icon";
import { useTheme } from "../../context/ThemeContext";
import "./index.css";

// 👉 TROQUE AQUI pelos seus links reais
const INSTAGRAM_URL = "https://instagram.com/seu_usuario";
const PORTFOLIO_URL = "https://seuportfolio.com";

const AppLayout = () => {
  const { theme, toggleTheme } = useTheme();
  const [menuAberto, setMenuAberto] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="app-layout">
      <header className="navbar">
        <div className="container navbar-inner">
          <Link to="/home" className="navbar-brand" onClick={() => setMenuAberto(false)}>
            <span className="navbar-logo" />
            <span>
              Desapega
              <small>CAMPUS</small>
            </span>
          </Link>

          <nav className={`navbar-nav ${menuAberto ? "open" : ""}`}>
            <NavLink to="/home" className={({ isActive }) => `navbar-link ${isActive ? "active" : ""}`} onClick={() => setMenuAberto(false)}>
              <Icon src="/home.svg" size={16} /> Início
            </NavLink>
            <NavLink to="/anuncios" className={({ isActive }) => `navbar-link ${isActive ? "active" : ""}`} onClick={() => setMenuAberto(false)}>
              <Icon src="/search.svg" size={16} /> Explorar anúncios
            </NavLink>
            <NavLink to="/meus-anuncios" className={({ isActive }) => `navbar-link ${isActive ? "active" : ""}`} onClick={() => setMenuAberto(false)}>
              <Icon src="/layout-2.svg" size={16} /> Meus anúncios
            </NavLink>
            <Link to="/meus-anuncios?novo=1" className="btn btn-primary btn-block navbar-cta-mobile" onClick={() => setMenuAberto(false)}>
              <span className="btn-plus">+</span> Anunciar item
            </Link>
          </nav>

          <div className="navbar-actions">
            <Link to="/meus-anuncios?novo=1" className="btn btn-primary navbar-cta-desktop">
              <span className="btn-plus">+</span> Anunciar item
            </Link>
            <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label="Alternar tema">
              <Icon src={theme === "dark" ? "/moon.svg" : "/sun.svg"} size={18} />
            </button>
            <button
              type="button"
              className={`menu-toggle ${menuAberto ? "open" : ""}`}
              onClick={() => setMenuAberto((v) => !v)}
              aria-label="Abrir menu"
              aria-expanded={menuAberto}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <main>
        <div key={location.pathname} className="page-transition">
          <Outlet />
        </div>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="footer-brand">
            <span className="footer-vortex-icon">
              <Icon src="/brand-instagram.svg" size={16} style={{ color: "#fff" }} />
            </span>
            VORTEX
          </a>

          <div className="footer-copy">
            <p>© 2026 Desapega Campus</p>
            <p>Conectando estudantes e construindo um campus mais colaborativo e sustentável.</p>
          </div>

          <div className="footer-cta">
            <span className="footer-cta-icon">
              <Icon src="/rocket.svg" size={16} style={{ color: "#fff" }} />
            </span>
            <div>
              <strong>Gostou do projeto?</strong>
              <p>Veja mais projetos e soluções no meu portfólio</p>
              <a href={PORTFOLIO_URL} target="_blank" rel="noreferrer" className="footer-cta-link">
                Acessar portfólio <Icon src="/arrow-narrow-right.svg" size={13} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
