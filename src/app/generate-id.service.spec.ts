import { TestBed } from '@angular/core/testing';

import { GenerateIDService } from './generate-id.service';

describe('GenerateIDService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenerateIDService = TestBed.get(GenerateIDService);
    expect(service).toBeTruthy();
  });
});
