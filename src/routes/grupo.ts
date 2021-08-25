import { Router } from "express";
import { GrupoController } from "../controller/GruposController";
import { checkRole } from "../middleware/role";

const router = Router();

router.get('/',checkRole(['usuario']),GrupoController.getall);

router.get('/:id',checkRole(['usuario']),GrupoController.getById);

router.post('',checkRole(['usuario']),GrupoController.newGrupo);

router.patch('/:id',checkRole(['usuario']),GrupoController.editGrupo);

router.delete('/:id',checkRole(['empresa']),GrupoController.delGrupo);

export default router;