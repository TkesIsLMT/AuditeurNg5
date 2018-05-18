import { TestBed, inject } from '@angular/core/testing';

import { UniteTravailService } from './unite-travail.service';

describe('UniteTravailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UniteTravailService]
    });
  });

  it('should be created', inject([UniteTravailService], (service: UniteTravailService) => {
    expect(service).toBeTruthy();
  }));
});
