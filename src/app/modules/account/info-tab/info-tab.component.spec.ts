import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTabComponent } from './info-tab.component';

describe('InfoTabComponent', () => {
  let component: InfoTabComponent;
  let fixture: ComponentFixture<InfoTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoTabComponent]
    });
    fixture = TestBed.createComponent(InfoTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
