import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Unique, OneToMany, ManyToOne} from "typeorm";
import { Kardex } from "./Kardex";
import { Empresa } from "./Empresa";


@Entity()
@Unique(['nombre'])

export class Local{

    @PrimaryGeneratedColumn()
    @OneToMany(()=>Kardex, kardex => kardex.id)
    id:Kardex[];

    @ManyToOne(()=> Empresa, empresa => empresa.id)
    idempresa:Empresa[];

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

    @Column({default:true})
    estado:boolean;

}
