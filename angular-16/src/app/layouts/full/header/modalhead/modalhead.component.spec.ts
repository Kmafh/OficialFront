import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalheadComponent } from './modalhead.component';

describe('ModalheadComponent', () => {
  let component: ModalheadComponent;
  let fixture: ComponentFixture<ModalheadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalheadComponent]
    });
    fixture = TestBed.createComponent(ModalheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
