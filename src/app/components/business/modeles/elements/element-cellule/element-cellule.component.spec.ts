import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementCelluleComponent } from './element-cellule.component';

describe('ElementCelluleComponent', () => {
  let component: ElementCelluleComponent;
  let fixture: ComponentFixture<ElementCelluleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementCelluleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementCelluleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
