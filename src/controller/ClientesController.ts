import { createQueryBuilder,getRepository } from "typeorm";
import { Request,Response } from "express";
import { Cliente } from "../entity/Cliente";
import { validate } from "class-validator";
import { decrypt } from "./aescrypto";

let idclienteD:number;

export class ClientesController {

    static getall = async (req:Request,res:Response)=>{
        try {
            let {idemp} = req.body;
            idclienteD = Number(decrypt(idemp));
            const cliente = await createQueryBuilder(Cliente,"cliente")
                .where("cliente.estado= :estado",{estado:1})
                .andWhere("cliente.idempresa = :idempresa", {idempresa:idclienteD})
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




}