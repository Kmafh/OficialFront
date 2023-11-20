import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewFutureComponent } from './dialog-new-future.component';

describe('DialogNewFutureComponent', () => {
  let component: DialogNewFutureComponent;
  let fixture: ComponentFixture<DialogNewFutureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogNewFutureComponent]
    });
    fixture = TestBed.createComponent(DialogNewFutureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
