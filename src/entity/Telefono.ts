import { Column,PrimaryGeneratedColumn,Unique,CreateDateColumn,UpdateDateColumn,Entity, ManyToOne } from "typeorm";
import { Cliente } from "./Cliente";

@Entity()


export class Telefono{

    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(()=> Cliente, cliente => cliente.id)
    cliente:Cliente[];

    @Column("nvarchar",{length:10})
    numero:string

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