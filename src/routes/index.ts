import { Router } from "express";
import { checkJwt } from "../middleware/jwt";
import auth  from "./auth";
import user from "./user";
import producto from "./Producto";
import grupo from "./grupo";
import local from "./local";

const router = Router();

router.use('/users', checkJwt,user);
router.use('/auth',auth);
router.use('/producto',checkJwt,producto);
router.use('/grupo',checkJwt,grupo);
router.use('/local',checkJwt,local);


export default router;