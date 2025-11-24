import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { KnowledgeBaseService } from './knowledge-base.service';
import { CreateKnowledgeBaseDto } from './dto/create-knowledge-base.dto';
import { UpdateKnowledgeBaseDto } from './dto/update-knowledge-base.dto';

@Controller('knowledge-base')
export class KnowledgeBaseController {
	constructor(private readonly kbService: KnowledgeBaseService) {}

	@Post()
	create(@Body() dto: CreateKnowledgeBaseDto) {
		return this.kbService.create(dto);
	}

	@Get()
	findAll() {
		return this.kbService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.kbService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() dto: UpdateKnowledgeBaseDto) {
		return this.kbService.update(+id, dto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.kbService.remove(+id);
	}
}
