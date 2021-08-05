import { Router } from "express";
import { UserController } from "../controller/UserController";

const router = Router();

//Rutas para el Crud

//TODO: Get all users
router.get('/', UserController.getAll);

//TODO: Get By Id
router.get('/:id',UserController.getById);

//TODO: Crear nuevo usuario
router.post('/',UserController.newUser);

//TODO: Editar Usuario
router.patch('/:id',UserController.editUser);

//TODO: Eliminar Usuario
router.delete('/:id',UserController.deleteUser);


export default router;






