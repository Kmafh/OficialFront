import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditGestionComponent } from './dialog-edit-gestion.component';

describe('DialogEditGestionComponent', () => {
  let component: DialogEditGestionComponent;
  let fixture: ComponentFixture<DialogEditGestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogEditGestionComponent]
    });
    fixture = TestBed.createComponent(DialogEditGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
