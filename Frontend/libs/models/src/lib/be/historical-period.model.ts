import { Id } from './abstracts.model';

export interface HistoricalPeriod {
  name: string;
  startYear: number;
  endYear: number;
}

export interface HistoricalPeriodResponse extends Id, HistoricalPeriod {}
