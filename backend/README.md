# Backend — Marketplace de Economia Circular (Desapego Universitário)

API REST do desafio técnico do Laboratório Vortex. Node.js + TypeScript + Express + SQLite (via `sql.js`, sem ORM — SQL puro).

Não tem sistema de login/conta — é um modelo tipo OLX: qualquer pessoa pode criar um anúncio informando nome e contato. Para saber "quais são meus anúncios" e permitir excluir, cada anúncio guarda um `ownerId` anônimo gerado no navegador (localStorage), sem senha nem cadastro.

> ⚠️ Este README cobre **apenas o backend**. Quando o frontend estiver pronto, junte tudo em um único `README.md` na raiz do repositório, incluindo o **Diário de Bordo da IA** exigido no edital (Seção 3).

## Tecnologias

- Node.js + TypeScript
- Express
- SQLite (arquivo local, via `sql.js` — SQLite compilado em WebAssembly, não exige compilador nativo instalado)
- `zod` para validação de entrada

## Por que sql.js e não Prisma/better-sqlite3?

O projeto passou por duas tentativas antes desta:
1. **Prisma**: exige baixar binários de engine na instalação; em alguns ambientes/redes esse download é bloqueado.
2. **better-sqlite3**: precisa compilar código nativo (C++) na máquina — no Windows isso trava sem as ferramentas de build corretas (Visual Studio Build Tools / Python).

`sql.js` roda o SQLite como WebAssembly puro: nenhuma compilação, nenhum binário externo, funciona igual em Windows/Mac/Linux só com `npm install`.

## Como rodar localmente

Pré-requisitos: Node.js 18+ instalado.

```bash
# 1. Instalar dependências
npm install

# 2. Copiar variáveis de ambiente
cp .env.example .env

# 3. Rodar em modo desenvolvimento (recarrega ao salvar)
npm run dev
```

O servidor sobe em `http://localhost:3000`. O banco SQLite é criado automaticamente em `./data/app.sqlite` na primeira execução.

### Build de produção

```bash
npm run build
npm start
```

## Endpoints

Base URL local: `http://localhost:3000`

Todos os anúncios são públicos para leitura. Criar/excluir não exige conta, mas exige um `ownerId` (string com pelo menos 8 caracteres) — no frontend, gerado uma vez por navegador com `crypto.randomUUID()` e salvo em `localStorage`.

| Método | Rota | Descrição |
|---|---|---|
| GET | `/products` | Lista anúncios. Query opcional: `?category=Livros&search=texto&page=1&limit=20` |
| GET | `/products/mine?ownerId=...` | Lista os anúncios criados por esse `ownerId` |
| GET | `/products/:id` | Detalhe de um anúncio |
| POST | `/products` | Cria anúncio. Body: `{ title, description, category, price?, isDonation?, image?, sellerName, contact?, ownerId }` |
| DELETE | `/products/:id?ownerId=...` | Remove anúncio — só funciona se o `ownerId` bater com quem criou (senão retorna 403) |

Regra de negócio: todo anúncio precisa de `price` **ou** `isDonation: true` (se `isDonation` for `true`, o preço é ignorado/nulo).

### Exemplo rápido (curl)

```bash
# Criar anúncio (doação)
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"title":"Livro Cálculo I","description":"Bom estado","category":"Livros","isDonation":true,"sellerName":"Maria","ownerId":"algum-id-com-8-chars-ou-mais"}'

# Listar
curl http://localhost:3000/products

# Filtrar por categoria e buscar por texto
curl "http://localhost:3000/products?category=Livros&search=calculo"

# Excluir (só funciona com o ownerId correto)
curl -X DELETE "http://localhost:3000/products/ID_DO_ANUNCIO?ownerId=algum-id-com-8-chars-ou-mais"
```

## Estrutura de pastas

```
src/
  app.ts                   # configuração do Express (middlewares e rotas)
  server.ts                # ponto de entrada (inicializa o banco e sobe o servidor)
  db/
    index.ts               # conexão SQLite (sql.js) + aplica schema.sql no boot
    schema.sql              # DDL da tabela products
  routes/
    products.routes.ts      # define os endpoints
  controllers/
    products.controller.ts  # recebe req/res, valida entrada (zod) e chama o service
  services/
    products.service.ts     # regra de negócio + acesso ao banco (SQL puro)
  middlewares/
    error.middleware.ts     # tratamento de erro centralizado
  types/                     # tipos TS, schemas zod, classe AppError
scripts/
  copy-assets.js             # copia o schema.sql pra dentro de dist/ no build de produção
```

## O que ainda falta (próximos passos)

- [ ] Frontend React + Vite + TypeScript (Landing Page + PWA)
- [ ] `manifest.json` + Service Worker
- [ ] Conectar frontend a esta API
- [ ] Diário de Bordo da IA no README final
- [ ] (Bônus) Deploy do backend (Render/Railway/Fly.io)
