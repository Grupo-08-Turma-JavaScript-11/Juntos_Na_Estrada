
import { IsEmail, IsNotEmpty } from 'class-validator';
import {

  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,

} from 'typeorm';


@Entity('tb_usuarios')
export class Usuario {
  static id(id: any): Usuario | PromiseLike<Usuario> {
    throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn()
  id: number
  
  @IsNotEmpty()
  @Column({ length: 255, nullable: false})
  nome: string

  @IsEmail()
  @IsNotEmpty()
  @Column({ length: 255, nullable: false})
  usuario: string // 'usuario' = email

  @IsNotEmpty()
  @Column({ length: 20, nullable: false})
  senha: string

  @IsNotEmpty()
  @Column({ length: 45, nullable: false})
  tipo: string

  @Column({ nullable: true, length: 500 })
  foto?: string // URL da foto  
  
}

