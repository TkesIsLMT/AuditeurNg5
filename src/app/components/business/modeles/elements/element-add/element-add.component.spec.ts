import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementAddComponent } from './element-add.component';

describe('ElementAddComponent', () => {
  let component: ElementAddComponent;
  let fixture: ComponentFixture<ElementAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
