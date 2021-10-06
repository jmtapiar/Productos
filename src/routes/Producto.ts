import { Router } from "express";
import { ProductosController } from "../controller/ProductoController";

const router = Router();

//Rutas para el Crud

//TODO: Get all users
router.get('/', ProductosController.getall);

//TODO: Get By Id
router.get('/:id',ProductosController.getById);

//TODO: Crear nuevo usuario
router.post('/',ProductosController.newProd);

//TODO: Editar Usuario
router.put('/:id',ProductosController.editProd);

//TODO: Eliminar Usuario
router.put('/del/:id',ProductosController.delPro);


export default router;