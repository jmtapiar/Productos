import { Router } from "express";
import { UserController } from "../controller/UserController";
import { checkRole } from "../middleware/role";

const router = Router();

//Rutas para el Crud

//TODO: Get all users
router.get('/',checkRole(['admin']), UserController.getAll);

//TODO: Get By Id
router.get('/:id',checkRole(['admin','usuario']),UserController.getById);

//TODO: Crear nuevo usuario
router.post('/',checkRole(['admin']),UserController.newUser);

//TODO: Editar Usuario
router.patch('/:id',checkRole(['admin']),UserController.editUser);

//TODO: Eliminar Usuario
router.delete('/:id',checkRole(['admin']),UserController.deleteUser);


export default router;






