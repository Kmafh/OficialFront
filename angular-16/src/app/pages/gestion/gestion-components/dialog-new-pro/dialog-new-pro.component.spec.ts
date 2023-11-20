import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewProComponent } from './dialog-new-pro.component';

describe('DialogNewProComponent', () => {
  let component: DialogNewProComponent;
  let fixture: ComponentFixture<DialogNewProComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogNewProComponent]
    });
    fixture = TestBed.createComponent(DialogNewProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
