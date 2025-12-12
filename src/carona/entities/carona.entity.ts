import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity({ name: 'tb_carona' })
export class Carona {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column()
  distancia: number;

  @IsNotEmpty()
  @Column()
  velocidade: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  enderecoOrigem: string;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  enderecoDestino: string;

  @Column({ length: 255 })
  tempo: string;

  @IsNotEmpty()
  @Column()
  vagas: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.caronas,{
    onDelete: "CASCADE"
  })
  categoria: Carona[];

  @ManyToOne(() => Usuario, (usuario) => usuario.carona,{
    onDelete: "CASCADE"
  })
  usuario: Carona[];
}
