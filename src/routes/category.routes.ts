import { Router } from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller";
import { upload } from "../middleware/upload.middleware";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getCategories);
router.post("/", authenticate, upload.single("image"), createCategory);
router.get("/:id", getCategoryById);
router.put("/:id", authenticate, upload.single("image"), updateCategory);
router.delete("/:id", authenticate, deleteCategory);

export default router;
