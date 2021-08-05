import { Entity, PrimaryGeneratedColumn, Unique, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { MinLength,IsNotEmpty, minLength } from "class-validator";
import { Movimiento } from "./Movimiento";
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

    @Column()
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
}
