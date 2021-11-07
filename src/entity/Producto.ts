import { IsNotEmpty } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Unique,Column,CreateDateColumn,UpdateDateColumn, ManyToOne, IsNull } from "typeorm";
import { Grupo } from "./Grupo";


@Entity()
@Unique(['nombre','idproveedor','estado'])

export class Producto{

    @PrimaryGeneratedColumn()
    id: number;
   
    @ManyToOne(()=>Grupo , grupo => grupo.id)
    grupo:Grupo;

    @Column("nvarchar",{length:20})
    codigo:string
    
    @Column()
    nombre: string;

    @Column({
        nullable: true
    })
    idproveedor: number;

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