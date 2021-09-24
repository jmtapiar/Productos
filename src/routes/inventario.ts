import { Router } from "express";
import { InventarioController } from "../controller/InventarioController";
//import { checkRole } from "../middleware/role";

const router = Router();

router.get('/',InventarioController.getall);

router.get('/:id',InventarioController.getById);

router.post('',InventarioController.newInv);

router.patch('/:id',InventarioController.editInventario);

router.delete('/:id',InventarioController.delInventario);

export default router;