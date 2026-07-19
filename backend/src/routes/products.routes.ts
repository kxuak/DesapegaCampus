import { Router } from "express";
import * as productsController from "../controllers/products.controller";
import { asyncHandler } from "../middlewares/error.middleware";

const router = Router();

router.get("/", asyncHandler(productsController.list));
router.get("/mine", asyncHandler(productsController.listMine));
router.get("/:id", asyncHandler(productsController.getById));
router.post("/", asyncHandler(productsController.create));
router.put("/:id", asyncHandler(productsController.update));
router.delete("/:id", asyncHandler(productsController.remove));

export default router;