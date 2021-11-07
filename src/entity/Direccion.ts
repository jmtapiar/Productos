import { Column,PrimaryGeneratedColumn,Unique,Entity,CreateDateColumn,UpdateDateColumn, ManyToOne } from "typeorm";
import { Cliente } from "./Cliente";


@Entity()

export class Direccion{

    @PrimaryGeneratedColumn()
    id:number
    
    @ManyToOne(()=> Cliente, cliente => cliente.id)
    cliente:Cliente[];

    @Column("nvarchar",{length:10})
    direccion:string

    @Column()
    tipo:string

    @Column({default:1})
    estado:boolean
    
    @Column()
    @CreateDateColumn()
    createdDate : Date;

    @Column()
    @UpdateDateColumn()
    updatedDate:Date;

}