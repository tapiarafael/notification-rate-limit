import {
  GatewayService,
  GatewayServiceProps,
} from 'src/notification/domain/services';

export default class ConsoleGatewayService implements GatewayService {
  async send(props: GatewayServiceProps): Promise<void> {
    console.log('sending message to user', props);
  }
}
