import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiStatusComponent } from './api-status.component';

describe('ApiStatusComponent', () => {
  let component: ApiStatusComponent;
  let fixture: ComponentFixture<ApiStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApiStatusComponent]
    });
    fixture = TestBed.createComponent(ApiStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
