import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditLoansComponent } from './dialog-edit-loans.component';

describe('DialogEditLoansComponent', () => {
  let component: DialogEditLoansComponent;
  let fixture: ComponentFixture<DialogEditLoansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogEditLoansComponent]
    });
    fixture = TestBed.createComponent(DialogEditLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
