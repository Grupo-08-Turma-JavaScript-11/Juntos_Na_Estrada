import{ Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm'
import {Carona} from '../carona/entities/carona.entity'

@Entity ({ name: 'tb_categoria'})
export class Categoria{

@PrimaryGeneratedColumn()
id: number;


@Column()
descricao: string;

@OneToMany(() => Carona, (categoria) => Carona.categoria)
caronas: Carona[];


}