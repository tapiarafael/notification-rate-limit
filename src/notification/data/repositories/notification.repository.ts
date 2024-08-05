import { RuleInterval } from 'src/notification/domain/models';

export interface NotificationRepository {
  countNotificationsByTypeAndUserId(
    type: string,
    userId: string,
    period?: RuleInterval,
  ): Promise<number>;
}
