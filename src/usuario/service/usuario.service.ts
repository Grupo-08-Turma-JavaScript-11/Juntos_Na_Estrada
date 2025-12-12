import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository, DeleteResult } from 'typeorm';
import { Usuario } from '../entity/usuario.entity'; // ajuste o caminho conforme seu projeto

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
      relations: {},
    });

    if (!usuario) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
    return usuario;
  }

  async findByUsuario(usuario: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({
      where: { usuario: usuario },
    });
  }

  async findByTipo(tipo: string): Promise<Usuario[]> {
    return this.usuarioRepository.find({
      where: { tipo: ILike(`%${tipo}%`) },
    });
  }

  async create(usuario: Usuario): Promise<Usuario> {
    const buscaUsuario = await this.findByUsuario(usuario.usuario);

    if (!buscaUsuario) {
      return this.usuarioRepository.save(usuario);
    }

    throw new HttpException('Usuario ja existe', HttpStatus.BAD_REQUEST);
  }

  async update(usuario: Usuario): Promise<Usuario> {

    let buscaUsuario = await this.findByUsuario(usuario.usuario);

    if (buscaUsuario ) {
      throw new HttpException(
        'Nenhum usuário informado para atualizar',
        HttpStatus.BAD_GATEWAY,
      );
    }

    await this.findById(usuario.id);
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
