import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetLoansComponent } from './tarjet-loans.component';

describe('TarjetLoansComponent', () => {
  let component: TarjetLoansComponent;
  let fixture: ComponentFixture<TarjetLoansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TarjetLoansComponent]
    });
    fixture = TestBed.createComponent(TarjetLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
