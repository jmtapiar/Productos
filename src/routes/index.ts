import { Router } from "express";

import auth  from "./auth";
import user from "./user";
import producto from "./Producto";

const router = Router();

router.use('/users',user);
router.use('/auth',auth);
router.use('/producto',producto)


export default router;