import { Request, Response, NextFunction } from "express";
import { User } from "../entity/User";
import { getRepository } from "typeorm";
import { nextTick } from "process";


    export const checkRole =(roles:Array<string>)=>{

        return async (req:Request, res:Response, next :NextFunction) => {

            const {role} = res.locals.JwtLoad;

            console.log('Roles->', role);
            if (role=='admin'){
                next();
            }
            else if (roles.includes(role)){
                next();
            }else{
               res.status(401).json({
                   message:'No Autorizado! '
               })
            }
           
            
        }
       

    }

