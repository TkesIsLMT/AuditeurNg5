import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementStandardActionComponent } from './element-standard-action.component';

describe('ElementStandardActionComponent', () => {
  let component: ElementStandardActionComponent;
  let fixture: ComponentFixture<ElementStandardActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementStandardActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementStandardActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
