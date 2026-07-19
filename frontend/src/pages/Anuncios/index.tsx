import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Icon from "../../components/Icon";
import CategoryButton from "../../components/CategoryButton";
import CardAnuncio from "../../components/CardAnuncio";
import { CATEGORIES } from "../../data/categories";
import { listProducts, toAnuncio } from "../../lib/api";
import type { Anuncio } from "../../data/anuncios";
import "./index.css";

const Anuncios = () => {
  const [searchParams] = useSearchParams();
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState(searchParams.get("categoria") ?? "todos");
  const [resultados, setResultados] = useState<Anuncio[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    setCarregando(true);
    setErro(null);

    const timeout = setTimeout(() => {
      listProducts({
        category: categoria === "todos" ? undefined : categoria,
        search: busca || undefined,
        limit: 60,
      })
        .then((resposta) => setResultados(resposta.items.map(toAnuncio)))
        .catch((err) => setErro(err instanceof Error ? err.message : "Não foi possível carregar os anúncios."))
        .finally(() => setCarregando(false));
    }, 300);

    return () => clearTimeout(timeout);
  }, [busca, categoria]);

  return (
    <div className="container anuncios-page">
      <Link to="/home" className="voltar-link">
        <Icon src="/arrow-narrow-right.svg" size={14} style={{ transform: "rotate(180deg)" }} /> Voltar ao início
      </Link>

      <h1>Explorar anúncios</h1>
      <p className="anuncios-subtitle">Itens anunciados pela comunidade estudantil — aqui você encontra o que precisa.</p>

      <div className="busca-box">
        <Icon src="/search.svg" size={16} />
        <input
          type="text"
          placeholder="Buscar por título..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      <div className="filtros">
        <CategoryButton label="Todos" active={categoria === "todos"} onClick={() => setCategoria("todos")} />
        {CATEGORIES.map((c) => (
          <CategoryButton key={c.id} label={c.label} active={categoria === c.id} onClick={() => setCategoria(c.id)} />
        ))}
      </div>

      {carregando && <p className="anuncios-empty">Carregando anúncios...</p>}

      {!carregando && erro && <p className="anuncios-empty">{erro}</p>}

      {!carregando && !erro && (
        <div className="anuncios-grid">
          {resultados.map((a) => (
            <CardAnuncio key={a.id} anuncio={a} />
          ))}
          {resultados.length === 0 && <p className="anuncios-empty">Nenhum anúncio encontrado.</p>}
        </div>
      )}
    </div>
  );
};

export default Anuncios;
