import { IMocked, Mock, setupFunction } from '@morgan-stanley/ts-mocking-bird';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { DataService } from './services/data.service';

describe('AppComponent', () => {
  let mockStore: IMocked<Store>;
  let mockDataService: IMocked<DataService>;

  beforeEach(async () => {
    mockStore = Mock.create<Store>().setup(setupFunction('dispatch', () => {}));

    mockDataService = Mock.create<DataService>().setup(
      setupFunction('getApartmentData', () => of())
    );
  });

  function getInstance() {
    return new AppComponent(mockStore.mock, mockDataService.mock);
  }

  it('initialized app successfully', () => {
    const appComponent = getInstance();
    expect(appComponent).toBeDefined();
  });

  it(`should check getApartmentData was called from service`, () => {
    const appComponent = getInstance();
    appComponent.ngOnInit();

    expect(mockDataService.withFunction('getApartmentData')).wasCalledOnce();
  });
});
