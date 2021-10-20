import { TestBed } from '@angular/core/testing';

import { PrintPageService } from './print-page.service';

describe('PrintPageService', () => {
  let service: PrintPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrintPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
