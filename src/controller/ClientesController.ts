import { createQueryBuilder,getRepository } from "typeorm";
import { Request,Response } from "express";
import { Cliente } from "../entity/Cliente";
import { validate } from "class-validator";
import { decrypt } from "./aescrypto";

let idEmpresaD:number;

export class ClientesController {

    static getall = async (req:Request,res:Response)=>{
        try {
            let {idemp} = req.body;
            idEmpresaD = Number(decrypt(idemp));
            const cliente = await createQueryBuilder(Cliente,"cliente")
                .where("cliente.estado= :estado",{estado:1})
                .getMany()
            if(cliente.length >0){
                res.send({
                    message: 'Correcto',
                    data:cliente
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

    static getallEmp = async (req:Request,res:Response)=>{
        try {
            let {idemp} = req.body;
            idEmpresaD = Number(decrypt(idemp));
            const cliente = await createQueryBuilder(Cliente,"cliente")
                .where("cliente.estado= :estado",{estado:1})
                .andWhere("cliente.idempresa = :idempresa", {idempresa:idEmpresaD})
                .getMany()
            if(cliente.length >0){
                res.send({
                    message: 'Correcto',
                    data:cliente
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

    static getById = async (req:Request, res:Response)=>{
        const {id} = req.params;
        const {idempresa} = req.body;
        idEmpresaD = Number (decrypt(idempresa));

        const clienteRepository = getRepository(Cliente);

        try{
            const cliente = await clienteRepository.findOneOrFail({where :{id,estado:1,idempresa:idEmpresaD}});
            res.send({
                message:'Correcto',
                data:cliente
            });
        }catch(error){
            res.status(404).json({
                message:"No existe empresa!"
            });
        }
    }

    static getByIdentificacion = async (req:Request, res:Response) => {
        const {idempresa, identificacion} = req.body;
        idEmpresaD = Number(decrypt(idempresa));
        const clienteRepository = getRepository(Cliente);
        try {
            const cliente = await clienteRepository.findOneOrFail({where: {idempresa,estado:1,identificacion}});
            res.send({
                message:'Correcto',
                data:cliente
            })
        } catch (error) {
            res.status(404).json({
                message:'No existe Cliente!'
            })            
        }
    }

    static newCliente = async(req:Request, res:Response)=> {
        
        const {idempresa}= req.body;  
        var cli= req.body;
        cli.idempresa = Number (decrypt(idempresa));
        const errores = await validate(cli);
        if (errores.length > 0) {
              return res.status(404).json({
                  message: 'Error no cumple Validaciones!',
                  data: errores.toString()
              })
          }
          const   clienteRepository = getRepository(Cliente);
          
        try {
            await clienteRepository.save(cli);
        } catch (error) {
            res.status(404).json({
                message: 'Error',
                data: error
            })
        }
        res.send({ message: 'Correcto' })
    }
    



}
