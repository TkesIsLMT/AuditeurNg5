import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalToolButtonComponent } from './modal-tool-button.component';

describe('ModalToolButtonComponent', () => {
  let component: ModalToolButtonComponent;
  let fixture: ComponentFixture<ModalToolButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalToolButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalToolButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
