import { TestBed } from '@angular/core/testing';

import { NewEntryService } from './new-entry.service';

describe('NewEntryService', () => {
  let service: NewEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
