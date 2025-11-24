import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MasterDataModule } from './master-data/master-data.module';
import { TicketModule } from './ticket/ticket.module';
import { SlaModule } from './sla/sla.module';
import { KnowledgeBaseModule } from './knowledge-base/knowledge-base.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://neondb_owner:npg_hvnOsBj6Vf0J@ep-solitary-base-a1ks8ipr-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
      autoLoadEntities: true,
      synchronize: true, // Dev only
      ssl: true,
    }),
    MasterDataModule,
    TicketModule,
    SlaModule,
    KnowledgeBaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
