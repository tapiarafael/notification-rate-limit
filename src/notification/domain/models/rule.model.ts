export interface RuleModel {
  id: string;
  type: string;
  limit: number;
  every: 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month';
  createdAt: Date;
  updatedAt: Date;
}
