
import * as db from "./index";

const SEED_OWNER_ID = "00000000-seed-demo-ads-000000000000";

interface DemoAd {
  id: string;
  title: string;
  description: string;
  category: string;
  condition: string;
  price: number | null;
  image: string;
  contact: string;
  daysAgo: number;
}

const DEMO_ADS: DemoAd[] = [
  {
    id: "seed-0001",
    title: "Calculadora Científica Casio",
    description:
      "Calculadora científica em ótimo estado, poucas marcas de uso. Ideal para quem está cursando engenharia ou exatas.",
    category: "engenharia",
    condition: "Seminovo",
    price: null,
    image: "/calculadora.png",
    contact: "(85) 99123-4567",
    daysAgo: 2,
  },
  {
    id: "seed-0002",
    title: "Notebook Lenovo",
    description:
      "Notebook Lenovo com 8GB de RAM e SSD, ótimo para estudos e programação. Bateria ainda dura bastante.",
    category: "eletronicos",
    condition: "Usado",
    price: 850,
    image: "/laptop.png",
    contact: "(85) 99234-5678",
    daysAgo: 3,
  },
  {
    id: "seed-0003",
    title: "Livro de Cálculo",
    description: "Livro de Cálculo I usado em um semestre, sem rasuras, capa em bom estado.",
    category: "livros",
    condition: "Usado",
    price: 45,
    image: "/livro.png",
    contact: "(85) 99345-6789",
    daysAgo: 4,
  },
  {
    id: "seed-0004",
    title: "Cadeira de Escritório",
    description:
      "Cadeira de escritório ergonômica, ajuste de altura e apoio de braço. Muito confortável para longas horas de estudo.",
    category: "mobiliario",
    condition: "Seminovo",
    price: 250,
    image: "/cadeira.png",
    contact: "(85) 99456-7890",
    daysAgo: 5,
  },
  {
    id: "seed-0005",
    title: "Kit Arduino Uno",
    description:
      "Kit Arduino Uno completo com jumpers, protoboard e sensores básicos. Perfeito para projetos de automação.",
    category: "computacao",
    condition: "Novo",
    price: 120,
    image: "/hardware.png",
    contact: "(85) 99567-8901",
    daysAgo: 1,
  },
  {
    id: "seed-0006",
    title: "Fone JBL",
    description: "Fone JBL com case original, bateria com boa autonomia, sem riscos.",
    category: "eletronicos",
    condition: "Seminovo",
    price: 180,
    image: "/fone.png",
    contact: "(85) 99678-9012",
    daysAgo: 6,
  },
  {
    id: "seed-0007",
    title: "Memória RAM",
    description: "Memória RAM 16GB DDR4, testada e funcionando perfeitamente.",
    category: "computacao",
    condition: "Usado",
    price: 620,
    image: "/memoria-ram.png",
    contact: "(85) 99789-0123",
    daysAgo: 7,
  },
  {
    id: "seed-0008",
    title: "Livro Estruturas de Dados",
    description: "Livro de Estruturas de Dados em bom estado, com alguns grifos a lápis.",
    category: "livros",
    condition: "Usado",
    price: null,
    image: "/livro.png",
    contact: "(85) 99890-1234",
    daysAgo: 8,
  },
  {
    id: "seed-0009",
    title: "Placa de vídeo",
    description: "Placa de vídeo usada em setup de estudos, sem overclock, sempre bem ventilada.",
    category: "engenharia",
    condition: "Usado",
    price: 950,
    image: "/hardware.png",
    contact: "(85) 99901-2345",
    daysAgo: 9,
  },
  {
    id: "seed-0010",
    title: "Mesa de estudos branca",
    description: "Mesa de estudos branca, tamanho médio, ótima para quarto ou home office.",
    category: "mobiliario",
    condition: "Seminovo",
    price: 230,
    image: "/mesa.png",
    contact: "(85) 99012-3456",
    daysAgo: 10,
  },
  {
    id: "seed-0011",
    title: "Jaleco branco tamanho M",
    description: "Jaleco branco tamanho M, usado poucas vezes em laboratório.",
    category: "vestuario",
    condition: "Seminovo",
    price: null,
    image: "/jaleco.png",
    contact: "(85) 99123-9876",
    daysAgo: 11,
  },
  {
    id: "seed-0012",
    title: "Bata de laboratório química",
    description: "Bata de laboratório de química, tamanho único, tecido resistente a respingos.",
    category: "vestuario",
    condition: "Novo",
    price: 32,
    image: "/bata.png",
    contact: "(85) 99234-8765",
    daysAgo: 12,
  },
];

function isoDaysAgo(days: number): string {
  const d = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  return d.toISOString().slice(0, 19).replace("T", " ");
}

export function seedDemoAds() {
  let inseridos = 0;

  for (const ad of DEMO_ADS) {
    const existente = db.get("SELECT id FROM products WHERE id = :id", { ":id": ad.id });
    if (existente) continue;

    db.run(
      `INSERT INTO products (id, title, description, category, "condition", price, is_donation, image, contact, owner_id, created_at)
       VALUES (:id, :title, :description, :category, :condition, :price, :is_donation, :image, :contact, :owner_id, :created_at)`,
      {
        ":id": ad.id,
        ":title": ad.title,
        ":description": ad.description,
        ":category": ad.category,
        ":condition": ad.condition,
        ":price": ad.price,
        ":is_donation": ad.price === null ? 1 : 0,
        ":image": ad.image,
        ":contact": ad.contact,
        ":owner_id": SEED_OWNER_ID,
        ":created_at": isoDaysAgo(ad.daysAgo),
      }
    );
    inseridos++;
  }

  if (inseridos > 0) {
    console.log(`Seed de anúncios demo: ${inseridos} inserido(s).`);
  }
}
