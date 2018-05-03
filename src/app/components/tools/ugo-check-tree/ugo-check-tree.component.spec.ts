import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UgoCheckTreeComponent } from './ugo-check-tree.component';

describe('UgoCheckTreeComponent', () => {
  let component: UgoCheckTreeComponent;
  let fixture: ComponentFixture<UgoCheckTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UgoCheckTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UgoCheckTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
