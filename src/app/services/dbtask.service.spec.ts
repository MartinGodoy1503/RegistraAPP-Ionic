import { TestBed } from '@angular/core/testing';

import { DBTaskService } from './dbtask.service';

describe('DbtaskService', () => {
  let service: DBTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DBTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
