import { createQueryBuilder, getRepository } from "typeorm";
import { Request, Response } from "express";
import { Grupo } from "../entity/Grupo";
import { validate } from "class-validator";
import { decrypt } from "./aescrypto";

let idEmpresaD: number;
export class GrupoController {

    static getall = async (req: Request, res: Response) => {
        try {
            const grupo = await createQueryBuilder(Grupo, "grupo")
                .where("grupo.estado = :estado", { estado: 1 })
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
        const { idempresa } = req.body;
        idEmpresaD = Number(decrypt(idempresa))

        const grupoRepository = getRepository(Grupo);
        try {
            const grupo = await grupoRepository.findOneOrFail({ where: { estado: true, id, idempresa: idempresaD } });
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
        const { idempresa } = req.body;
        idEmpresaD = Number(decrypt(idempresa));
        const grupoRepository = getRepository(Grupo);
        try {
            const grupo = await grupoRepository.find({ where: { estado: 1, idempresa: idEmpresaD } });
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
            let grupoD: Grupo;
            grupoD.nombre = grupo.nombre;
            grupoD.descripcion = grupo.decripcion;
            grupoD.idempresa = Number(decrypt(grupo.idempresa));

            await grupoRepository.save(grupoD);
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
        const { nombre, descripcion, idempresa } = req.body;
        const grupoRepository = getRepository(Grupo);
        idEmpresaD = Number(decrypt(idempresa));
        try {
            g = await grupoRepository.findOneOrFail({ where: { id: id, idempresa: idEmpresaD } });
        } catch (error) {
            res.status(404).json({
                message: 'Error no existe Grupo!',
                data: error
            })
        }
        g.nombre = nombre;
        g.descripcion = descripcion;
        g.idempresa = idEmpresaD;

        const errores = await validate(g);
        if (errores.length > 0) {
            return res.status(404).json({
                message: 'Error no cumple las validaciones!',
                data: errores.toString()
            })
        }

        //try to save
        try {
            await grupoRepository.update(id, g);
        } catch (error) {
            return res.status(404).json({
                message: 'Error',
                data: error
            })
        }
        res.send({ message: 'Grupo Modificado' })
    }
    static delGrupo = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { idempresa } = req.body;
        const grupoRepository = getRepository(Grupo);
        idEmpresaD = Number(decrypt(idempresa));
        let g: Grupo;

        try {
            g = await grupoRepository.findOneOrFail({ where: { id: id, idempresa: idEmpresaD } });
        } catch (error) {
            return res.status(404).json({
                message: 'Error',
                data: error
            })
        }
        grupoRepository.update(id, { estado: false })
        res.send({ message: 'Eliminado' })

    }

}