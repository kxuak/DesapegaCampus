import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../components/Icon";
import CardCategory from "../../components/CardCategory";
import CardInfo from "../../components/CardInfo";
import CardAnuncio from "../../components/CardAnuncio";
import CardBeneficio from "../../components/CardBeneficio";
import CategoryButton from "../../components/CategoryButton";
import { CATEGORIES } from "../../data/categories";
import { listProducts, toAnuncio } from "../../lib/api";
import type { Anuncio } from "../../data/anuncios";
import "./index.css";

const ESTATISTICAS = [
  { icon: "/tag-starred.svg", valor: "1.247", label: "Anúncios publicados" },
  { icon: "/users.svg", valor: "892", label: "Estudantes Ativos" },
  { icon: "/gift.svg", valor: "343", label: "Itens Doados" },
  { icon: "/layout-2.svg", valor: "7", label: "Categorias" },
];

const BENEFICIOS = [
  { icon: "/recycle.svg", titulo: "Economia circular", descricao: "Dê uma nova vida a materiais acadêmicos que não serão mais usados." },
  { icon: "/handshake.svg", titulo: "Doe ou venda", descricao: "Anuncie gratuitamente — escolha doar ou definir um preço justo." },
  { icon: "/search.svg", titulo: "Economia circular", descricao: "Negocie com estudantes da sua própria universidade." },
];

const Home = () => {
  const [filtro, setFiltro] = useState("todos");
  const [vitrine, setVitrine] = useState<Anuncio[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    setCarregando(true);
    listProducts({ category: filtro === "todos" ? undefined : filtro, limit: 4 })
      .then((resposta) => setVitrine(resposta.items.map(toAnuncio)))
      .catch(() => setVitrine([]))
      .finally(() => setCarregando(false));
  }, [filtro]);

  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-inner">
            <h1>
              Dê uma nova chance aos <span>materiais do campus</span>.
            </h1>
            <p>
              O <strong>Desapega Campus</strong> conecta estudantes para doar, vender e encontrar livros,
              calculadoras, jalecos, componentes eletrônicos e muito mais — fortalecendo a economia circular
              dentro da universidade.
            </p>
            <div className="hero-actions">
              <Link to="/meus-anuncios?novo=1" className="btn btn-primary">
                <span className="btn-plus">+</span> Anunciar item
              </Link>
              <Link to="/anuncios" className="btn btn-outline">
                <Icon src="/search.svg" size={16} /> Buscar itens
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container section">
        <p className="section-eyebrow">CATEGORIAS</p>
        <h2 className="section-title">Tudo que circula no campus</h2>
        <p className="section-subtitle">Explore por categoria e encontre exatamente o que precisa para o próximo semestre.</p>

        <div className="categorias-grid">
          {CATEGORIES.map((c) => (
            <CardCategory key={c.id} categoria={c} />
          ))}
          <Link to="/anuncios" className="card-category card-category-all">
            <strong>Ver todos</strong>
            <span>Tudo que está rolando no desapego</span>
          </Link>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <p className="section-eyebrow">COMO FUNCIONA</p>
          <h2 className="section-title">Desapegar é simples assim</h2>
          <p className="section-subtitle">Três passos para transformar o que você não usa em oportunidade para outro estudante.</p>

          <div className="como-funciona-grid">
            <CardInfo numero={1} icon="/file-plus.svg" titulo="Crie seu anúncio" descricao="Tire uma foto, descreva o item e publique em segundos, sem burocracia." />
            <CardInfo numero={2} icon="/messages.svg" titulo="Receba contatos" descricao="Estudantes interessados te chamam pelo WhatsApp ou redes sociais que você informar." />
            <CardInfo numero={3} icon="/handshake.svg" titulo="Combine a entrega" descricao="Encontrem no campus, na biblioteca ou onde for mais prático para os dois." />
          </div>
        </div>
      </section>

      <section className="container section">
        <p className="section-eyebrow">ESTATÍSTICAS</p>
        <h2 className="section-title">A comunidade em números</h2>
        <p className="section-subtitle">Um movimento crescente dentro da universidade.</p>

        <div className="estatisticas-grid">
          {ESTATISTICAS.map((e) => (
            <div className="stat-card" key={e.label}>
              <span className="stat-icon"><Icon src={e.icon} size={18} /></span>
              <strong>{e.valor}</strong>
              <p>{e.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container section">
        <p className="section-eyebrow vitrine-eyebrow">VITRINE</p>
        <h2 className="section-title vitrine-title">Últimos anúncios</h2>
        <p className="section-subtitle vitrine-subtitle">Itens publicados pela comunidade estudantil.</p>

        <div className="vitrine-filtros">
          <CategoryButton label="Todos" active={filtro === "todos"} onClick={() => setFiltro("todos")} />
          {CATEGORIES.map((c) => (
            <CategoryButton key={c.id} label={c.label} active={filtro === c.id} onClick={() => setFiltro(c.id)} />
          ))}
        </div>

        <div className="vitrine-grid">
          {carregando && <p className="vitrine-empty">Carregando anúncios...</p>}
          {!carregando && vitrine.map((a) => (
            <CardAnuncio key={a.id} anuncio={a} />
          ))}
          {!carregando && vitrine.length === 0 && <p className="vitrine-empty">Nenhum anúncio nessa categoria ainda.</p>}
        </div>

        <div className="vitrine-cta">
          <Link to="/anuncios" className="btn btn-outline">
            <Icon src="/search.svg" size={16} /> Explorar todos os anúncios
          </Link>
        </div>
      </section>

      <section className="container section">
        <p className="section-eyebrow">BENEFÍCIOS</p>
        <h2 className="section-title">Por que usar o Desapega Campus</h2>

        <div className="beneficios-grid">
          {BENEFICIOS.map((b, i) => (
            <CardBeneficio key={i} {...b} />
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="cta-banner">
          <h2>Pronto para dar uma nova vida aos seus materiais?</h2>
          <p>Anuncie grátis, doe ou venda para quem está precisando. Seu item parado pode ser a solução de outro estudante.</p>
          <div className="cta-actions">
            <Link to="/meus-anuncios?novo=1" className="btn btn-primary">
              Anunciar agora <Icon src="/arrow-narrow-right.svg" size={16} style={{ color: "#fff" }} />
            </Link>
            <Link to="/anuncios" className="btn btn-outline">Explorar anúncios</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
