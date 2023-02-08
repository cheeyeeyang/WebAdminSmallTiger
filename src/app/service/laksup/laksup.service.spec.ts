import { TestBed } from '@angular/core/testing';

import { LaksupService } from './laksup.service';

describe('LaksupService', () => {
  let service: LaksupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaksupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
