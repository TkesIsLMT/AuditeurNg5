import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementMenuItemComponent } from './element-menu-item.component';

describe('ElementMenuItemComponent', () => {
  let component: ElementMenuItemComponent;
  let fixture: ComponentFixture<ElementMenuItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementMenuItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
