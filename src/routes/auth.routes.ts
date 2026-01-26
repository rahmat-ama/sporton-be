import { Router } from "express";
import { signIn, initiateAdmin } from "../controllers/auth.controller";

const router = Router();

router.post("/signin", signIn);
router.post("/initiate-admin-user", initiateAdmin);

export default router;
