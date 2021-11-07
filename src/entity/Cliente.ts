import { IsNotEmpty } from "class-validator";
import { Column, PrimaryGeneratedColumn, CreateDateColumn,UpdateDateColumn,Unique,Entity,OneToMany, ManyToOne } from "typeorm";
import { tipoIdentificacion } from "./tipoIdentificacion";

@Entity()
@Unique(['identificacion','nombre','apellido'])

export class Cliente {

    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne(()=>tipoIdentificacion, tipoiden=> tipoiden.id)
    tipoidentificacion: tipoIdentificacion[];

    @Column("nvarchar",{length:13})
    identificacion:string

    @Column("nvarchar",{length: 80})
    nombre:string

    @Column("nvarchar",{length: 80})
    apellido:string

    @Column()
    fnacimiento:Date

    @Column("nvarchar",{length:1})
    genero:string

    @IsNotEmpty()
    @Column()
    idempresa: number;

    @Column("nvarchar",{length:30})
    tipo:string

    @Column({nullable:true})
    estadocivil:string

    @Column({ default: 1 })
    estado:boolean;
    
    @Column()
    @CreateDateColumn()
    createdAt: Date;
    
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;


    




}