import { Router } from "express";
import { ClientesController } from "../controller/ClientesController";
import { checkRole } from "../middleware/role";

const router = Router();

router.post('/emp/',checkRole(['usuario']),ClientesController.getall);

export default router;