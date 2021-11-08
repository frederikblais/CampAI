import { TestBed } from '@angular/core/testing';

import { JsonapiService } from './jsonapi.service';

describe('JsonapiService', () => {
  let service: JsonapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
