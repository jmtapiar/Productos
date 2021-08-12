import { Entity, PrimaryGeneratedColumn, Unique, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { MinLength,IsNotEmpty, minLength } from "class-validator";
import { Movimiento } from "./Movimiento";
import * as bcrypt from "bcrypt";

@Entity()
@Unique(['username'])
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @MinLength(6)
    username: string;

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
