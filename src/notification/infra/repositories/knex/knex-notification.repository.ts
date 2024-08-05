import { NotificationRepository } from 'src/notification/data/repositories';
import { RuleInterval } from 'src/notification/domain/models';
import { KnexProvider } from '../../providers/db/knex.provider';

export class KnexNotificationRepository implements NotificationRepository {
  constructor(private readonly knex: KnexProvider) {}

  async countNotificationsByTypeAndUserId(
    type: string,
    userId: string,
    period?: RuleInterval,
  ): Promise<number> {
    const query = this.knex
      .query()
      .table('notifications')
      .where({ type, userId });

    switch (period) {
      case 'minute':
        return await query
          .where('sentAt', '>=', new Date(new Date().getTime() - 60000))
          .count();
      case 'hour':
        return await query
          .where('sentAt', '>=', new Date(new Date().getTime() - 3600000))
          .count();
      case 'day':
        return await query
          .where('sentAt', '>=', new Date(new Date().getTime() - 86400000))
          .count();
      case 'week':
        return await query
          .where('sentAt', '>=', new Date(new Date().getTime() - 604800000))
          .count();
      case 'month':
        return await query
          .where('sentAt', '>=', new Date(new Date().getTime() - 2629746000))
          .count();
      default:
        return await query.count();
    }
  }
}
