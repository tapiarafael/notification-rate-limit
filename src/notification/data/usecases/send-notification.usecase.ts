import { GatewayService } from 'src/notification/domain/services';
import {
  SendNotification,
  SendNotificationProps,
} from 'src/notification/domain/usecases';
import { NotificationRepository, RuleRepository } from '../repositories';

export default class SendNotificationUseCase implements SendNotification {
  constructor(
    private readonly gatewayService: GatewayService,
    private readonly ruleRepository: RuleRepository,
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute(props: SendNotificationProps): Promise<void> {
    const rule = await this.ruleRepository.findByType(props.type);

    if (rule) {
      const notificationsCount =
        await this.notificationRepository.countNotificationsByTypeAndUserId(
          props.type,
          props.userId,
          rule.every,
        );

      if (notificationsCount >= rule.limit) {
        throw new Error('Too many notifications');
      }
    }

    await this.gatewayService.send(props);
  }
}
