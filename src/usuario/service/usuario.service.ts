import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository, DeleteResult } from 'typeorm';
import { Usuario } from '../entities/usuario.entity'; // ajuste o caminho conforme seu projeto

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find({ relations: {} });
  }

  async findById(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id },
      relations: { carona: true},
    });

    if (!usuario) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
    return usuario;
  }

  async findByUsuario(usuario: Usuario ): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({
      where: { 
        usuario: usuario.usuario },
    });
  }

  async findByTipo(tipo: string): Promise<Usuario[]> {
    return this.usuarioRepository.find({
      where: { 
        tipo: ILike(`%${tipo}%`) },
      relations: {
        carona: true
      }
    });
  }

  async create(usuario: Usuario): Promise<Usuario> {
    const buscaUsuario = await this.findByUsuario(usuario);

    if (!buscaUsuario) {
      return this.usuarioRepository.save(usuario);
    }

    throw new HttpException('Usuario ja existe', HttpStatus.BAD_REQUEST);
  }

  async update(usuario: Usuario): Promise<Usuario> {
    let buscaUsuario = await this.findByUsuario(usuario);
    let buscaUsuarioId = await this.findById(usuario.id);

    if (!buscaUsuarioId) {
      throw new HttpException('Usuario nao cadastrado', HttpStatus.NOT_FOUND);
    }

    if (buscaUsuario && buscaUsuario.id !== usuario.id) {
      throw new HttpException(
        'Email cadastrado com outro usuario',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.usuarioRepository.save(usuario);
  }

  async delete(id: number): Promise<DeleteResult> {
    let buscaUsuario = await this.findById(id);

    if (!buscaUsuario) {
      throw new HttpException('Usuario nao encontrado', HttpStatus.NOT_FOUND);
    }

    return this.usuarioRepository.delete(id);
  }
}
