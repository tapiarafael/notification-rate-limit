import { Injectable } from '@nestjs/common';
import SendNotificationUseCase from 'src/notification/data/usecases/send-notification.usecase';
import ConsoleGatewayService from 'src/notification/infra/gateway-services/console-gateway-service';
import { KnexProvider } from 'src/notification/infra/providers/db/knex.provider';
import { KnexRuleRepository } from 'src/notification/infra/repositories/knex';
import { KnexNotificationRepository } from 'src/notification/infra/repositories/knex/knex-notification.repository';

@Injectable()
export class SendNotificationFactory {
  constructor(private readonly knex: KnexProvider) {}

  build(): SendNotificationUseCase {
    const gatewayService = new ConsoleGatewayService();
    const ruleRepository = new KnexRuleRepository(this.knex);
    const notificationRepository = new KnexNotificationRepository(this.knex);

    const sendNotificationUseCase = new SendNotificationUseCase(
      gatewayService,
      ruleRepository,
      notificationRepository,
    );

    return sendNotificationUseCase;
  }
}
