import {
  GatewayService,
  GatewayServiceProps,
} from 'src/notification/domain/services';
import SendNotificationUseCase from './send-notification.usecase';

class GatewayServiceStub implements GatewayService {
  async send(props: GatewayServiceProps): Promise<void> {
    Promise.resolve(props);
  }
}

describe('SendNotificationUseCase', () => {
  it('should be able to send a notification', () => {
    const gatewayService = new GatewayServiceStub();
    const sut = new SendNotificationUseCase(gatewayService);

    expect(
      sut.execute({
        type: 'news',
        userId: 'user',
        message: 'news 1',
      }),
    ).resolves.not.toThrow();
  });
});
