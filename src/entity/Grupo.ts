import { Column,PrimaryGeneratedColumn,Entity,CreateDateColumn,UpdateDateColumn,Unique, OneToMany, ManyToMany, ManyToOne } from "typeorm";
import { Producto } from "./Producto";

@Entity()
@Unique(['nombre'])

export class Grupo {

    @PrimaryGeneratedColumn()
    @OneToMany(()=>Producto, producto => producto.id)
    id:Producto[];

    @Column()
    nombre:string;

    @Column()
    descripcion:string;

    @Column()
    @CreateDateColumn()
    createdDate:Date;

    @Column()
    @UpdateDateColumn()
    updatedDate:Date;

    @Column( {default:1})
    estado:boolean;

    


}