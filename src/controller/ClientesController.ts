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
                .leftJoinAndSelect("cliente.tipoidentificacion","tipoidentificacion")
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

    static newCliente = async (req:Request, res:Response) => {
        
        //const {tipoidentificacion,identificacion,nombre,apellido,fnacimiento,
          //  genero,idempresa,tipo,estadocivil}= req.body;  
        var cli=req.body;
        cli.idempresa = Number (decrypt(cli.idempresa));
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
    
    static editCliente = async (req:Request, res:Response) =>{
        let c;
        const {id} = req.params;
        const {tipoidentificacion,identificacion,nombre,apellido,fnacimiento,
            genero,tipo,estadocivil} = req.body;
        const clienteRepository = getRepository(Cliente);
        try {
            c = await clienteRepository.findOneOrFail({where:{id}})
        } catch (error) {
            res.status(404).json({
                message: 'Error no existe Grupo!',
                data: error
            })
        }
        c.tipoidentificacion = tipoidentificacion;
        c.identificacion = identificacion;
        c.nombre = nombre;
        c.apellido = apellido;
        c.fnacimiento = fnacimiento;
        c.genero = genero;
        c.tipo = tipo;
        c.estadocivil = estadocivil;
        const errores = await validate(c);
        if(errores.length>0){
            return res.status(404).json({
                message: 'Error no cumple las validaciones!',
                data: errores.toString()
            })
        }
        try {
            await clienteRepository.update(id,c);
        } catch (error) {
            return res.status(404).json({
                message: 'Error',
                data: error
            })
        }
        res.send({ message: 'Cliente Modificado' })

    }

    static delCliente = async(req:Request, res:Response)=>{
        const {id} = req.params;
        const clienteRepository = getRepository(Cliente);
        let cli:Cliente;
        try {
            cli = await clienteRepository.findOneOrFail(id);
        } catch (error) {
            return res.status(404).json({
                message: 'Error',
                data:error
            })
        }
        clienteRepository.update(id,{estado:false});
        res.send({
            message: 'Eliminado'
        })
    }

}
