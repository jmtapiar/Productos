import { Router } from "express";
import { ClientesController } from "../controller/ClientesController";
import { checkRole } from "../middleware/role";

const router = Router();

router.get('',checkRole(['admin']),ClientesController.getall);
router.get(':iden',checkRole(['usuario']),ClientesController.getByIdentificacion);
router.post('/emp/',checkRole(['usuario']),ClientesController.getallEmp);
router.post('',checkRole(['usuario']),ClientesController.newCliente);
router.put('',checkRole(['usuario']),ClientesController.newCliente);


export default router;