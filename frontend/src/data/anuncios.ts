export interface Anuncio {
  id: string;
  titulo: string;
  categoria: string;
  preco: number | null; // null = doação
  tempo: string;
  imagem?: string;
}

// Mock local — troque por fetch() no seu backend quando estiver pronto.
export const ANUNCIOS: Anuncio[] = [
  { id: "1", titulo: "Calculadora Científica Casio", categoria: "engenharia", preco: 80, tempo: "há cerca de 5 horas" },
  { id: "2", titulo: "Livro Cálculo Vol. 1 — Thomas", categoria: "livros", preco: 45, tempo: "há cerca de 9 horas" },
  { id: "3", titulo: "Memória RAM", categoria: "computacao", preco: null, tempo: "há cerca de 10 horas" },
  { id: "4", titulo: "Notebook Lenovo", categoria: "eletronicos", preco: 850, tempo: "12/07/2026" },
  { id: "5", titulo: "Banco de capacitores e resistores", categoria: "engenharia", preco: 80, tempo: "há cerca de 5 horas" },
  { id: "6", titulo: "Kit xerox — Cálculo 2 completo", categoria: "livros", preco: 45, tempo: "há cerca de 9 horas" },
  { id: "7", titulo: "Arduino Uno R3 + protoboard", categoria: "computacao", preco: null, tempo: "há cerca de 10 horas" },
  { id: "8", titulo: "Headphone com fio para aulas", categoria: "eletronicos", preco: 850, tempo: "12/07/2026" },
  { id: "9", titulo: "Cadeira de escritório ergonômica", categoria: "mobiliario", preco: 80, tempo: "há cerca de 5 horas" },
  { id: "10", titulo: "Mesa de estudos branca", categoria: "mobiliario", preco: 45, tempo: "há cerca de 9 horas" },
  { id: "11", titulo: "Jaleco branco tamanho M", categoria: "vestuario", preco: null, tempo: "há cerca de 10 horas" },
  { id: "12", titulo: "Bata de laboratório química", categoria: "vestuario", preco: 850, tempo: "12/07/2026" },
];
