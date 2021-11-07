import { Column, PrimaryGeneratedColumn, CreateDateColumn,UpdateDateColumn, Unique ,OneToMany, Entity } from "typeorm";
import { User } from "./User";
import { Local } from "./Local";

@Entity()
@Unique(['nombre','identificacion'])

export class Empresa {

    @PrimaryGeneratedColumn()
    id:number

    @OneToMany (()=> User, user => user.id)
    usuario:User[];

    @OneToMany(()=> Local, local => local.id )
    local:Local[];

    @Column("nvarchar",{length:13})
    identificacion:string;

    @Column()
    nombre:string

    @Column()
    direccion:string

    @Column()
    telefono:string

    @Column()
    tipo:string

    @Column({default:1})
    estado:boolean

    @Column()
    @CreateDateColumn()
    createdAt: Date;
    
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;



}

