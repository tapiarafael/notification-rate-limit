import { RuleModel } from 'src/notification/domain/models';

export interface RuleRepository {
  findByType(type: string): Promise<RuleModel | null>;
}
