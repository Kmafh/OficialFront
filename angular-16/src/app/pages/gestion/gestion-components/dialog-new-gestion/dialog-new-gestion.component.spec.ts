import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewGestionComponent } from './dialog-new-gestion.component';

describe('DialogNewGestionComponent', () => {
  let component: DialogNewGestionComponent;
  let fixture: ComponentFixture<DialogNewGestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogNewGestionComponent]
    });
    fixture = TestBed.createComponent(DialogNewGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
