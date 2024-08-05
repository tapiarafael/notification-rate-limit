import { GatewayService } from '../../domain/services';
import { SendNotification, SendNotificationProps } from '../../domain/usecases';
import { NotificationRepository, RuleRepository } from '../repositories';
import { LimitExceededError } from '../../domain/errors';

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
          rule.period,
        );

      if (notificationsCount >= rule.limit) {
        throw new LimitExceededError();
      }
    }

    await this.gatewayService.send(props);

    await this.notificationRepository.saveNotification({
      type: props.type,
      userId: props.userId,
      message: props.message,
    });
  }
}
