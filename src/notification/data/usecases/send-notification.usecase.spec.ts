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

  it('should call the gateway service with correct params', async () => {
    const gatewayService = new GatewayServiceStub();
    const gatewayServiceSpy = jest.spyOn(gatewayService, 'send');
    const sut = new SendNotificationUseCase(gatewayService);

    await sut.execute({
      type: 'news',
      userId: 'user',
      message: 'news 1',
    });

    expect(gatewayServiceSpy).toHaveBeenCalledTimes(1);
    expect(gatewayServiceSpy).toHaveBeenCalledWith({
      type: 'news',
      userId: 'user',
      message: 'news 1',
    });
  });

  it('should throw an error if the gateway service throws an error', async () => {
    const gatewayService = new GatewayServiceStub();
    const gatewayServiceSpy = jest.spyOn(gatewayService, 'send');
    gatewayServiceSpy.mockImplementation(() => {
      throw new Error('error');
    });
    const sut = new SendNotificationUseCase(gatewayService);

    await expect(
      sut.execute({
        type: 'news',
        userId: 'user',
        message: 'news 1',
      }),
    ).rejects.toThrow();
  });
});
