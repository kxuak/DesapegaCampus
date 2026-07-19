import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Icon from "../Icon";
import { getCategory } from "../../data/categories";
import type { Anuncio } from "../../data/anuncios";
import "./index.css";

interface AnuncioDetalhesProps {
  anuncio: Anuncio;
  onClose: () => void;
}

const AnuncioDetalhes = ({ anuncio, onClose }: AnuncioDetalhesProps) => {
  const categoria = getCategory(anuncio.categoria);
  const precoLabel =
    anuncio.preco === null ? "Doação" : `R$ ${anuncio.preco.toFixed(2).replace(".", ",")}`;

  const [imagemFalhou, setImagemFalhou] = useState(false);
  
  const imagemSrc = anuncio.imagem;

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return createPortal(
    <div
      className="anuncio-detalhes-overlay"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <div className="anuncio-detalhes-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="anuncio-detalhes-close" onClick={onClose} aria-label="Fechar">
          ×
        </button>

        <div className="anuncio-detalhes-imagem">
          {imagemSrc && !imagemFalhou && (
            <img
              src={imagemSrc}
              alt={anuncio.titulo}
              className="anuncio-detalhes-foto"
              onError={() => setImagemFalhou(true)}
            />
          )}
          <span className="anuncio-detalhes-badge" style={{ background: categoria.color }}>
            <Icon src={categoria.icon} size={14} style={{ color: "#fff" }} />
            {categoria.label}
          </span>
        </div>

        <div className="anuncio-detalhes-body">
          <div className="anuncio-detalhes-header">
            <h2>{anuncio.titulo}</h2>
            <p className={`anuncio-detalhes-preco ${anuncio.preco === null ? "doacao" : ""}`}>
              {precoLabel}
            </p>
          </div>

          <div className="anuncio-detalhes-meta">
            <span className="anuncio-detalhes-meta-item">
              <Icon src="/clock.svg" size={14} />
              {anuncio.tempo}
            </span>
            {anuncio.condicao && (
              <span className="anuncio-detalhes-meta-item">
                <Icon src="/tag-starred.svg" size={14} />
                {anuncio.condicao}
              </span>
            )}
          </div>

          <div className="anuncio-detalhes-secao">
            <h3>Descrição</h3>
            <p>{anuncio.descricao || "O anunciante não adicionou uma descrição para este item."}</p>
          </div>

          {anuncio.contato && (
            <div className="anuncio-detalhes-secao">
              <h3>Contato</h3>
              <p className="anuncio-detalhes-contato">
                <Icon src="/messages.svg" size={16} />
                {anuncio.contato}
              </p>
            </div>
          )}

          <button type="button" className="btn btn-primary btn-block" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AnuncioDetalhes;
