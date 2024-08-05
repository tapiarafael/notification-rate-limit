import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { SendNotificationFactory } from '../factories/send-notification.factory';
import { SendNotificationDto } from '../dtos/send-notification.dto';

@Controller('notifications')
export class NotificationController {
  constructor(
    private readonly sendNotificationFactory: SendNotificationFactory,
  ) {}

  @Post()
  async sendNotification(@Body() body: SendNotificationDto): Promise<void> {
    const sendNotification = this.sendNotificationFactory.build();

    try {
      await sendNotification.execute(body);
    } catch (error) {
      if (error.code) {
        throw new HttpException(error.message, error.code);
      }
      throw error;
    }
  }
}
