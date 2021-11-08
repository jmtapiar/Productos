import { Entity, PrimaryGeneratedColumn, Unique, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from "typeorm";
import { MinLength,IsNotEmpty, minLength } from "class-validator";
import { Movimiento } from "./Movimiento";
import * as bcrypt from "bcrypt";
import { Empresa } from "./Empresa";


@Entity("User")
@Unique(['username'])
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @MinLength(6)
    username: string;

    @Column()
    @MinLength(36)
    nombre: string;

    @Column()
    @MinLength(36)
    apellido: string;

    @Column()
    @MinLength(6)
    profesion: string;

    @Column()
    @MinLength(6)
    password: string;

    @Column({default:'usuario'})
    @IsNotEmpty()
    role: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;
    
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(()=>Movimiento, movimiento => movimiento.id)
    movimiento:Movimiento[];

    
    @ManyToOne(()=> Empresa, empresa=> empresa.id)
    empresa:Empresa;

    @Column({default:1})
    estado:boolean;
    

    hashPassword(): void {
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
    }

    checkPassword(password):boolean{
        return bcrypt.compareSync(password, this.password);
    }

}   
