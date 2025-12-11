import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: "tb_caronas"})
export class Carona{

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column()
    distancia: number;

    @IsNotEmpty()
    @Column()
    velocidade: number;

    @IsNotEmpty()
    @Column({length: 50, nullable: false})
    cidadeOrigem: string;

    @IsNotEmpty()
    @Column({length: 50, nullable: false})
    cidadeDestino: string;

    @IsNotEmpty()
    @Column()
    tempo: number;

    @IsNotEmpty()
    @Column()
    vagas: number;

}