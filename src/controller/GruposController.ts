import { createQueryBuilder, getRepository } from "typeorm";
import { Request, Response } from "express";
import { Grupo } from "../entity/Grupo";
import { validate } from "class-validator";
export class GrupoController {

    static getall = async (req: Request, res: Response) => {
        try {
            const {idempresa} = req.params;
            const grupo = await createQueryBuilder(Grupo, "grupo")
            .where("grupo.estado = :estado", { estado: 1 })
            .andWhere("grupo.idempresa = :idempresa", { idempresa: idempresa })
            .getMany()
            if (grupo.length > 0) {
                res.send({
                    message: 'Correcto',
                    data: grupo
                })
            } else {
                res.status(404).json({ message: 'No existe grupo!' })
            }

        } catch (error) {
            res.status(404).json({
                message: 'Error',
                data: error
            })

        }
    }
    static getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const grupoRepository = getRepository(Grupo);
        try {
            const grupo = await grupoRepository.findOneOrFail({ where: { estado: true, id } });
            res.send({
                message: 'Correcto',
                data: grupo
            })
        } catch (error) {
            res.status(404).json({
                message: 'No existe grupo'
            })
        }
    }

    static getByEmp = async (req: Request, res: Response) => {
        const { id } = req.params;
        const grupoRepository = getRepository(Grupo);
        try {
            const grupo = await grupoRepository.findOneOrFail({ where: { estado: true, idempresa:id } });
            res.send({
                message: 'Correcto',
                data: grupo
            })
        } catch (error) {
            res.status(404).json({
                message: 'No existe grupo'
            })
        }
    }
    static newGrupo = async (req: Request, res: Response) => {
        const grupo = req.body;

        const errores = await validate(grupo);
        if (errores.length > 0) {
            return res.status(404).json({
                message: 'Error no cumple Validaciones!',
                data: errores.toString()
            })
        }

        const grupoRepository = getRepository(Grupo);

        try {
            await grupoRepository.save(grupo);
        } catch (error) {
            res.status(404).json({
                message: 'Error',
                data: error
            })

        }
        res.send({ message: 'Correcto' })
    }
    static editGrupo = async (req: Request, res: Response) => {
        let g;
        const { id } = req.params;
        const { nombre, descripcion } = req.body;
        const grupoRepository = getRepository(Grupo);

        try {
            g = await grupoRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).json({
                message: 'Error no existe Grupo!',
                data: error
            })
        }
        g.nombre=nombre;
        g.descripcion=descripcion;

        const errores= await validate(g);
        if(errores.length >0){
            return res.status(404).json({
                message:'Error no cumple las validaciones!',
                data:errores.toString()
            })
        }

        //try to save
        try {
            await grupoRepository.update(id,g);
        } catch (error) {
            return res.status(404).json({
                message:'Error',
                data:error
            })
        }
        res.send({message:'Grupo Modificado'})
    }
    static delGrupo = async (req:Request, res:Response)=>{
        const {id}=req.params;
        const grupoRepository=getRepository(Grupo);

        let g :Grupo;

        try {
            g= await grupoRepository.findOneOrFail(id);
        } catch (error) {
            return res.status(404).json({
                message:'Error',
                data:error
            })
        }
        grupoRepository.update(id,{estado:false})
        res.send({message:'Eliminado'})

    }

}