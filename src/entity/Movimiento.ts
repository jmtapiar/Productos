import { Column,PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn,Entity, ManyToOne, ColumnTypeUndefinedError } from "typeorm";
import { Producto } from "./Producto";
import { User } from "./User";

@Entity()

export class Movimiento{

    @PrimaryGeneratedColumn()
    id:number;
    
    @ManyToOne(()=>User , user => user.id)
    user:User;
    
    @ManyToOne(()=>Producto, producto => producto.id)
    producto:Producto;

    @Column()
    @CreateDateColumn()
    createdDate:Date;

    @Column()
    cantidad:number;

    @Column()
    localIn:number;

    @Column()
    localOut:number;

}