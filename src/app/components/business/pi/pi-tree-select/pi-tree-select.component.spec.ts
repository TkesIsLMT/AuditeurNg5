import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiTreeSelectComponent } from './pi-tree-select.component';

describe('PiTreeSelectComponent', () => {
  let component: PiTreeSelectComponent;
  let fixture: ComponentFixture<PiTreeSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiTreeSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiTreeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
