import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Grupo } from "../entity/Grupo";
import { validate } from "class-validator";

export class GrupoController {

    static getall = async (req:Request, res:Response)=>{
        try {
            const grupoRepository = getRepository(Grupo);
            const grupo = await grupoRepository.findAndCount({where:{estado:1}});
            if(grupo.length>0){
                res.send({
                    message:'Correcto',
                    data:grupo
                })
            }else{
                res.status(404).json({message:'No existe grupo!'})
            }

        } catch (error) {
            res.status(404).json({
                message:'Error',
                data:error
            })
            
        }
    }
    static getById = async(req:Request, res:Response)=>{
        const {id}=req.params;
        const grupoRepository=getRepository(Grupo);
        try {
            const grupo = grupoRepository.findOneOrFail({where:{estado:1,id}});
            res.send({
                message:'Correcto',
                data:grupo
            })
        } catch (error) {
            res.status(404).json({
                message:'No existe grupo'
            })
        }
    }
    static newgrupo = async(req:Request, res:Response)=>{
        const grupo = req.body;

        const errores = await validate(grupo);
        if(errores.length>0){
            return res.status(404).json({
                message:'Error no cumple Validaciones!',
                data:errores.toString()
            })
        }

        const grupoRepository = getRepository(Grupo);

        try {
            await grupoRepository.save(grupo);
        } catch (error) {
            res.status(404).json({
                message:'Error',
                data:error
            })
            
        }
        res.send({message:'Correcto'})
    }


}