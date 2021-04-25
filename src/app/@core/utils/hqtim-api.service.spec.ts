import { TestBed } from '@angular/core/testing';

import { HqtimApiService } from './hqtim-api.service';

describe('HqtimApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HqtimApiService = TestBed.get(HqtimApiService);
    expect(service).toBeTruthy();
  });
});
