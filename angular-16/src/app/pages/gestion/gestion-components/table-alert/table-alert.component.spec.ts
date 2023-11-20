import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAlertComponent } from './table-alert.component';

describe('TableAlertComponent', () => {
  let component: TableAlertComponent;
  let fixture: ComponentFixture<TableAlertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableAlertComponent]
    });
    fixture = TestBed.createComponent(TableAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
