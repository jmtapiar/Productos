import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn,UpdateDateColumn, Unique, ManyToOne } from "typeorm";
import { Movimiento } from "./Movimiento";
import { Producto } from "./Producto";

@Entity()
@Unique(['producto', 'id'])

export class movimientoDetalle{

    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(()=> Movimiento, movimiento => movimiento.id)
    movimiento

    @ManyToOne(() => Producto, producto => producto.id)
    producto

    @Column()
    cantidad:number

    @Column()
    @CreateDateColumn()
    createdDate:Date;
    
    @Column()
    @UpdateDateColumn()
    updatedDate:Date;

    @Column({default:1})
    estado:boolean

}