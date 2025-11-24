import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterDataService } from './master-data.service';
import { MasterDataController } from './master-data.controller';
import { Channel } from './entities/channel.entity';
import { Category } from './entities/category.entity';
import { SubCategory } from './entities/sub-category.entity';
import { Pipeline } from './entities/pipeline.entity';
import { PicGroup } from './entities/pic-group.entity';
import { PicGroupMember } from './entities/pic-group-member.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Channel,
      Category,
      SubCategory,
      Pipeline,
      PicGroup,
      PicGroupMember,
    ]),
  ],
  controllers: [MasterDataController],
  providers: [MasterDataService],
})
export class MasterDataModule {}
