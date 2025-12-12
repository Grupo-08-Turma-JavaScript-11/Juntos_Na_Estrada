import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Categoria } from '../entities/categoria.entity'
import { Repository, Like } from 'typeorm'
@Injectable()
export class CategoriaService {

  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>
  ) {}

  
  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepository.find({
      relations: { caronas: true }
    })
  }

  
  async findById(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne({
      where: { id },
      relations: { caronas: true }
    })

    if (!categoria) {
      throw new NotFoundException('Categoria nao encontrada')
    }

    return categoria;
  }

  async findByDescricao(descricao: string): Promise<Categoria[]> {
  const categorias = await this.categoriaRepository.find({
    where: {
      descricao: Like(`%${descricao}%`)
    },
    relations: { caronas: true }
  })

  if (categorias.length === 0) {
    throw new NotFoundException('Nenhuma categoria encontrada com essa descrição')
  }

  return categorias
}

  async create(categoria: Categoria): Promise<Categoria> {
    return await this.categoriaRepository.save(categoria)
  }

  
 
async update(categoria: Categoria): Promise<Categoria> {

  
  await this.findById(categoria.id)


  return await this.categoriaRepository.save(categoria)
}


  async delete(id: number): Promise<void> {
  await this.findById(id)
  await this.categoriaRepository.delete(id)  
}


}
