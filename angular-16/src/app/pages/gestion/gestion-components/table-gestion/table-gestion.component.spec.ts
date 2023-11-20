import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableGestionComponent } from './table-gestion.component';

describe('TableGestionComponent', () => {
  let component: TableGestionComponent;
  let fixture: ComponentFixture<TableGestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableGestionComponent]
    });
    fixture = TestBed.createComponent(TableGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
