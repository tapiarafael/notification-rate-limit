import {
  NotificationModel,
  RuleInterval,
} from 'src/notification/domain/models';

export interface NotificationRepository {
  saveNotification(
    notification: Pick<NotificationModel, 'type' | 'userId' | 'message'>,
  ): Promise<void>;
  countNotificationsByTypeAndUserId(
    type: string,
    userId: string,
    period?: RuleInterval,
  ): Promise<number>;
}
