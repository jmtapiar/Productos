import { Router } from "express";
import { checkJwt } from "../middleware/jwt";
import auth  from "./auth";
import user from "./user";
import producto from "./Producto";

const router = Router();

router.use('/users', checkJwt,user);
router.use('/auth',auth);
router.use('/producto',producto)


export default router;