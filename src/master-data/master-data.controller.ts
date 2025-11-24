import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { MasterDataService } from './master-data.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { CreatePipelineDto } from './dto/create-pipeline.dto';
import { UpdatePipelineDto } from './dto/update-pipeline.dto';

@Controller('master-data')
export class MasterDataController {
	constructor(private readonly svc: MasterDataService) {}

	// Channels
	@Post('channels')
	createChannel(@Body() dto: CreateChannelDto) {
		return this.svc.createChannel(dto);
	}

	@Get('channels')
	findChannels() {
		return this.svc.findAllChannels();
	}

	@Get('channels/:id')
	findChannel(@Param('id') id: string) {
		return this.svc.findChannel(+id);
	}

	@Patch('channels/:id')
	updateChannel(@Param('id') id: string, @Body() dto: UpdateChannelDto) {
		return this.svc.updateChannel(+id, dto);
	}

	@Delete('channels/:id')
	removeChannel(@Param('id') id: string) {
		return this.svc.removeChannel(+id);
	}

	// Categories
	@Post('categories')
	createCategory(@Body() dto: CreateCategoryDto) {
		return this.svc.createCategory(dto);
	}

	@Get('categories')
	findCategories() {
		return this.svc.findAllCategories();
	}

	@Get('categories/:id')
	findCategory(@Param('id') id: string) {
		return this.svc.findCategory(+id);
	}

	@Patch('categories/:id')
	updateCategory(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
		return this.svc.updateCategory(+id, dto);
	}

	@Delete('categories/:id')
	removeCategory(@Param('id') id: string) {
		return this.svc.removeCategory(+id);
	}

	// Sub Categories
	@Post('sub-categories')
	createSubCategory(@Body() dto: CreateSubCategoryDto) {
		return this.svc.createSubCategory(dto);
	}

	@Get('sub-categories')
	findSubCategories() {
		return this.svc.findAllSubCategories();
	}

	@Get('sub-categories/:id')
	findSubCategory(@Param('id') id: string) {
		return this.svc.findSubCategory(+id);
	}

	@Patch('sub-categories/:id')
	updateSubCategory(@Param('id') id: string, @Body() dto: UpdateSubCategoryDto) {
		return this.svc.updateSubCategory(+id, dto);
	}

	@Delete('sub-categories/:id')
	removeSubCategory(@Param('id') id: string) {
		return this.svc.removeSubCategory(+id);
	}

	// Pipelines
	@Post('pipelines')
	createPipeline(@Body() dto: CreatePipelineDto) {
		return this.svc.createPipeline(dto);
	}

	@Get('pipelines')
	findPipelines() {
		return this.svc.findAllPipelines();
	}

	@Get('pipelines/:id')
	findPipeline(@Param('id') id: string) {
		return this.svc.findPipeline(+id);
	}

	@Patch('pipelines/:id')
	updatePipeline(@Param('id') id: string, @Body() dto: UpdatePipelineDto) {
		return this.svc.updatePipeline(+id, dto);
	}

	@Delete('pipelines/:id')
	removePipeline(@Param('id') id: string) {
		return this.svc.removePipeline(+id);
	}
}
