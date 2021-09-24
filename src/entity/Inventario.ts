import { Entity, PrimaryGeneratedColumn, Unique,Column,CreateDateColumn,UpdateDateColumn, Double, OneToMany, ManyToOne } from "typeorm";



@Entity()
@Unique(['id'])

export class Inventario{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Codigo:string;

    @Column()
    Cantidad:number;
    
    @Column()
    Ventas: number;

    @Column()
    Existencia: number;

    @Column()
    Descripcion:string;

    @Column()
    Proveedor:string;

    @Column("double")
    PrecioDis:number;


    @Column("double")
    Pvp:number;

    
    @Column("double")
    Utilidad:number;

    @Column()
    @CreateDateColumn()
    createdDate : Date;

    @Column()
    @UpdateDateColumn()
    updatedDate:Date;

    @Column({ default: 1 })
    estado:boolean;


}