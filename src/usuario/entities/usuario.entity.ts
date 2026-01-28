import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Carona } from '../../carona/entities/carona.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  usuario: string; // 'usuario' = email

  @IsNotEmpty()
  @MinLength(8) // Determina que o minimo da senha são 8 cacteres
  @IsNotEmpty()
  @Column({ length: 20, nullable: false })
  @ApiProperty()
  senha: string;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  tipo: string;

  @Column({ nullable: true, length: 500 })
  @ApiProperty()
  foto: string; // URL da foto

  @OneToMany(() => Carona, (carona) => carona.usuario)
  @ApiProperty()
  carona: Carona[];
  
}
