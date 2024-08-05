import { GatewayService } from 'src/notification/domain/services';
import {
  SendNotification,
  SendNotificationProps,
} from 'src/notification/domain/usecases';

export default class SendNotificationUseCase implements SendNotification {
  constructor(private readonly gatewayService: GatewayService) {}

  async execute(props: SendNotificationProps): Promise<void> {
    await this.gatewayService.send(props);
  }
}
