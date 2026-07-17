import { Router } from "express";
import * as productsController from "../controllers/products.controller";
import { asyncHandler } from "../middlewares/error.middleware";

const router = Router();

// Ordem importa: /mine precisa vir antes de /:id
router.get("/", asyncHandler(productsController.list));
router.get("/mine", asyncHandler(productsController.listMine));
router.get("/:id", asyncHandler(productsController.getById));
router.post("/", asyncHandler(productsController.create));
router.delete("/:id", asyncHandler(productsController.remove));

export default router;