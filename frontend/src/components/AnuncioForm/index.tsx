import { useState, type FormEvent } from "react";
import Icon from "../Icon";
import { CATEGORIES } from "../../data/categories";
import "./index.css";

export interface AnuncioFormData {
  titulo: string;
  descricao: string;
  categoria: string;
  condicao: string;
  doacao: boolean;
  preco: string;
  contato: string;
  imagem: string;
}

interface AnuncioFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AnuncioFormData) => void;
}

const CONDICOES = ["Novo", "Seminovo", "Usado"];

const initialState: AnuncioFormData = {
  titulo: "",
  descricao: "",
  categoria: CATEGORIES[0].id,
  condicao: CONDICOES[1],
  doacao: false,
  preco: "",
  contato: "",
  imagem: "",
};

const AnuncioForm = ({ open, onClose, onSubmit }: AnuncioFormProps) => {
  const [form, setForm] = useState<AnuncioFormData>(initialState);

  if (!open) return null;

  const update = <K extends keyof AnuncioFormData>(key: K, value: AnuncioFormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    setForm(initialState);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>Anunciar novo item</h2>
            <p>Preencha os dados do item que deseja doar ou vender.</p>
          </div>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Fechar">
            ×
          </button>
        </div>

        <form className="anuncio-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Título</span>
            <input
              type="text"
              placeholder="Ex: Calculadora Científica"
              value={form.titulo}
              onChange={(e) => update("titulo", e.target.value)}
              required
            />
          </label>

          <label className="field">
            <span>Descrição</span>
            <textarea
              placeholder="Detalhes do item, motivo da venda/doação, alguma especificação..."
              rows={3}
              value={form.descricao}
              onChange={(e) => update("descricao", e.target.value)}
            />
          </label>

          <div className="field-row">
            <label className="field">
              <span>Categoria</span>
              <select value={form.categoria} onChange={(e) => update("categoria", e.target.value)}>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>Condição</span>
              <select value={form.condicao} onChange={(e) => update("condicao", e.target.value)}>
                {CONDICOES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="doar-box">
            <span className="doar-icon">
              <Icon src="/gift.svg" size={18} style={{ color: "#fff" }} />
            </span>
            <div className="doar-text">
              <strong>Doar este item</strong>
              <p>Marque se estiver doando gratuitamente</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={form.doacao}
                onChange={(e) => update("doacao", e.target.checked)}
              />
              <span className="switch-track" />
            </label>
          </div>

          {!form.doacao && (
            <label className="field">
              <span>Preço (R$)</span>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="0,00"
                value={form.preco}
                onChange={(e) => update("preco", e.target.value)}
              />
            </label>
          )}

          <label className="field">
            <span>Contato</span>
            <input
              type="text"
              placeholder="WhatsApp, email ou @instagram"
              value={form.contato}
              onChange={(e) => update("contato", e.target.value)}
            />
          </label>

          <label className="field">
            <span>Imagem</span>
            <input
              type="url"
              placeholder="https://..."
              value={form.imagem}
              onChange={(e) => update("imagem", e.target.value)}
            />
          </label>

          <div className="modal-actions">
            <button type="submit" className="btn btn-primary btn-block">Publicar anúncio</button>
            <button type="button" className="btn btn-outline btn-block" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AnuncioForm;
