import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferentielTopTableComponent } from './referentiel-top-table.component';

describe('ReferentielTopTableComponent', () => {
  let component: ReferentielTopTableComponent;
  let fixture: ComponentFixture<ReferentielTopTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferentielTopTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferentielTopTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
