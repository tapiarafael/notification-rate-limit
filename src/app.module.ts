import { Module } from '@nestjs/common';
import { NotificationModule } from './notification/notification.module';
import { ConfigModule } from '@nestjs/config';
import knexConfig from './knex.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [knexConfig],
    }),
    NotificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
