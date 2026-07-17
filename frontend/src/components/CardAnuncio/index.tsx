import { useState } from "react";
import Icon from "../Icon";
import { getCategory } from "../../data/categories";
import type { Anuncio } from "../../data/anuncios";
import "./index.css";

interface CardAnuncioProps {
  anuncio: Anuncio;
  onSalvar?: (id: string) => void;
}

const CardAnuncio = ({ anuncio, onSalvar }: CardAnuncioProps) => {
  const categoria = getCategory(anuncio.categoria);
  const precoLabel =
    anuncio.preco === null ? "Doação" : `R$ ${anuncio.preco.toFixed(2).replace(".", ",")}`;

  const [imagemFalhou, setImagemFalhou] = useState(false);
  
  const imagemSrc = anuncio.imagem ?? `https://picsum.photos/seed/${anuncio.id}/400/300`;

  return (
    <div className="card-anuncio">
      <div className="card-anuncio-imagem">
        {!imagemFalhou && (
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
          <button
            type="button"
            className="card-anuncio-salvar"
            aria-label="Salvar anúncio"
            onClick={() => onSalvar?.(anuncio.id)}
          >
            <Icon src="/bookmark.svg" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardAnuncio;
