import { IsNotEmpty } from "class-validator";
import { Column, PrimaryGeneratedColumn, CreateDateColumn,UpdateDateColumn,Unique,Entity,OneToMany } from "typeorm";


@Entity()
@Unique(['identificacion','nombre'])

export class Cliente {

    @PrimaryGeneratedColumn()
    id:number

    @Column("nvarchar",{length:13})
    identificacion:string

    @Column("nvarchar",{length: 80})
    nombre:string

    @Column("nvarchar",{length: 80})
    apellido:string

    @Column()
    fnacimiento:Date

    @IsNotEmpty()
    @Column({
        nullable: false
    })
    idempresa: number;

    @Column({ default: 1 })
    estado:boolean;
    
    @Column()
    @CreateDateColumn()
    createdAt: Date;
    
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;


    




}