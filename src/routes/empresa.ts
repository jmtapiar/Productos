import { Router } from "express";
import { EmpresaController } from "../controller/EmpresaController";
import { checkRole } from "../middleware/role";

const router = Router();

router.get('',checkRole(['admin']),EmpresaController.getall);
router.get(':iden',checkRole(['usuario']),EmpresaController.getById);
router.post('/emp/',checkRole(['usuario']),EmpresaController.getByEmpres);
router.post('/',checkRole(['usuario']),EmpresaController.newEmpresa);
router.post('/:id',checkRole(['usuario']),EmpresaController.delEmpresa);



export default router;