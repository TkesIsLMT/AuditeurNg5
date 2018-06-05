import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementLigneComponent } from './element-ligne.component';

describe('ElementLigneComponent', () => {
  let component: ElementLigneComponent;
  let fixture: ComponentFixture<ElementLigneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementLigneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementLigneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
