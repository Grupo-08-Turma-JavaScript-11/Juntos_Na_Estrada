import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Carona } from '../../carona/entities/carona.entity';

@Entity({ name: 'tb_usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  usuario: string; // 'usuario' = email

  @IsNotEmpty()
  @MinLength(8) // Determina que o minimo da senha são 8 cacteres
  @IsNotEmpty()
  @Column({ length: 20, nullable: false })
  senha: string;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  tipo: string;

  @Column({ nullable: true, length: 500 })
  foto: string; // URL da foto

  @OneToMany(() => Carona, (carona) => carona.usuario)
  carona: Carona[];
  
}
