import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementSousModeleComponent } from './element-sous-modele.component';

describe('ElementSousModeleComponent', () => {
  let component: ElementSousModeleComponent;
  let fixture: ComponentFixture<ElementSousModeleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementSousModeleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementSousModeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
