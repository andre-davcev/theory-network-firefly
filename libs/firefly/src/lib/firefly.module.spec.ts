import { async, TestBed } from '@angular/core/testing';
import { FireflyModule } from './firefly.module';

describe('FireflyModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FireflyModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FireflyModule).toBeDefined();
  });
});
