import {
  GatewayService,
  GatewayServiceProps,
} from 'src/notification/domain/services';
import SendNotificationUseCase from './send-notification.usecase';
import { RuleRepository } from '../repositories/rule.repository';
import { RuleModel } from 'src/notification/domain/models';

class GatewayServiceStub implements GatewayService {
  async send(props: GatewayServiceProps): Promise<void> {
    Promise.resolve(props);
  }
}

class RuleRepositoryStub implements RuleRepository {
  async findByType(type: string): Promise<RuleModel | null> {
    return Promise.resolve({
      type,
      id: 'id',
      limit: 1,
      every: 'minute',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}

describe('SendNotificationUseCase', () => {
  it('should be able to send a notification', () => {
    const gatewayService = new GatewayServiceStub();
    const ruleRepository = new RuleRepositoryStub();
    const sut = new SendNotificationUseCase(gatewayService, ruleRepository);

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
    const ruleRepository = new RuleRepositoryStub();
    const gatewayServiceSpy = jest.spyOn(gatewayService, 'send');
    const sut = new SendNotificationUseCase(gatewayService, ruleRepository);

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
    const ruleRepository = new RuleRepositoryStub();
    const gatewayServiceSpy = jest.spyOn(gatewayService, 'send');
    gatewayServiceSpy.mockImplementation(() => {
      throw new Error('error');
    });
    const sut = new SendNotificationUseCase(gatewayService, ruleRepository);

    await expect(
      sut.execute({
        type: 'news',
        userId: 'user',
        message: 'news 1',
      }),
    ).rejects.toThrow();
  });

  it('should throw an error if the rule repository throws an error', async () => {
    const gatewayService = new GatewayServiceStub();
    const gatewayServiceSpy = jest.spyOn(gatewayService, 'send');
    gatewayServiceSpy.mockImplementation(() => {
      throw new Error('error');
    });
    const ruleRepository = new RuleRepositoryStub();
    const ruleRepositorySpy = jest.spyOn(ruleRepository, 'findByType');
    ruleRepositorySpy.mockImplementation(() => {
      throw new Error('error');
    });
    const sut = new SendNotificationUseCase(gatewayService, ruleRepository);

    await expect(
      sut.execute({
        type: 'news',
        userId: 'user',
        message: 'news 1',
      }),
    ).rejects.toThrow();
  });
});
