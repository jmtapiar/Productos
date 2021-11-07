import { IsNotEmpty } from "class-validator";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { Local } from "./Local";
import { Producto } from "./Producto";

@Entity()

export class Kardex {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne ( ()=> Local , local=> local.id)
    local:Local;

    @ManyToOne (()=>Producto, producto => producto.id )
    producto:Producto;

    @Column()
    cantidad : number;

    @Column()
    @CreateDateColumn()
    createdDate:Date;

    @Column()
    @UpdateDateColumn()
    updatedDate:Date;

    @Column()
    iduser :number

    @IsNotEmpty()
    @Column()
    idempresa: number;

}