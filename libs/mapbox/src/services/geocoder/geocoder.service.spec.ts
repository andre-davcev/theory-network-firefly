import { TestBed } from '@angular/core/testing';

import { ServiceGeocoder } from './geocoder.service';

describe('ServiceGeocoder', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceGeocoder = TestBed.get(ServiceGeocoder);
    expect(service).toBeTruthy();
  });
});
