import { Module } from '@nestjs/common';
import { NotificationController } from './presentation/controllers/notification.controller';
import { SendNotificationFactory } from './presentation/factories/send-notification.factory';
import { KnexProvider } from './infra/providers/db/knex.provider';

@Module({
  controllers: [NotificationController],
  providers: [SendNotificationFactory, KnexProvider],
})
export class NotificationModule {}
