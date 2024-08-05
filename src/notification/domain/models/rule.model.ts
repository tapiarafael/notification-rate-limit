export type RuleInterval =
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month';

export interface RuleModel {
  id: string;
  type: string;
  limit: number;
  period: RuleInterval;
  createdAt: Date;
  updatedAt: Date;
}
