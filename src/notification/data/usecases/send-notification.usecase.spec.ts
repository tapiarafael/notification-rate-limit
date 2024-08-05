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

const makeSut = () => {
  const gatewayService = new GatewayServiceStub();
  const ruleRepository = new RuleRepositoryStub();
  return {
    gatewayService,
    ruleRepository,
    sut: new SendNotificationUseCase(gatewayService, ruleRepository),
  };
};

describe('SendNotificationUseCase', () => {
  it('should be able to send a notification', () => {
    const { sut } = makeSut();
    expect(
      sut.execute({
        type: 'news',
        userId: 'user',
        message: 'news 1',
      }),
    ).resolves.not.toThrow();
  });

  it('should call the gateway service with correct params', async () => {
    const { gatewayService, sut } = makeSut();
    const gatewayServiceSpy = jest.spyOn(gatewayService, 'send');

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
    const { gatewayService, sut } = makeSut();
    const gatewayServiceSpy = jest.spyOn(gatewayService, 'send');

    gatewayServiceSpy.mockImplementation(() => {
      throw new Error('error');
    });

    await expect(
      sut.execute({
        type: 'news',
        userId: 'user',
        message: 'news 1',
      }),
    ).rejects.toThrow();
  });

  it('should call the rule repository with correct params', async () => {
    const { ruleRepository, sut } = makeSut();
    const ruleRepositorySpy = jest.spyOn(ruleRepository, 'findByType');

    await sut.execute({
      type: 'news',
      userId: 'user',
      message: 'news 1',
    });

    expect(ruleRepositorySpy).toHaveBeenCalledTimes(1);
    expect(ruleRepositorySpy).toHaveBeenCalledWith('news');
  });

  it('should throw an error if the rule repository throws an error', async () => {
    const { ruleRepository, sut } = makeSut();
    const ruleRepositorySpy = jest.spyOn(ruleRepository, 'findByType');

    ruleRepositorySpy.mockImplementation(() => {
      throw new Error('error');
    });

    await expect(
      sut.execute({
        type: 'news',
        userId: 'user',
        message: 'news 1',
      }),
    ).rejects.toThrow();
  });
});
