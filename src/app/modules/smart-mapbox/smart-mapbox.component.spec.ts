import { SmartMapboxComponent } from './smart-mapbox.component';

describe('SmartMapboxComponent', () => {
  beforeEach(async () => {});

  function getInstance() {
    return new SmartMapboxComponent();
  }

  it('should create class', () => {
    const component = getInstance();
    expect(component).toBeDefined();
  });
});
