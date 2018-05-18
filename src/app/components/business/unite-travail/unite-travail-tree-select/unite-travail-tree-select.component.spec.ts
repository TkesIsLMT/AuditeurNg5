import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniteTravailTreeSelectComponent } from './unite-travail-tree-select.component';

describe('UniteTravailTreeSelectComponent', () => {
  let component: UniteTravailTreeSelectComponent;
  let fixture: ComponentFixture<UniteTravailTreeSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniteTravailTreeSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniteTravailTreeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
