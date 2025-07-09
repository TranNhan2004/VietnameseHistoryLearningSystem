import { ActionButtonName } from './action-button.model';
import { HiddenId } from './abstracts.model';

export interface DisplayedData extends HiddenId {
  [key: string]: string | number | Date | null;
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
  type: 'all' | 'asc' | 'dsc';
}
