import { IMocked, Mock, setupFunction } from '@morgan-stanley/ts-mocking-bird';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { IAccountState, IApartmentData } from 'src/app/models/data';
import { DataService } from 'src/app/services/data.service';

import { ExampleUsageComponent } from './example-usage.component';

describe('ExampleUsageComponent', () => {
  let mockStore: IMocked<
    Store<{
      accountData: IAccountState;
      apartmentData: Map<number, IApartmentData>;
    }>
  >;
  let mockDataService: IMocked<DataService>;

  beforeEach(async () => {
    mockStore = Mock.create<
      Store<{
        accountData: IAccountState;
        apartmentData: Map<number, IApartmentData>;
      }>
    >().setup(setupFunction('select', () => of({})));

    mockDataService = Mock.create<DataService>().setup(
      setupFunction('getApartmentData', () => of())
    );
  });

  function getInstance() {
    return new ExampleUsageComponent(mockDataService.mock, mockStore.mock);
  }

  it('should initialize component', () => {
    const component = getInstance();
    expect(component).toBeDefined();
  });
});
