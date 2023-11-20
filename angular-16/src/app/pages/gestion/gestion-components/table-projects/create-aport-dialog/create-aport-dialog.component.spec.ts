import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAportDialogComponent } from './create-aport-dialog.component';

describe('CreateAportDialogComponent', () => {
  let component: CreateAportDialogComponent;
  let fixture: ComponentFixture<CreateAportDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAportDialogComponent]
    });
    fixture = TestBed.createComponent(CreateAportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
