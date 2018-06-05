import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementCelluleConfigComponent } from './element-cellule-config.component';

describe('ElementCelluleConfigComponent', () => {
  let component: ElementCelluleConfigComponent;
  let fixture: ComponentFixture<ElementCelluleConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementCelluleConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementCelluleConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
