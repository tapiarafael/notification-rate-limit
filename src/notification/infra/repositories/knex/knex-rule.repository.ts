import { RuleRepository } from 'src/notification/data/repositories';
import { RuleModel } from 'src/notification/domain/models';
import { KnexProvider } from '../../providers/db/knex.provider';

export class KnexRuleRepository implements RuleRepository {
  constructor(private readonly knex: KnexProvider) {}

  async findByType(type: string): Promise<RuleModel | null> {
    const rule = await this.knex.query().table('rules').where({ type }).first();

    return rule;
  }
}
