import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Channel } from './entities/channel.entity';
import { Category } from './entities/category.entity';
import { SubCategory } from './entities/sub-category.entity';
import { Pipeline } from './entities/pipeline.entity';
import { PicGroup } from './entities/pic-group.entity';
import { PicGroupMember } from './entities/pic-group-member.entity';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { CreatePipelineDto } from './dto/create-pipeline.dto';
import { UpdatePipelineDto } from './dto/update-pipeline.dto';

@Injectable()
export class MasterDataService {
  constructor(
    @InjectRepository(Channel)
    private channelRepo: Repository<Channel>,
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
    @InjectRepository(SubCategory)
    private subCategoryRepo: Repository<SubCategory>,
    @InjectRepository(Pipeline)
    private pipelineRepo: Repository<Pipeline>,
    @InjectRepository(PicGroup)
    private picGroupRepo: Repository<PicGroup>,
    @InjectRepository(PicGroupMember)
    private picGroupMemberRepo: Repository<PicGroupMember>,
  ) {}

  // Channels
  createChannel(dto: CreateChannelDto) {
    const c = this.channelRepo.create(dto);
    return this.channelRepo.save(c);
  }

  findAllChannels() {
    return this.channelRepo.find({ relations: ['categories'] });
  }

  async findChannel(id: number) {
    const channel = await this.channelRepo.findOne({
      where: { id },
      relations: ['categories'],
    });
    if (!channel) throw new NotFoundException(`Channel ${id} not found`);
    return channel;
  }

  async updateChannel(id: number, dto: UpdateChannelDto) {
    const channel = await this.findChannel(id);
    Object.assign(channel, dto);
    return this.channelRepo.save(channel);
  }

  async removeChannel(id: number) {
    const channel = await this.findChannel(id);
    await this.channelRepo.remove(channel);
    return { deleted: true };
  }

  // Categories
  async createCategory(dto: CreateCategoryDto) {
    const channel = await this.channelRepo.findOneBy({ id: dto.channel_id });
    if (!channel)
      throw new NotFoundException(`Channel ${dto.channel_id} not found`);
    const cat = this.categoryRepo.create({ name: dto.name, channel });
    return this.categoryRepo.save(cat);
  }

  findAllCategories() {
    return this.categoryRepo.find({ relations: ['subCategories', 'channel'] });
  }

  async findCategory(id: number) {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: ['subCategories', 'channel'],
    });
    if (!category) throw new NotFoundException(`Category ${id} not found`);
    return category;
  }

  async updateCategory(id: number, dto: UpdateCategoryDto) {
    const category = await this.findCategory(id);
    if (dto.channel_id !== undefined) {
      const channel = await this.channelRepo.findOneBy({
        id: dto.channel_id,
      });
      if (!channel)
        throw new NotFoundException(`Channel ${dto.channel_id} not found`);
      category.channel = channel;
    }
    Object.assign(category, dto);
    return this.categoryRepo.save(category);
  }

  async removeCategory(id: number) {
    const category = await this.findCategory(id);
    await this.categoryRepo.remove(category);
    return { deleted: true };
  }

  // SubCategories
  async createSubCategory(dto: CreateSubCategoryDto) {
    const category = await this.categoryRepo.findOneBy({ id: dto.category_id });
    if (!category)
      throw new NotFoundException(`Category ${dto.category_id} not found`);
    const sub = this.subCategoryRepo.create({
      name: dto.name,
      category,
      priority: dto.priority,
    });
    return this.subCategoryRepo.save(sub);
  }

  findAllSubCategories() {
    return this.subCategoryRepo.find({ relations: ['category'] });
  }

  async findSubCategory(id: number) {
    const sub = await this.subCategoryRepo.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!sub) throw new NotFoundException(`SubCategory ${id} not found`);
    return sub;
  }

  async updateSubCategory(id: number, dto: UpdateSubCategoryDto) {
    const sub = await this.findSubCategory(id);
    if (dto.category_id !== undefined) {
      const category = await this.categoryRepo.findOneBy({
        id: dto.category_id,
      });
      if (!category)
        throw new NotFoundException(`Category ${dto.category_id} not found`);
      sub.category = category;
    }
    Object.assign(sub, dto);
    return this.subCategoryRepo.save(sub);
  }

  async removeSubCategory(id: number) {
    const sub = await this.findSubCategory(id);
    await this.subCategoryRepo.remove(sub);
    return { deleted: true };
  }

  // Pipelines
  createPipeline(dto: CreatePipelineDto) {
    const p = this.pipelineRepo.create(dto);
    return this.pipelineRepo.save(p);
  }

  findAllPipelines() {
    return this.pipelineRepo.find();
  }

  async findPipeline(id: number) {
    const p = await this.pipelineRepo.findOneBy({ id });
    if (!p) throw new NotFoundException(`Pipeline ${id} not found`);
    return p;
  }

  async updatePipeline(id: number, dto: UpdatePipelineDto) {
    const p = await this.findPipeline(id);
    Object.assign(p, dto);
    return this.pipelineRepo.save(p);
  }

  async removePipeline(id: number) {
    const p = await this.findPipeline(id);
    await this.pipelineRepo.remove(p);
    return { deleted: true };
  }
}
