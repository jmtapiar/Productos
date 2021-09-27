import { getRepository, createQueryBuilder } from "typeorm";
import { Request, Response } from "express";
import { Inventario } from "../entity/Inventario";
import { validate } from "class-validator";

export class InventarioController {

    static getall = async (req: Request, res: Response) => {
        try {
            const invRepository = getRepository(Inventario);
            const inventario = await invRepository.findAndCount({ where: { estado: true } });
            if (inventario.length > 0) {
                res.send({
                    message: 'Correcto',
                    data: inventario
                })
            } else {
                res.status(404).json({ message: 'No existe inventario!' })
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
        const invRepository = getRepository(Inventario);
        try {
            const inventario = await invRepository.findOneOrFail({ where: { estado: true,Codigo:id } });
            res.send({
                message: 'Correctisimo',
                data: inventario
            })
        } catch (error) {
            res.status(404).json({
                message: 'No existe inventario'
            })
        }
    }

    static newInv = async (req: Request, res: Response) => {
        const inventario = req.body;

        const errores = await validate(inventario);
        if (errores.length > 0) {
            return res.status(404).json({
                message: 'Error no cumple Validaciones!',
                data: errores.toString()
            })
        }

        const invRepository = getRepository(Inventario);

        try {
            await invRepository.save(inventario);
        } catch (error) {
            res.status(404).json({
                message: 'Error',
                data: error
            })

        }
        res.send({ message: 'Correcto' })
    }

    static editInventario = async (req: Request, res: Response) => {
        let i;
        const { id } = req.params;
        const {
            Codigo, Cantidad, Ventas, Existencia, Descripcion, Proveedor, PrecioDis,
            Pvp, Utilidad
        } = req.body;
        const invRepository = getRepository(Inventario);

        try {
            i = await invRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).json({
                message: 'Error no existe inventario!',
                data: error
            })
        }
        i.Codigo=Codigo;
        i.Cantidad= Cantidad;
        i.Ventas= Ventas;
        i.Existencia= Existencia;
        i.Descripcion= Descripcion;
        i.Proveedor= Proveedor;
        i.PrecioDis=PrecioDis;
        i.Pvp= Pvp;
        i.Utilidad=Utilidad;

        const errores = await validate(i);
        if (errores.length > 0) {
            return res.status(404).json({
                message: 'Error no cumple las validaciones!',
                data: errores.toString()
            })
        }

        //try to save
        try {
            await invRepository.update(id, i);
        } catch (error) {
            return res.status(404).json({
                message: 'Error',
                data: error
            })
        }
        res.send({ message: 'Inventario Modificado' })
    }

    static delInventario = async (req:Request, res:Response)=>{
        const {id}=req.params;
        const invRepository=getRepository(Inventario);

        let i :Inventario;

        try {
            i= await invRepository.findOneOrFail(id);
        } catch (error) {
            return res.status(404).json({
                message:'Error',
                data:error
            })
        }
        invRepository.update(id,{estado:false})
        res.send({message:'Eliminado..'})

    }


}