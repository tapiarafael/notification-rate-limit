import { GatewayService } from 'src/notification/domain/services';
import {
  SendNotification,
  SendNotificationProps,
} from 'src/notification/domain/usecases';
import { RuleRepository } from '../repositories/rule.repository';

export default class SendNotificationUseCase implements SendNotification {
  constructor(
    private readonly gatewayService: GatewayService,
    private readonly ruleRepository: RuleRepository,
  ) {}

  async execute(props: SendNotificationProps): Promise<void> {
    const rule = await this.ruleRepository.findByType(props.type);

    await this.gatewayService.send(props);
  }
}
