import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Icon from "../../components/Icon";
import CardAnuncio from "../../components/CardAnuncio";
import AnuncioForm, { type AnuncioFormData } from "../../components/AnuncioForm";
import { ANUNCIOS, type Anuncio } from "../../data/anuncios";
import "./index.css";

const MyAnuncios = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [meusAnuncios, setMeusAnuncios] = useState<Anuncio[]>(ANUNCIOS.slice(0, 4));
  const formAberto = searchParams.get("novo") === "1";

  const abrirForm = () => setSearchParams({ novo: "1" });
  const fecharForm = () => setSearchParams({});

  const handlePublicar = (data: AnuncioFormData) => {
    const novoAnuncio: Anuncio = {
      id: String(Date.now()),
      titulo: data.titulo,
      categoria: data.categoria,
      preco: data.doacao || !data.preco ? null : Number(data.preco),
      tempo: "agora mesmo",
    };
    setMeusAnuncios((prev) => [novoAnuncio, ...prev]);
    fecharForm();
  };

  return (
    <div className="container my-anuncios-page">
      <Link to="/home" className="voltar-link">
        <Icon src="/arrow-narrow-right.svg" size={14} style={{ transform: "rotate(180deg)" }} /> Voltar ao início
      </Link>

      <div className="my-anuncios-header">
        <div>
          <h1>Meus anúncios</h1>
          <p>Gerencie os itens que você colocou à venda de forma rápida e organizada.</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={abrirForm}>
          <span className="btn-plus">+</span> Anunciar item
        </button>
      </div>

      {meusAnuncios.length > 0 ? (
        <div className="my-anuncios-grid">
          {meusAnuncios.map((a) => (
            <CardAnuncio key={a.id} anuncio={a} />
          ))}
        </div>
      ) : (
        <div className="my-anuncios-empty">
          <p>Você ainda não publicou nenhum anúncio.</p>
          <button type="button" className="btn btn-primary" onClick={abrirForm}>Anunciar meu primeiro item</button>
        </div>
      )}

      <AnuncioForm open={formAberto} onClose={fecharForm} onSubmit={handlePublicar} />
    </div>
  );
};

export default MyAnuncios;
