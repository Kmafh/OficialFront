import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFutureComponent } from './table-future.component';

describe('TableFutureComponent', () => {
  let component: TableFutureComponent;
  let fixture: ComponentFixture<TableFutureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableFutureComponent]
    });
    fixture = TestBed.createComponent(TableFutureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
