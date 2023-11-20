import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditFutureComponent } from './dialog-edit-future.component';

describe('DialogEditFutureComponent', () => {
  let component: DialogEditFutureComponent;
  let fixture: ComponentFixture<DialogEditFutureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogEditFutureComponent]
    });
    fixture = TestBed.createComponent(DialogEditFutureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
