import { fakeAsync, tick } from '@angular/core/testing';
import { DataService } from './data.service';
import { IMocked, Mock, setupFunction } from '@morgan-stanley/ts-mocking-bird';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, of } from 'rxjs';
import { mockApartmentData } from '../mocks/mocks';

describe('DataService', () => {
  let mockHttp: IMocked<HttpClient>;

  beforeEach(() => {
    mockHttp = Mock.create<HttpClient>().setup(
      setupFunction(
        'get',
        () => firstValueFrom(of(mockApartmentData).pipe()) as any
      )
    );
  });

  function getInstance() {
    return new DataService(mockHttp.mock);
  }

  it('should initialize service', () => {
    const dataService = getInstance();
    expect(dataService).toBeDefined();
  });

  it('should get apartment data', fakeAsync(() => {
    const dataService = getInstance();
    dataService.getApartmentData(5638557, 'test-token').subscribe((result) => {
      expect(mockHttp.withFunction('get')).wasCalledOnce();

      expect(result.agentInfo.accountID).toBe(12345);
      expect(result.records.length).toBe(4);
    });
    tick(100);
  }));
});
