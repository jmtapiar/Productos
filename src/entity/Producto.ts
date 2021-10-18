import { IsNotEmpty } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Unique,Column,CreateDateColumn,UpdateDateColumn, Double, OneToMany, ManyToOne } from "typeorm";
import { Grupo } from "./Grupo";


@Entity()
@Unique(['nombre','estado'])

export class Producto{

    @PrimaryGeneratedColumn()
    id: number;

    
    @ManyToOne(()=>Grupo , grupo => grupo.id)
    grupo:Grupo;
    
    @Column()
    nombre: string;

    @Column()
    descripcion: string

    @Column()
    @CreateDateColumn()
    createdDate : Date;

    @Column()
    @IsNotEmpty()
    grupoId: number;

    @Column()
    @UpdateDateColumn()
    updatedDate:Date;

    @Column("double")
    valorCompra:number;

    @Column("double")
    valorVenta:number;

    @Column({ default: 1 })
    estado:boolean;


}