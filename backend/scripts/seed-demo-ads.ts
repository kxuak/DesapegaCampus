/**
 * Roda o seed de anúncios demo manualmente (fora do boot do servidor).
 * Útil se você quiser popular o banco sem subir o servidor inteiro.
 *
 *   npx tsx scripts/seed-demo-ads.ts
 *
 * Normalmente você não precisa rodar isso à mão: o servidor já chama
 * o mesmo seed sozinho toda vez que inicia (src/server.ts).
 */
import { initDb } from "../src/db";
import { seedDemoAds } from "../src/db/seedDemoAds";

async function main() {
  await initDb();
  seedDemoAds();
  console.log("Seed concluído.");
}

main().catch((err) => {
  console.error("Erro ao rodar o seed:", err);
  process.exit(1);
});
