import { Router } from "express";
import { LocalController } from "../controller/LocalController";
import { checkRole } from "../middleware/role";

const router = Router();

router.post('/',checkRole(['usuario']),LocalController.getall);

router.get('/:id',checkRole(['usuario']),LocalController.getById);

router.post('',checkRole(['usuario']),LocalController.newLocal);

router.patch('/:id',checkRole(['ususario']),LocalController.editLocal);

router.delete('/:id',checkRole(['empresa']),LocalController.delLocal);

export default router;
