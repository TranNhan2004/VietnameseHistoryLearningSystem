import { ActionButtonName } from './action-button.model';
import { Id } from '../be/abstracts.model';

export interface DisplayedData extends Id {
  [key: string]: string | number | Date | null | object | Array<any>;
}

export interface DisplayedDataAction {
  action: ActionButtonName;
  dataId: string;
}

export interface ActionButtonConfigForTable {
  name: ActionButtonName;
  title?: string;
  mainTitle?: string;
}

export interface SortOption {
  label: string;
  sortedKey: keyof DisplayedData;
  type: 'asc' | 'dsc';
}
