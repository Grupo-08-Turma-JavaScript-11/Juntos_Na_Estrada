import{ Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm'
import {Carona} from '../carona/entities/carona.entity'

@Entity ({ name: 'tb_categoria'})
export class Categoria{

@PrimaryGeneratedColumn()
id: number;
@Column({ length: 255, nullable: false })

@Column()
descricao: string;
@Column({ length: 255, nullable: false })

@OneToMany(() => Carona, (categoria) => Carona.categoria)
caronas: Carona[];


}