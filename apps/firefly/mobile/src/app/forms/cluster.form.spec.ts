import { TestBed, inject } from '@angular/core/testing';

import { FormCluster } from './cluster.form';

describe('FormClusterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormCluster]
    });
  });

  it('should be created', inject([FormCluster], (service: FormCluster) => {
    expect(service).toBeTruthy();
  }));
});
