import ConsoleGatewayService from './console-gateway-service';

describe('ConsoleGatewayService', () => {
  it('should be able to instantiate', () => {
    const sut = new ConsoleGatewayService();

    expect(sut).toBeTruthy();
  });

  it('should be able to send a notification', () => {
    const sut = new ConsoleGatewayService();

    expect(
      sut.send({ type: 'news', userId: 'user', message: 'news 1' }),
    ).resolves.not.toThrow();
  });
});
