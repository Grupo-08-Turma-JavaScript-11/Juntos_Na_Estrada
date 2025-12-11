
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository, DeleteResult } from 'typeorm';
import { Usuario } from '../entity/usuario.entity'; // ajuste o caminho conforme seu projeto

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  // Create
  async create(usuario: Usuario): Promise<Usuario> {

    const existente = await this.usuarioRepository.findOne({
      where: { usuario: ILike(`%${usuario.usuario}%`) },
    });

    if (existente) {
      throw new ConflictException('Usuário já cadastrado');
    }

    return this.usuarioRepository.save(usuario);
  }

  async findById(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return usuario;
  }
  // READ FindbyTipo
  async findByTipo(tipo: string): Promise<Usuario[]> {
    return this.usuarioRepository.find({
      where: { tipo: ILike(`%${tipo}%`) },
    });
  }

  // READ findAll
  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  // UPDATE
  async update(usuario: Usuario): Promise<Usuario> {
    if (!usuario?.id) {
      throw new NotFoundException('Nenhum usuário informado para atualizar');
    }

    await this.findById(usuario.id);
    return this.usuarioRepository.save(usuario);
  }

  // DELETE
  async delete(id: number): Promise<DeleteResult> {
    // Valida existência antes de apagar
    await this.findById(id);
    return this.usuarioRepository.delete(id);
  }
}
