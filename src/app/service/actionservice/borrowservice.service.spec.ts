import { TestBed } from '@angular/core/testing';

import { BorrowserviceService } from './borrowservice.service';

describe('BorrowserviceService', () => {
  let service: BorrowserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BorrowserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
