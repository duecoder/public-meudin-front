import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSpendComponent } from './add-edit-spend.component';

describe('AddEditSpendComponent', () => {
  let component: AddEditSpendComponent;
  let fixture: ComponentFixture<AddEditSpendComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditSpendComponent]
    });
    fixture = TestBed.createComponent(AddEditSpendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
