import { Request, Response, NextFunction } from "express";
import  * as jwt from "jsonwebtoken";
import config from "../config/jwt";

export const checkJwt = ( req: Request, res:Response, next: NextFunction) =>{
    console.log('req-->',req.headers);
    const token = <string>req.headers['authorized'];
    if(token == null){
        return res.status(401).json({
            message:'No existe Token! '
        })
    }
    let JwtLoad;
    try {
        JwtLoad = <any> jwt.verify(token, config.jwtSecret);
        res.locals.JwtLoad = JwtLoad;
    } catch (error) {
        return res.status(401).json({
            message:'No autorizado! '
        })
    }
    const {userId, username, rol} = JwtLoad;
    const newToken = jwt.sign({userId,username,rol}, config.jwtSecret,{expiresIn:'1h'});
    res.setHeader('token',newToken);

    next();

}