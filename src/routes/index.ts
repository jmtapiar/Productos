import { Router } from "express";
import { checkJwt } from "../middleware/jwt";
import auth  from "./auth";
import user from "./user";
import producto from "./Producto";
import grupo from "./grupo";

const router = Router();

router.use('/users', checkJwt,user);
router.use('/auth',auth);
router.use('/producto',checkJwt,producto);
router.use('/grupo',checkJwt,grupo)


export default router;