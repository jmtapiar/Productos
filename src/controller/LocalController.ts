import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Local } from "../entity/Local";
import { validate } from "class-validator";


export class LocalController {

    static getall =async (req:Request, res:Response)=>{
        try {
            const localRepository =getRepository(Local);
            const local = await localRepository.findAndCount({where :{estado:1}});
            if(local.length>0){
                res.send({
                    message:'Correcto',
                    data:local
                })
            }else{
                res.status(404).json({message:'No existe local!'})
            }
        } catch (error) {
            res.status(404).json({
                message:'Error',
                data:error
            })
        }
    }
    static getById = async(req:Request, res:Response) => {
        const {id} = req.params;
        const localRepository = getRepository(Local);
        try {
            const local = localRepository.findOneOrFail({where:{estado:1}});
            res.send({
                message:'Correcto',
                data:local
            })
        } catch (error) {
            res.status(404).json({
                message:'No existe local!'
            })
        }
    }
    static newLocal = async(req:Request, res:Response) => {
        const local =req.body;
        const errores = await validate(local);
        if(errores.length>0){
            return res.status(404).json({
                message:'Error no cumple Validaciones!',
                data:errores.toString()
            })
        }
        const localRepository = getRepository(Local);
        try {
            await localRepository.save(local);
        } catch (error) {
            res.status(404).json({
                message:'Error',
                data:error
            })
        }
        res.send({message:'Correcto'})
    }
    static editLocal = async(req:Request, res:Response) =>{
        let l;
        const{id}=req.params;
        const{nombre,direccion,telefono} = req.body;
        const localRepository = getRepository(Local);
        try {
            l = await localRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).json({
                message:'Error no existe local!',
                data:error
            })
        }
        l.nombre=nombre;
        l.direccion=direccion;
        l.telefono=telefono;
        const errores = await validate(l);
        if(errores.length>0){
            return res.status(404).json({
                message:'Error no cumple las validaciones!',
                data:errores.toString()
            })
        }
        //try to save
        try {
            await localRepository.update(id,l);
        } catch (error) {
            return res.status(404).json({
                message:'Error',
                data:error
            })
        }
        res.send({message:'Local Modificado'})
    }
    static delLocal = async(req:Request, res:Response)=>{
        const {id} = req.params;
        const localRepository =getRepository(Local);

        let l:Local;
        try {
            l=await localRepository.findOneOrFail(id);  
        } catch (error) {
            return res.status(404).json({
                message:'Error',
                data:error
            })
        }
        localRepository.update(id,{estado:false});
        res.send({message:'Eliminado'})
    }

}