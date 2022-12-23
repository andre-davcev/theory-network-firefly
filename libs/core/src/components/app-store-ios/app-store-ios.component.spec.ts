import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppStoreIosComponent } from './app-store-ios.component';

describe('AppStoreIosComponent', () => {
  let component: AppStoreIosComponent;
  let fixture: ComponentFixture<AppStoreIosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppStoreIosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppStoreIosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
