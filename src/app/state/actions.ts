import { createAction, props } from '@ngrx/store';
import { IAccount, IApartmentData } from '../models/data';

// ----- actions: Apartment data with pins ------
export const cacheData = createAction(
  '[CACHE] Add Apartment Data',
  props<{ listID: number; apartmentData: IApartmentData }>()
);

// -----actions: Account----------
export const cacheAccounts = createAction(
  '[CACHE] Add Accounts',
  props<{ accounts: IAccount[] }>()
);
export const cacheSelectedAccount = createAction(
  '[CACHE] Select Account',
  props<IAccount>()
);
