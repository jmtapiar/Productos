import { Entity, OneToMany,Column,PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { Cliente } from "./Cliente";


@Entity()

export class tipoIdentificacion {

    @PrimaryGeneratedColumn()
    id: number

    @Column("nvarchar",{length:3})
    tipo:string

    
    @Column("nvarchar",{length:30})
    descripcion:string


}