import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_carona' })
export class Carona {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @Column()
  @ApiProperty()
  distancia: number;

  @IsNotEmpty()
  @Column()
  @ApiProperty()
  velocidade: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  enderecoOrigem: string;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  enderecoDestino: string;

  @Column({ length: 255 })
  @ApiProperty()
  tempo: string;

  @IsNotEmpty()
  @Column()
  @ApiProperty()
  vagas: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.caronas,{
    onDelete: "CASCADE"
  })
  @ApiProperty()
  categoria: Carona[];

  @ManyToOne(() => Usuario, (usuario) => usuario.carona,{
    onDelete: "CASCADE"
  })
  @ApiProperty()
  usuario: Carona[];
}
