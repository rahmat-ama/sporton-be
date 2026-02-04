import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import {
  createTransacion,
  getTransactionById,
  getTransactions,
  updateTransaction,
} from "../controllers/transaction.controller";
import { upload } from "../middleware/upload.middleware";

const router = Router();

router.get("/", authenticate, getTransactions);
router.post("/checkout", upload.single("image"), createTransacion);
router.get("/:id", getTransactionById);
router.patch("/:id", authenticate, updateTransaction);

export default router;
