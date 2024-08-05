import { Body, Controller, Post } from '@nestjs/common';
import { SendNotificationFactory } from '../factories/send-notification.factory';
import { SendNotificationDto } from '../dtos/send-notification.dto';

@Controller('notifications')
export class NotificationController {
  constructor(
    private readonly sendNotificationFactory: SendNotificationFactory,
  ) {}

  @Post()
  sendNotification(@Body() body: SendNotificationDto): Promise<void> {
    const sendNotification = this.sendNotificationFactory.build();

    return sendNotification.execute(body);
  }
}
