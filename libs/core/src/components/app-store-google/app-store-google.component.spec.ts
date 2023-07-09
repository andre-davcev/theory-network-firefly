import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppStoreGoogleComponent } from './app-store-google.component';

describe('AppStoreGoogleComponent', () => {
  let component: AppStoreGoogleComponent;
  let fixture: ComponentFixture<AppStoreGoogleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppStoreGoogleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AppStoreGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
