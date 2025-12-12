import{ Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm'
import { Carona } from '../../carona/entities/carona.entity';


@Entity ({ name: 'tb_categoria'})
export class Categoria{

@PrimaryGeneratedColumn()
id: number;

@Column({ length: 255, nullable: false })
descricao: string;


@OneToMany(() => Carona, (caronas) => caronas.categoria)
caronas: Carona[];


}