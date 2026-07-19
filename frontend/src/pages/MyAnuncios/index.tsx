import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Icon from "../../components/Icon";
import CardAnuncio from "../../components/CardAnuncio";
import AnuncioForm, { type AnuncioFormData } from "../../components/AnuncioForm";
import { createProduct, deleteProduct, listMyProducts, toAnuncio, updateProduct, type ProductPayload } from "../../lib/api";
import { getOwnerId } from "../../lib/ownerId";
import type { Anuncio } from "../../data/anuncios";
import "./index.css";


const paraPayload = (data: AnuncioFormData, ownerId: string): ProductPayload => ({
  title: data.titulo,
  description: data.descricao,
  category: data.categoria,
  condition: data.condicao || undefined,
  isDonation: data.doacao,
  price: !data.doacao && data.preco !== "" ? Number(data.preco) : undefined,
  image: data.imagem || undefined,
  contact: data.contato || undefined,
  ownerId,
});

const MyAnuncios = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [meusAnuncios, setMeusAnuncios] = useState<Anuncio[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erroCarregar, setErroCarregar] = useState<string | null>(null);
  const [editando, setEditando] = useState<Anuncio | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [erroForm, setErroForm] = useState<string | null>(null);
  const formAberto = searchParams.get("novo") === "1";

  const ownerId = getOwnerId();

  const carregarAnuncios = () => {
    setCarregando(true);
    setErroCarregar(null);
    listMyProducts(ownerId)
      .then((produtos) => setMeusAnuncios(produtos.map(toAnuncio)))
      .catch((err) => setErroCarregar(err instanceof Error ? err.message : "Não foi possível carregar seus anúncios."))
      .finally(() => setCarregando(false));
  };

  useEffect(() => {
    carregarAnuncios();
  }, []);

  const abrirForm = () => {
    setEditando(null);
    setErroForm(null);
    setSearchParams({ novo: "1" });
  };

  const abrirEdicao = (anuncio: Anuncio) => {
    setEditando(anuncio);
    setErroForm(null);
    setSearchParams({ novo: "1" });
  };

  const fecharForm = () => {
    setSearchParams({});
    setEditando(null);
    setErroForm(null);
  };

  const handleExcluir = async (id: string) => {
    if (!window.confirm("Tem certeza que deseja excluir este anúncio?")) return;
    try {
      await deleteProduct(id, ownerId);
      setMeusAnuncios((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      window.alert(err instanceof Error ? err.message : "Não foi possível excluir o anúncio.");
    }
  };

  const handlePublicar = async (data: AnuncioFormData) => {
    setEnviando(true);
    setErroForm(null);

    try {
      const payload = paraPayload(data, ownerId);

      if (editando) {
        const atualizado = await updateProduct(editando.id, payload);
        setMeusAnuncios((prev) => prev.map((a) => (a.id === editando.id ? toAnuncio(atualizado) : a)));
      } else {
        const criado = await createProduct(payload);
        setMeusAnuncios((prev) => [toAnuncio(criado), ...prev]);
      }

      fecharForm();
    } catch (err) {
      setErroForm(err instanceof Error ? err.message : "Não foi possível salvar o anúncio.");
    } finally {
      setEnviando(false);
    }
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

      {carregando && <p className="my-anuncios-empty">Carregando seus anúncios...</p>}

      {!carregando && erroCarregar && (
        <div className="my-anuncios-empty">
          <p>{erroCarregar}</p>
          <button type="button" className="btn btn-outline" onClick={carregarAnuncios}>Tentar novamente</button>
        </div>
      )}

      {!carregando && !erroCarregar && meusAnuncios.length > 0 && (
        <div className="my-anuncios-grid">
          {meusAnuncios.map((a) => (
            <CardAnuncio key={a.id} anuncio={a} onEditar={abrirEdicao} onExcluir={handleExcluir} />
          ))}
        </div>
      )}

      {!carregando && !erroCarregar && meusAnuncios.length === 0 && (
        <div className="my-anuncios-empty">
          <p>Nenhum anúncio encontrado. Você ainda não publicou nada por aqui.</p>
          <button type="button" className="btn btn-primary" onClick={abrirForm}>Anunciar meu primeiro item</button>
        </div>
      )}

      <AnuncioForm
        open={formAberto}
        onClose={fecharForm}
        onSubmit={handlePublicar}
        anuncioEditando={editando}
        submitting={enviando}
        errorMessage={erroForm}
      />
    </div>
  );
};

export default MyAnuncios;
