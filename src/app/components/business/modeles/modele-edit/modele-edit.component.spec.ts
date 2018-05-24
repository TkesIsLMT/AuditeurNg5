import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeleEditComponent } from './modele-edit.component';

describe('ModeleEditComponent', () => {
  let component: ModeleEditComponent;
  let fixture: ComponentFixture<ModeleEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeleEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
