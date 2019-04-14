import { async, TestBed } from '@angular/core/testing';
import { CordovaModule } from './cordova.module';

describe('CordovaModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CordovaModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CordovaModule).toBeDefined();
  });
});
