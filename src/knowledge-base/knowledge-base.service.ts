import { Injectable, NotFoundException } from '@nestjs/common';
import type { DeepPartial } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KnowledgeBase } from './entities/knowledge-base.entity';
import { CreateKnowledgeBaseDto } from './dto/create-knowledge-base.dto';
import { UpdateKnowledgeBaseDto } from './dto/update-knowledge-base.dto';

@Injectable()
export class KnowledgeBaseService {
  constructor(
    @InjectRepository(KnowledgeBase) private repo: Repository<KnowledgeBase>,
  ) {}

  create(dto: CreateKnowledgeBaseDto) {
    const itemData: DeepPartial<KnowledgeBase> = {
      ...dto,
      start_date: new Date(dto.start_date),
      end_date: new Date(dto.end_date),
    };
    const item = this.repo.create(itemData);
    return this.repo.save(item);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const item = await this.repo.findOneBy({ id });
    if (!item) throw new NotFoundException(`KnowledgeBase ${id} not found`);
    return item;
  }

  async update(id: number, dto: UpdateKnowledgeBaseDto) {
    const item = await this.findOne(id);
    Object.assign(item, dto);
    return this.repo.save(item);
  }

  async remove(id: number) {
    const item = await this.findOne(id);
    await this.repo.remove(item);
    return { deleted: true };
  }
}
