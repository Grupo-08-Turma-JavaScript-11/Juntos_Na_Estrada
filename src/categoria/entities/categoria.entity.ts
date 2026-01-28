import{ Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm'
import { Carona } from '../../carona/entities/carona.entity';
import { ApiProperty } from '@nestjs/swagger';


@Entity ({ name: 'tb_categoria'})
export class Categoria{

@PrimaryGeneratedColumn()
@ApiProperty()
id: number;

@Column({ length: 255, nullable: false })
@ApiProperty()
descricao: string;


@OneToMany(() => Carona, (caronas) => caronas.categoria)
@ApiProperty()
caronas: Carona[];


}