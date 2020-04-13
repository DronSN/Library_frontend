import { TestBed } from '@angular/core/testing';

import { FindBooksService } from './find-books.service';

describe('FindBooksService', () => {
  let service: FindBooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindBooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
