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

export const ANUNCIOS: Anuncio[] = [
  {
    id: "1",
    titulo: "Calculadora Científica Casio",
    categoria: "engenharia",
    preco: null,
    tempo: "Há 5 dias",
    imagem: "/calculadora.png",
    descricao: "Calculadora científica em ótimo estado, poucas marcas de uso. Ideal para quem está cursando engenharia ou exatas.",
    condicao: "Seminovo",
    contato: "(85) 99123-4567",
  },

  {
    id: "2",
    titulo: "Notebook Lenovo",
    categoria: "eletronicos",
    preco: 850,
    tempo: "Há 5 dias",
    imagem: "/laptop.png",
    descricao: "Notebook Lenovo com 8GB de RAM e SSD, ótimo para estudos e programação. Bateria ainda dura bastante.",
    condicao: "Usado",
    contato: "(85) 99234-5678",
  },

  {
    id: "3",
    titulo: "Livro de Cálculo",
    categoria: "livros",
    preco: 45,
    tempo: "Há 5 dias",
    imagem: "/livro.png",
    descricao: "Livro de Cálculo I usado em um semestre, sem rasuras, capa em bom estado.",
    condicao: "Usado",
    contato: "(85) 99345-6789",
  },

  {
    id: "4",
    titulo: "Cadeira de Escritório",
    categoria: "mobiliario",
    preco: 250,
    tempo: "Há 5 dias",
    imagem: "/cadeira.png",
    descricao: "Cadeira de escritório ergonômica, ajuste de altura e apoio de braço. Muito confortável para longas horas de estudo.",
    condicao: "Seminovo",
    contato: "(85) 99456-7890",
  },

  {
    id: "5",
    titulo: "Kit Arduino Uno",
    categoria: "computacao",
    preco: 120,
    tempo: "Há 5 dias",
    imagem: "/hardware.png",
    descricao: "Kit Arduino Uno completo com jumpers, protoboard e sensores básicos. Perfeito para projetos de automação.",
    condicao: "Novo",
    contato: "(85) 99567-8901",
  },

  {
    id: "6",
    titulo: "Fone JBL",
    categoria: "eletronicos",
    preco: 180,
    tempo: "Há 5 dias",
    imagem: "/fone.png",
    descricao: "Fone JBL com case original, bateria com boa autonomia, sem riscos.",
    condicao: "Seminovo",
    contato: "(85) 99678-9012",
  },

  {
    id: "7",
    titulo: "Memória RAM",
    categoria: "computacao",
    preco: 620,
    tempo: "Há 5 dias",
    imagem: "/memoria-ram.png",
    descricao: "Memória RAM 16GB DDR4, testada e funcionando perfeitamente.",
    condicao: "Usado",
    contato: "(85) 99789-0123",
  },

  {
    id: "8",
    titulo: "Livro Estruturas de Dados",
    categoria: "livros",
    preco:null,
    tempo: "Há 5 dias",
    imagem: "/livro.png",
    descricao: "Livro de Estruturas de Dados em bom estado, com alguns grifos a lápis.",
    condicao: "Usado",
    contato: "(85) 99890-1234",
  },

  {
    id: "9",
    titulo: "Placa de video",
    categoria: "engenharia",
    preco: 950,
    tempo: "Há 5 dias",
    imagem: "/hardware.png",
    descricao: "Placa de vídeo usada em setup de estudos, sem overclock, sempre bem ventilada.",
    condicao: "Usado",
    contato: "(85) 99901-2345",
  },

  {
    id: "10",
    titulo: "Mesa de estudos branca",
    categoria: "mobiliario",
    preco: 230,
    tempo: "Há 5 dias",
    imagem: "/mesa.png",
    descricao: "Mesa de estudos branca, tamanho médio, ótima para quarto ou home office.",
    condicao: "Seminovo",
    contato: "(85) 99012-3456",
  },

  {
    id: "11",
    titulo: "Jaleco branco tamanho M",
    categoria: "vestuario",
    preco: null,
    tempo: "Há 5 dias",
    imagem: "/jaleco.png",
    descricao: "Jaleco branco tamanho M, usado poucas vezes em laboratório.",
    condicao: "Seminovo",
    contato: "(85) 99123-9876",
  },

  {
    id: "12",
    titulo: "Bata de laboratório química",
    categoria: "vestuario",
    preco: 32,
    tempo: "Há 5 dias",
    imagem: "/bata.png",
    descricao: "Bata de laboratório de química, tamanho único, tecido resistente a respingos.",
    condicao: "Novo",
    contato: "(85) 99234-8765",
  },
];
