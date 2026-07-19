import "dotenv/config";
import app from "./app";
import { initDb } from "./db";
import { seedDemoAds } from "./db/seedDemoAds";

const PORT = Number(process.env.PORT) || 3000;

async function main() {
  await initDb();
  seedDemoAds();
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error("Falha ao iniciar o servidor:", err);
  process.exit(1);
});