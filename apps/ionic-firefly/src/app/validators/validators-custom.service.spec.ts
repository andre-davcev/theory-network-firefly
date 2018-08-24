import { TestBed, inject } from '@angular/core/testing';

import { ValidatorsCustom } from './validators-custom.service';

describe('ValidatorsCustom', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidatorsCustom]
    });
  });

  it('should be created', inject([ValidatorsCustom], (service: ValidatorsCustom) => {
    expect(service).toBeTruthy();
  }));
});
