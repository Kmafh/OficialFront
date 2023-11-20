import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopDashComponent } from './top-dash.component';

describe('TopDashComponent', () => {
  let component: TopDashComponent;
  let fixture: ComponentFixture<TopDashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopDashComponent]
    });
    fixture = TestBed.createComponent(TopDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
