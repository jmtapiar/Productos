import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Unique, ManyToOne } from "typeorm";
import { Cliente } from "./Cliente";
import { User } from "./User";

@Entity()


export class Historia{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=>Cliente, cliente=>cliente.id)
    cliente: Cliente[];

    @Column()
    @CreateDateColumn()
    fecha:Date;

    @ManyToOne(()=>User, usuario=> usuario.id)
    usuario:User[];

    @Column()
    @UpdateDateColumn()
    updatedDate:Date;

    @Column({default:1})
    estado:boolean;



}