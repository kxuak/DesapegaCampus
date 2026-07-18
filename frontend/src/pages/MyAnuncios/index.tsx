import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Icon from "../../components/Icon";
import CardAnuncio from "../../components/CardAnuncio";
import AnuncioForm, { type AnuncioFormData } from "../../components/AnuncioForm";
import type { Anuncio } from "../../data/anuncios";
import "./index.css";

const MyAnuncios = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [meusAnuncios, setMeusAnuncios] = useState<Anuncio[]>([]);
  const [editando, setEditando] = useState<Anuncio | null>(null);
  const formAberto = searchParams.get("novo") === "1";

  const abrirForm = () => {
    setEditando(null);
    setSearchParams({ novo: "1" });
  };

  const abrirEdicao = (anuncio: Anuncio) => {
    setEditando(anuncio);
    setSearchParams({ novo: "1" });
  };

  const fecharForm = () => {
    setSearchParams({});
    setEditando(null);
  };

  const handleExcluir = (id: string) => {
    if (!window.confirm("Tem certeza que deseja excluir este anúncio?")) return;
    setMeusAnuncios((prev) => prev.filter((a) => a.id !== id));
  };

  const handlePublicar = (data: AnuncioFormData) => {
    if (editando) {
      setMeusAnuncios((prev) =>
        prev.map((a) =>
          a.id === editando.id
            ? {
                ...a,
                titulo: data.titulo,
                categoria: data.categoria,
                preco: data.doacao || !data.preco ? null : Number(data.preco),
                imagem: data.imagem || a.imagem,
                descricao: data.descricao,
                condicao: data.condicao,
                contato: data.contato,
              }
            : a
        )
      );
    } else {
      const novoAnuncio: Anuncio = {
        id: String(Date.now()),
        titulo: data.titulo,
        categoria: data.categoria,
        preco: data.doacao || !data.preco ? null : Number(data.preco),
        tempo: "agora mesmo",
        imagem: data.imagem || undefined,
        descricao: data.descricao,
        condicao: data.condicao,
        contato: data.contato,
      };
      setMeusAnuncios((prev) => [novoAnuncio, ...prev]);
    }
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
            <CardAnuncio key={a.id} anuncio={a} onEditar={abrirEdicao} onExcluir={handleExcluir} />
          ))}
        </div>
      ) : (
        <div className="my-anuncios-empty">
          <p>Nenhum anúncio encontrado. Você ainda não publicou nada por aqui.</p>
          <button type="button" className="btn btn-primary" onClick={abrirForm}>Anunciar meu primeiro item</button>
        </div>
      )}

      <AnuncioForm open={formAberto} onClose={fecharForm} onSubmit={handlePublicar} anuncioEditando={editando} />
    </div>
  );
};

export default MyAnuncios;
