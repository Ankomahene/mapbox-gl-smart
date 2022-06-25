import { createReducer, on } from '@ngrx/store';
import { IAccount, IApartmentData } from '../models/data';
import { cacheAccounts, cacheData, cacheSelectedAccount } from './actions';
import { accounts } from '../mocks/mocks';

export const initialState = new Map<number, IApartmentData>();
export const initialAccountState: {
  accounts: IAccount[];
  selectedAccount: IAccount;
} = {
  accounts,
  selectedAccount: {
    listID: 0,
    token: '',
    company: '',
  },
};

export const apartmentDataReducer = createReducer(
  initialState,
  on(cacheData, (state, { listID, apartmentData }) =>
    state.set(listID, apartmentData)
  )
);

export const accountReducer = createReducer(
  initialAccountState,
  on(cacheAccounts, (state, { accounts }) => ({ ...state, accounts })),
  on(cacheSelectedAccount, (state, { listID, token, company }) => ({
    ...state,
    selectedAccount: {
      listID,
      token,
      company,
    },
  }))
);
