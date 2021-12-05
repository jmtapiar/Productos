import { Router } from "express";
import { ProductosController } from "../controller/ProductoController";
import { checkRole } from "../middleware/role";

const router = Router();

//Rutas para el Crud

//TODO: Get all users
router.get('/',checkRole(['admin']), ProductosController.getall);

router.post('/emp/',checkRole(['usuario']), ProductosController.getallEmp);

//TODO: Get By Id
router.get('/:id',checkRole(['usuario']),ProductosController.getById);

//TODO: Crear nuevo usuario
router.post('',checkRole(['usuario']),ProductosController.newProd);

//TODO: Editar Usuario
router.put('/:id',checkRole(['usuario']),ProductosController.editProd);

//TODO: Eliminar Usuario
router.delete('/:id',checkRole(['usuario']),ProductosController.delPro);


export default router;