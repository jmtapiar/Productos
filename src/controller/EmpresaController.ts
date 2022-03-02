import { createQueryBuilder, getRepository } from "typeorm";
import { Request, Response } from "express";
import { Empresa } from "../entity/Empresa";
import { validate } from "class-validator";
import { decrypt } from "./aescrypto";

let idEmpresaD: number;
export class EmpresaController {

    static getall = async (req: Request, res: Response) => {
        try {
            const empresa = await createQueryBuilder(Empresa, "empresa")
                .where("empresa.estado = :estado", { estado: 1 })
                .getMany()
            if (empresa.length > 0) {
                res.send({
                    message: 'Correcto',
                    data: empresa
                })
            } else {
                res.status(404).json({ message: 'No existe empresa!' })
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
        const empresaRepository = getRepository(Empresa);
        try {
            const empresa = await empresaRepository.findOneOrFail({ where: { estado: true, id, idempresa: idEmpresaD } });
            res.send({
                message: 'Correcto',
                data: empresa
            })
        } catch (error) {
            res.status(404).json({
                message: 'No existe empresa'
            })
        }
    }
    static getByEmpres = async (req: Request, res: Response) => {
        const { idempresa } = req.body;
        idEmpresaD = Number(decrypt(idempresa));
        const empresaRepository = getRepository(Empresa);
        try {
            const empresa = await empresaRepository.find({ where: { estado: 1, id: idEmpresaD } });
            res.send({
                message: 'Correcto',
                data: empresa
            })
        } catch (error) {
            res.status(404).json({
                message: 'No existe empresa'
            })
        }
    }

    static newEmpresa = async (req: Request, res: Response) => {
        const empresa = req.body;

        const errores = await validate(empresa);
        if (errores.length > 0) {
            return res.status(404).json({
                message: 'Error no cumple Validaciones!',
                data: errores.toString()
            })
        }

        const empresaRepository = getRepository(Empresa);

        try {
            let empresaD: Empresa;
            empresaD.id = Number(decrypt(empresaD.id));

            await empresaRepository.save(empresaD);
        } catch (error) {
            res.status(404).json({
                message: 'Error',
                data: error
            })

        }
        res.send({ message: 'Correcto' })
    }
    static editEmpresa = async (req: Request, res: Response) => {
        let g;
        const { id } = req.params;
        const { identificacion, nombre, direccion, telefono , tipo } = req.body;
        const empresaRepository = getRepository(Empresa);
        try {
            g = await empresaRepository.findOneOrFail({ where: { id: id } });
        } catch (error) {
            res.status(404).json({
                message: 'Error no existe Grupo!',
                data: error
            })
        }
        g.identificacion = identificacion; 
        g.nombre = nombre;
        g.direccion=direccion;
        g.telefono=telefono;
        g.tipo=tipo;
        const errores = await validate(g);
        if (errores.length > 0) {
            return res.status(404).json({
                message: 'Error no cumple las validaciones!',
                data: errores.toString()
            })
        }
        //try to save
        try {
            await empresaRepository.update(id, g);
        } catch (error) {
            return res.status(404).json({
                message: 'Error',
                data: error
            })
        }
        res.send({ message: 'Empresa Modificado' })
    }
    static delEmpresa= async (req: Request, res: Response) => {
        const { id } = req.params;
        const { idempresa } = req.body;
        const empresaRepository = getRepository(Empresa);
        let g: Empresa;

        try {
            g = await empresaRepository.findOneOrFail({ where: { id: id} });
        } catch (error) {
            return res.status(404).json({
                message: 'Error',
                data: error
            })
        }
        empresaRepository.update(id, { estado: false })
        res.send({ message: 'Eliminado' })

    }

}