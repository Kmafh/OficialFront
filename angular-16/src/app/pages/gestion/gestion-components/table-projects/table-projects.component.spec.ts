import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableProjectsComponent } from './table-projects.component';

describe('TableProjectsComponent', () => {
  let component: TableProjectsComponent;
  let fixture: ComponentFixture<TableProjectsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableProjectsComponent]
    });
    fixture = TestBed.createComponent(TableProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
