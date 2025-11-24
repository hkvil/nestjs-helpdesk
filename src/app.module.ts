import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MasterDataModule } from './master-data/master-data.module';
import { TicketModule } from './ticket/ticket.module';
import { SlaModule } from './sla/sla.module';
import { KnowledgeBaseModule } from './knowledge-base/knowledge-base.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: (config.get('DB_SYNCHRONIZE') === 'true') || config.get('NODE_ENV') === 'development',
        ssl: config.get('DB_SSL') === 'true',
      }),
    }),
    MasterDataModule,
    TicketModule,
    SlaModule,
    KnowledgeBaseModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
