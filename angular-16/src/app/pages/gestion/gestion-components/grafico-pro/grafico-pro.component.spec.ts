import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoProComponent } from './grafico-pro.component';

describe('GraficoProComponent', () => {
  let component: GraficoProComponent;
  let fixture: ComponentFixture<GraficoProComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficoProComponent]
    });
    fixture = TestBed.createComponent(GraficoProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
