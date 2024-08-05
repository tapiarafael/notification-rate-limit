import { NotificationRepository } from 'src/notification/data/repositories';
import {
  NotificationModel,
  RuleInterval,
} from 'src/notification/domain/models';
import { KnexProvider } from '../../providers/db/knex.provider';

export class KnexNotificationRepository implements NotificationRepository {
  constructor(private readonly knex: KnexProvider) {}

  async saveNotification(
    notification: Pick<NotificationModel, 'type' | 'userId' | 'message'>,
  ): Promise<void> {
    await this.knex.query().table('notifications').insert(notification);
  }

  async countNotificationsByTypeAndUserId(
    type: string,
    userId: string,
    period?: RuleInterval,
  ): Promise<number> {
    const query = this.knex
      .query()
      .table('notifications')
      .where({ userId })
      .whereILike('type', type);

    switch (period) {
      case 'minute':
        query.where('sentAt', '>=', new Date(new Date().getTime() - 60000));

      case 'hour':
        query.where('sentAt', '>=', new Date(new Date().getTime() - 3600000));

      case 'day':
        query.where('sentAt', '>=', new Date(new Date().getTime() - 86400000));

      case 'week':
        query.where('sentAt', '>=', new Date(new Date().getTime() - 604800000));

      case 'month':
        query.where(
          'sentAt',
          '>=',
          new Date(new Date().getTime() - 2629746000),
        );
    }

    const { count } = await query.count().first();

    return Number(count);
  }
}
