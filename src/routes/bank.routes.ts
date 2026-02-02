import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import {
  createBank,
  deleteBank,
  getBankById,
  getBanks,
  updateBank,
} from "../controllers/bank.controller";

const router = Router();

router.get("/", getBanks);
router.post("/", authenticate, createBank);
router.get("/:id", getBankById);
router.put("/:id", authenticate, updateBank);
router.delete("/:id", authenticate, deleteBank);

export default router;
