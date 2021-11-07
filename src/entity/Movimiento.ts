import { Column,PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn,Entity, ManyToOne, ColumnTypeUndefinedError } from "typeorm";
import { User } from "./User";

@Entity()

export class Movimiento{

    @PrimaryGeneratedColumn()
    id:number;
    
    @ManyToOne(()=>User , user => user.id)
    user:User;

    @Column()
    idempresa:number;

    @Column()
    localIn:number;

    @Column()
    localOut:number;

    @Column()
    @CreateDateColumn()
    createdDate:Date;

    @Column({length:10})
    tipo:string
}