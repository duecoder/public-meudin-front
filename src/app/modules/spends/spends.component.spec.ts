import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendsComponent } from './spends.component';

describe('SpendsComponent', () => {
  let component: SpendsComponent;
  let fixture: ComponentFixture<SpendsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpendsComponent]
    });
    fixture = TestBed.createComponent(SpendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
