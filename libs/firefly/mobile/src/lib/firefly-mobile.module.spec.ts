import { async, TestBed } from '@angular/core/testing';
import { FireflyMobileModule } from './firefly/mobile.module';

describe('FireflyMobileModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FireflyMobileModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FireflyMobileModule).toBeDefined();
  });
});
