import { getRepository, createQueryBuilder } from "typeorm";
import { Request, Response } from "express";
import { Producto } from "../entity/Producto";
import { Grupo } from "../entity/Grupo";
import { validate } from "class-validator";
import { decrypt } from "./aescrypto";


let idEmpresaD:number;
export class ProductosController {

    
    static getall = async (req:Request, res: Response)=>{
        try {
            const prodRepository = getRepository(Producto);
            //const producto = await prodRepository.findAndCount({where:{estado:1}});
            const producto = await createQueryBuilder(Producto, "producto")
            .leftJoinAndSelect("producto.grupo","Grupo")
            .where("producto.estado = :estado", { estado: "1" })
            .getMany()

            if(producto.length>0){
                res.send({
                    message:'Correcto',
                    data:producto})
            }else{
                res.status(404).json({message:'No existe producto!'})            }
        } catch (error) {
            res.status(404).json({
                message:'Error',
                data:error
            })
        }
    }

    static getallEmp = async (req:Request,res:Response)=>{
        try {
            let {idempresa} = req.body;
            idEmpresaD = Number(decrypt(idempresa));
            const producto = await createQueryBuilder(Producto,"producto")
                .where("producto.estado= :estado",{estado:1})
                .andWhere("producto.idempresa = :idempresa", {idempresa:idEmpresaD})
                .getMany()
            if(producto.length >0){
                res.send({
                    message: 'Correcto',
                    data:producto
                })
            }else {
                res.status(404).json({message: 'No existe cliente!'})
            }
        } catch (error) {
            res.status(404).json({
                message: 'Error',
                data: error
            })
            
        }
    }
    
    static getById = async(req:Request, res:Response )=>{
            const {id}= req.params;
            const prodRepository = getRepository(Producto);

        try {
            const prod = await prodRepository.findOneOrFail({where:{estado:1,id}})
            res.send({
                message:'Correcto',
                data:prod
            })
        } catch (error) {
            res.status(404).json({
                message:'No existe Producto!'

            })
            
        }
    }

    static newProd = async(req:Request, res:Response)=> {

        const producto = req.body;
        
        const errores = await validate(producto);
        if(errores.length>0){
            return res.status(404).json({
                message:'Error no cumple Validaciones!',
                data:errores.toString()
            })
        }

        const prodRepository=getRepository(Producto);

        try {
            await prodRepository.save(producto);
        } catch (error) {
            res.status(404).json({
                message:'No se pudo crear el producto!',
                data:error
            });
        }
        res.send({
            message:'Correcto'
        })
    }

    static editProd = async (req:Request, res:Response)=>{
        let p;
        const {id} = req.params;
        //console.log('id: '+ id);
        
        const {grupoId, nombre, descripcion,valorCompra, valorVenta} = req.body;

        const prodRepository = getRepository(Producto);

        try {
            p = await prodRepository.findOneOrFail(id);
        } catch (error) {
            console.log(error);
            
            return res.status(404).json({
                message:'Error no existe Producto!',
                data:error
            })
        }
        p.grupoId = grupoId;
        p.nombre= nombre;
        p.descripcion= descripcion;
        p.valorCompra =  valorCompra;
        p.valorVenta = valorVenta;

        const errors =await validate(p);
        if(errors.length >0 ){
            return res.status(404).json({
                message:'Error no cumple las validaciones!',
                data:errors.toString()
            })
        }

        //try to save
        try {
            await prodRepository.save(p)
        } catch (error) {
            console.log(error);
            return res.status(404).json({
                message:'Error',
                data:error
            })
        }
        res.send({message:'Producto Modificado'})
    }

    static delPro = async (req:Request ,  res :Response)=>{
        const { id } = req.params;
        const prodRepository = getRepository(Producto);

        let prod: Producto;

        try {
            prod = await prodRepository.findOneOrFail(id);
        } catch (error) {
            return res.status(404).json({
                message: 'Error',
                data: error
            })
        }

        //Eliminar Producto
        prodRepository.update(id,{estado:false});
        res.send({
            message: 'Eliminado'
        })

    }

}