import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementSousModeleConfigComponent } from './element-sous-modele-config.component';

describe('ElementSousModeleConfigComponent', () => {
  let component: ElementSousModeleConfigComponent;
  let fixture: ComponentFixture<ElementSousModeleConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementSousModeleConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementSousModeleConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
