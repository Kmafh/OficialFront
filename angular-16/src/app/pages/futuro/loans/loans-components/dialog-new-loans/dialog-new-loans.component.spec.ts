import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewLoansComponent } from './dialog-new-loans.component';

describe('DialogNewLoansComponent', () => {
  let component: DialogNewLoansComponent;
  let fixture: ComponentFixture<DialogNewLoansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogNewLoansComponent]
    });
    fixture = TestBed.createComponent(DialogNewLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
