import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesactivateConfirmationDialogComponent } from './desactivate-confirmation-dialog.component';

describe('DesactivateConfirmationDialogComponent', () => {
  let component: DesactivateConfirmationDialogComponent;
  let fixture: ComponentFixture<DesactivateConfirmationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesactivateConfirmationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesactivateConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
