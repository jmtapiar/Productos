import { Entity,Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,  ManyToOne } from "typeorm";
import { Historia } from "./Historia";


@Entity()


export class HistoriaDetalle{

    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(()=> Historia, historia=> historia.id)
    historia:Historia[];

    @Column("longtext")
    Motivo:string;

    @Column("longtext")
    antePersonal:string;

    @Column("longtext")
    anteFamiliar:string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;
    
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @Column({default:1})
    estado:boolean;


}
