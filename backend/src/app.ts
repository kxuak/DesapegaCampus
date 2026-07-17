import cors from "cors";
import express from "express";
import { errorHandler } from "./middlewares/error.middleware";
import productsRoutes from "./routes/products.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/products", productsRoutes);

app.use((_req, res) => {
  res.status(404).json({ error: "Rota não encontrada." });
});

app.use(errorHandler);

export default app;