import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementTableauComponent } from './element-tableau.component';

describe('ElementTableauComponent', () => {
  let component: ElementTableauComponent;
  let fixture: ComponentFixture<ElementTableauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementTableauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementTableauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
