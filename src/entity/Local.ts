import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Unique, OneToMany} from "typeorm";
import { Kardex } from "./Kardex";


@Entity()
@Unique(['nombre'])

export class Local{

    @PrimaryGeneratedColumn()
    @OneToMany(()=>Kardex, kardex => kardex.id)
    id:Kardex[];

    @Column()
    nombre:string;

    @Column()
    direccion:string;

    @Column()
    telefono:string;

    @Column()
    @CreateDateColumn()
    createdDate:Date;

    @Column()
    @UpdateDateColumn()
    updatedDate:Date;

    @Column()
    estado:boolean;

}
