/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  GatewayService,
  GatewayServiceProps,
} from 'src/notification/domain/services';
import SendNotificationUseCase from './send-notification.usecase';
import { NotificationRepository, RuleRepository } from '../repositories';
import { RuleInterval, RuleModel } from 'src/notification/domain/models';

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
      limit: 10,
      every: 'minute',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}

class NotificationRepositoryStub implements NotificationRepository {
  async countNotificationsByTypeAndUserId(
    type: string,
    userId: string,
    period?: RuleInterval,
  ): Promise<number> {
    return Promise.resolve(1);
  }
}

const makeSut = () => {
  const gatewayService = new GatewayServiceStub();
  const ruleRepository = new RuleRepositoryStub();
  const notificationRepository = new NotificationRepositoryStub();
  return {
    gatewayService,
    ruleRepository,
    notificationRepository,
    sut: new SendNotificationUseCase(
      gatewayService,
      ruleRepository,
      notificationRepository,
    ),
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

  it('should send a notification if the rule repository returns null', async () => {
    const { gatewayService, ruleRepository, sut } = makeSut();
    const gatewayServiceSpy = jest.spyOn(gatewayService, 'send');
    const ruleRepositorySpy = jest.spyOn(ruleRepository, 'findByType');

    ruleRepositorySpy.mockImplementation(() => {
      return Promise.resolve(null);
    });

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

  it('should call the notification repository with correct params', async () => {
    const { notificationRepository, sut } = makeSut();
    const notificationRepositorySpy = jest.spyOn(
      notificationRepository,
      'countNotificationsByTypeAndUserId',
    );

    await sut.execute({
      type: 'news',
      userId: 'user',
      message: 'news 1',
    });

    expect(notificationRepositorySpy).toHaveBeenCalledTimes(1);
    expect(notificationRepositorySpy).toHaveBeenCalledWith(
      'news',
      'user',
      'minute',
    );
  });

  it('should throw an error if the notification repository throws an error', async () => {
    const { notificationRepository, sut } = makeSut();
    const notificationRepositorySpy = jest.spyOn(
      notificationRepository,
      'countNotificationsByTypeAndUserId',
    );

    notificationRepositorySpy.mockImplementation(() => {
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

  it('should throw an error when sending a notification would exceed the limit', async () => {
    const { notificationRepository, sut } = makeSut();
    const notificationRepositorySpy = jest.spyOn(
      notificationRepository,
      'countNotificationsByTypeAndUserId',
    );

    notificationRepositorySpy.mockImplementation(() => {
      return Promise.resolve(10);
    });

    await expect(
      sut.execute({
        type: 'news',
        userId: 'user',
        message: 'news 1',
      }),
    ).rejects.toThrow();
  });

  it('should be able to send a notification within the limit', async () => {
    const { notificationRepository, sut } = makeSut();
    const notificationRepositorySpy = jest.spyOn(
      notificationRepository,
      'countNotificationsByTypeAndUserId',
    );

    notificationRepositorySpy.mockImplementation(() => {
      return Promise.resolve(9);
    });

    await sut.execute({
      type: 'news',
      userId: 'user',
      message: 'news 1',
    });

    expect(notificationRepositorySpy).toHaveBeenCalledTimes(1);
    expect(notificationRepositorySpy).toHaveBeenCalledWith(
      'news',
      'user',
      'minute',
    );
  });
});
