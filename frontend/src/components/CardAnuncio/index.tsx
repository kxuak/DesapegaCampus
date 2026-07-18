import { useState } from "react";
import Icon from "../Icon";
import AnuncioDetalhes from "../AnuncioDetalhes";
import { getCategory } from "../../data/categories";
import type { Anuncio } from "../../data/anuncios";
import "./index.css";

interface CardAnuncioProps {
  anuncio: Anuncio;
  onSalvar?: (id: string) => void;
  onEditar?: (anuncio: Anuncio) => void;
  onExcluir?: (id: string) => void;
}

const CardAnuncio = ({ anuncio, onSalvar, onEditar, onExcluir }: CardAnuncioProps) => {
  const categoria = getCategory(anuncio.categoria);
  const precoLabel =
    anuncio.preco === null ? "Doação" : `R$ ${anuncio.preco.toFixed(2).replace(".", ",")}`;

  const [imagemFalhou, setImagemFalhou] = useState(false);
  const [detalhesAberto, setDetalhesAberto] = useState(false);

  const imagemSrc = anuncio.imagem;

  const temAcoes = Boolean(onEditar || onExcluir);

  return (
    <div
      className="card-anuncio"
      role="button"
      tabIndex={0}
      onClick={() => setDetalhesAberto(true)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setDetalhesAberto(true);
        }
      }}
    >
      <div className="card-anuncio-imagem">
        {imagemSrc && !imagemFalhou && (
            <img
              src={imagemSrc}
              alt={anuncio.titulo}
              className="card-anuncio-foto"
              loading="lazy"
              onError={() => setImagemFalhou(true)}
            />
          )}

          <span className="card-anuncio-badge" style={{ background: categoria.color }}>
            <Icon src={categoria.icon} size={14} style={{ color: "#fff" }} />
            {categoria.label}
          </span>

        {temAcoes && (
          <div className="card-anuncio-acoes">
            {onEditar && (
              <button
                type="button"
                className="card-anuncio-acao"
                aria-label="Editar anúncio"
                onClick={(e) => {
                  e.stopPropagation();
                  onEditar(anuncio);
                }}
              >
                <Icon src="/pencil.svg" size={15} />
              </button>
            )}
            {onExcluir && (
              <button
                type="button"
                className="card-anuncio-acao card-anuncio-acao-excluir"
                aria-label="Excluir anúncio"
                onClick={(e) => {
                  e.stopPropagation();
                  onExcluir(anuncio.id);
                }}
              >
                <Icon src="/trash.svg" size={15} />
              </button>
            )}
          </div>
        )}
      </div>

      <div className="card-anuncio-body">
        <h3 className="card-anuncio-titulo">{anuncio.titulo}</h3>
        <p className={`card-anuncio-preco ${anuncio.preco === null ? "doacao" : ""}`}>
          {precoLabel}
        </p>

        <div className="card-anuncio-footer">
          <span className="card-anuncio-tempo">
            <Icon src="/clock.svg" size={14} />
            {anuncio.tempo}
          </span>
          {!temAcoes && (
            <button
              type="button"
              className="card-anuncio-salvar"
              aria-label="Salvar anúncio"
              onClick={(e) => {
                e.stopPropagation();
                onSalvar?.(anuncio.id);
              }}
            >
              <Icon src="/bookmark.svg" size={16} />
            </button>
          )}
        </div>
      </div>

      {detalhesAberto && (
        <AnuncioDetalhes anuncio={anuncio} onClose={() => setDetalhesAberto(false)} />
      )}
    </div>
  );
};

export default CardAnuncio;
