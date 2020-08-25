import { TestBed } from '@angular/core/testing';

import { LikedArticlesServiceService } from './liked-articles-service.service';

describe('LikedArticlesServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LikedArticlesServiceService = TestBed.get(LikedArticlesServiceService);
    expect(service).toBeTruthy();
  });
});
