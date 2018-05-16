import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieTreeSelectComponent } from './categorie-tree-select.component';

describe('CategorieTreeSelectComponent', () => {
  let component: CategorieTreeSelectComponent;
  let fixture: ComponentFixture<CategorieTreeSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorieTreeSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorieTreeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
