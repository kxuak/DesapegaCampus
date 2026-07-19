export interface Anuncio {
  id: string;
  titulo: string;
  categoria: string;
  preco: number | null;
  tempo: string;
  imagem?: string;
  descricao?: string;
  condicao?: string;
  contato?: string;
}