import { async, TestBed } from '@angular/core/testing';
import { FireflyCoreModule } from './firefly/core.module';

describe('FireflyCoreModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FireflyCoreModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FireflyCoreModule).toBeDefined();
  });
});
