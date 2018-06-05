import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementTableauConfigComponent } from './element-tableau-config.component';

describe('ElementTableauConfigComponent', () => {
  let component: ElementTableauConfigComponent;
  let fixture: ComponentFixture<ElementTableauConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementTableauConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementTableauConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
