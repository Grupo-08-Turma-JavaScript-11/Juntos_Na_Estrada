import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from '../entities/categoria.entity'
@Injectable()
export class CategoriaService {

  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>
  ) {}

  
  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepository.find({
      relations: { caronas: true }
    });
  }

  
  async findById(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne({
      where: { id },
      relations: { caronas: true }
    });

    if (!categoria) {
      throw new NotFoundException('Categoria nao encontrada');
    }

    return categoria;
  }

  async create(categoria: Categoria): Promise<Categoria> {
    return await this.categoriaRepository.save(categoria);
  }

  
  async update(id: number, categoria: Categoria): Promise<Categoria> {

    await this.findById(id); 

    categoria.id = id; 

    return await this.categoriaRepository.save(categoria);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id);
    await this.categoriaRepository.delete(id);
  }
}
